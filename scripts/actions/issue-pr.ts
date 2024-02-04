import YAML from "js-yaml";
import slug from "limax";
import { PushCommit } from "@type-challenges/octokit-create-pull-request";
import type { Action, Context, Github, Question, SupportedTemplates } from "../../types";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { createFileMap } from "../..//utils";
import { DEFAULT_LOCALE, SUPPORTED_TEMPLATES } from "../../constants";

const Messages = {
  en: {
    info: "Info",
    template: "Template",
    tests: "Test Cases",
    issue_reply: "#{0} - Pull Request created.",
    issue_update_reply: "#{0} - Pull Request updated.",
    issue_invalid_reply: "Failed to parse the issue, please follow the template.",
    pr_auto_translate_tips: "Auto translated by Google Translate",
  },
  "zh-CN": {
    info: "基本信息",
    template: "题目模版",
    tests: "判题测试",
    issue_reply: "#{0} - PR 已生成",
    issue_update_reply: "#{0} - PR 已更新",
    issue_invalid_reply: "Issue 格式不正确，请按照依照模版修正",
    pr_auto_translate_tips: "通过谷歌 API 自动翻译",
  },
  ja: {
    info: "基本情報",
    template: "テンプレート",
    tests: "テストケース",
    issue_reply: "#{0} - Pull Request created.",
    issue_update_reply: "#{0} - Pull Request updated.",
    issue_invalid_reply: "Failed to parse the issue, please follow the template.",
    pr_auto_translate_tips: "Auto translated by Google Translate",
  },
};

export const getOthers = <A, B>(condition: boolean, a: A, b: B): A | B => (condition ? a : b);

const action: Action = async (github, context, core) => {
  const payload = context.payload || {};
  const issue = payload.issue;
  const no = context.issue.number;

  if (!issue) return;

  const labels: string[] = (issue.labels || []).map((i: any) => i && i.name).filter(Boolean);
  const template = labels.find((label) => {
    if (SUPPORTED_TEMPLATES.includes(label as SupportedTemplates)) return true;
  }) as SupportedTemplates;
  const type = labels.includes("quiz") ? "quiz" : labels.includes("question") ? "question" : "question";

  // create pr for new challenge
  if (labels.includes("new-challenge")) {
    const locale = labels.includes("ja") ? "ja" : labels.includes("zh-CN") ? "zh-CN" : "en";

    const body = issue.body || "";
    const infoRaw = getCodeBlock(body, Messages[locale].info, "yaml");
    const templateFiles = await getTemplateFiles(body);
    const question = getCommentRange(body, "question");

    let info: any;

    try {
      info = YAML.load(infoRaw || "");
    } catch {
      info = null;
    }

    core.info("-----Playload-----");
    core.info(JSON.stringify(context.payload, null, 2));

    // invalid issue
    if (!question || !template || !templateFiles || !info) {
      const culprit = !question ? "question" : "info";
      const valueOfCulprit = !question ? question : info;

      core.info("-----Invalid Issue-----");
      core.info(JSON.stringify({ culprit, valueOfCulprit }));
      await updateComment(github, context, Messages[locale].issue_invalid_reply);
      return;
    }

    if (type === "question" || !template || !templateFiles || !info) {
      const culprit = !template ? "template" : "templateFiles";
      const valueOfCulprit = !!template ? template : templateFiles;

      core.info("-----Invalid Issue-----");
      core.info(JSON.stringify({ culprit, valueOfCulprit }));
      await updateComment(github, context, Messages[locale].issue_invalid_reply);
      return;
    }

    const { data: user } = await github.rest.users.getByUsername({
      username: issue.user.login,
    });

    // allow user to override the author info when filled in the Issue
    if (!info.author) {
      info.author = info.author || {};
      info.author.github = issue.user.login;
      if (user) info.author.name = user.name;
    }

    // add published_date to the info
    if (!info.published_date) info.published_date = new Date().toISOString().split("T")[0];

    core.info(`user: ${JSON.stringify(user)}`);
    core.info(`info: ${JSON.stringify(info)}`);

    const quiz: Question = {
      no,
      type: "question",
      difficulty: info.difficulty,
      path: "",
      info: {
        [locale]: info,
      },
      templateFiles: {
        [template]: templateFiles,
      } as Question["templateFiles"],
      readme: {
        [locale]: question,
      },
    };

    core.info("-----Parsed-----");
    core.info(JSON.stringify(quiz, null, 2));

    const { data: pulls } = await github.rest.pulls.list({
      owner: context.repo.owner,
      repo: context.repo.repo,
      state: "open",
    });

    const existing_pull = pulls.find((i) => i.user?.login === "github-actions[bot]" && i.title.startsWith(`#${no} `));

    const dir = `questions/${getQuestionFullName(no, info.difficulty, info.title)}`;
    const userEmail = `${user.id}+${user.login}@users.noreply.github.com`;

    const files: Record<string, string> = {
      [resolveFilePath(dir, "info", "yml", locale)]: `${YAML.dump(info)}\n`,
      [resolveFilePath(dir, "README", "md", locale)]: `${question}\n`,
      [resolveFilePath(dir, `template.${template}`, "md", "en")]: `${getTemplateFileConent(templateFiles)}\n`,
    };

    await PushCommit(github as any, {
      owner: context.repo.owner,
      repo: context.repo.repo,
      base: "main",
      head: `pulls/${no}`,
      changes: {
        files,
        commit: `feat(question): add #${no} - ${info.title}`,
        author: {
          name: `${user.name || user.id || user.login}`,
          email: userEmail,
        },
      },
      fresh: !existing_pull,
    });

    try {
      await github.rest.issues.getLabel({
        owner: context.repo.owner,
        repo: context.repo.repo,
        name: no.toString(),
      });
    } catch {
      await github.rest.issues.createLabel({
        owner: context.repo.owner,
        repo: context.repo.repo,
        name: no.toString(),
        color: "ffffff",
      });
    }

    const createMessageBody = (prNumber: number) =>
      `${Messages[locale].issue_update_reply.replace("{0}", prNumber.toString())}`;

    if (existing_pull) {
      core.info("-----Pull Request Existed-----");
      core.info(JSON.stringify(existing_pull, null, 2));
      await updateComment(github, context, createMessageBody(existing_pull.number));
    } else {
      core.info("-----Creating PR-----");
      const { data: pr } = await github.rest.pulls.create({
        owner: context.repo.owner,
        repo: context.repo.repo,
        base: "main",
        head: `pulls/${no}`,
        title: `#${no} - ${info.title}`,
        body: `This is an auto-generated PR that auto reflect on #${no}, please go to #${no} for discussion or making changes.\n\nCloses #${no}`,
        labels: ["auto-generated", "new-challenge"],
      });

      await github.rest.issues.addLabels({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: pr.number,
        labels: ["auto-generated", "new-challenge", no.toString()],
      });

      core.info("-----Pull Request-----");
      core.info(JSON.stringify(pr, null, 2));

      if (pr) await updateComment(github, context, createMessageBody(pr.number));
    }
  } else {
    core.info("No matched labels, skipped");
  }
};

async function getTemplateFiles(body: string) {
  const templateStringRange = getCommentRange(body, "template") || "";

  if (!templateStringRange) return null;

  const parsed = unified().use(remarkParse).parse(templateStringRange);

  return createFileMap(parsed);
}

async function updateComment(github: Github, context: Context, body: string) {
  const { data: comments } = await github.rest.issues.listComments({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
  });

  const existing_comment = comments.find((i) => i.user?.login === "github-actions[bot]");

  if (existing_comment) {
    return await github.rest.issues.updateComment({
      comment_id: existing_comment.id,
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body,
    });
  } else {
    return await github.rest.issues.createComment({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body,
    });
  }
}

function getTemplateFileConent(files: Question["templateFiles"]["vanilla"]) {
  let body = "";

  if (files && Object.keys(files).length > 0) {
    Object.keys(files).map((filename) => {
      const file = files[filename];

      body += "```";
      body += `${filename.split(".").pop()} ${filename.replace("/", "")}\n`;
      body += file.code;
      body += "\n```\n\n";
    });
  }

  return body;
}

function getCodeBlock(text: string, title: string, lang = "ts") {
  const regex = new RegExp(`## ${title}[\\s\\S]*?\`\`\`${lang}([\\s\\S]*?)\`\`\``);
  const match = text.match(regex);
  if (match && match[1]) return match[1].toString().trim();
  return null;
}

function getCommentRange(text: string, key: string) {
  const regex = new RegExp(`<!--${key}-start-->([\\s\\S]*?)<!--${key}-end-->`);
  const match = text.match(regex);
  if (match && match[1]) return match[1].toString().trim();
  return null;
}

export function getQuestionFullName(no: number, difficulty: string, title: string) {
  return `${String(no).padStart(5, "0")}-${difficulty}-${slug(title.replace(/\./g, "-").replace(/<.*>/g, ""), {
    tone: false,
  })}`;
}

export function resolveFilePath(dir: string, name: string, ext: string, locale: string) {
  if (locale === DEFAULT_LOCALE) return `${dir}/${name}.${ext}`;
  else return `${dir}/${name}.${locale}.${ext}`;
}

export default action;
