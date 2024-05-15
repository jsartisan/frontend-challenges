import YAML from "js-yaml";
import slug from "limax";
import fs from "fs-extra";
import type { Action } from "../../types";
import { DEFAULT_LOCALE } from "../../constants";

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

  core.info("-----Issue-----");
  core.info(JSON.stringify(issue, null, 2));

  core.info("-----no-----");
  core.info(no.toString());

  if (!issue) return;

  const labels: string[] = (issue.labels || []).map((i: any) => i && i.name).filter(Boolean);

  if (labels.includes("new-challenge")) {
    const locale = labels.includes("ja") ? "ja" : labels.includes("zh-CN") ? "zh-CN" : "en";
    const body = issue.body || "";
    const infoRaw = getCodeBlock(body, Messages[locale].info, "yaml");
    let info: any;

    try {
      info = YAML.load(infoRaw || "");
    } catch {
      info = null;
    }

    core.info("-----Playload-----");
    core.info(JSON.stringify(context.payload, null, 2));

    // check if if there is something missing in the issue
    if (!info) {
      core.info("-----Invalid Issue-----");
      return;
    }

    // create discussion with octokit graphql
    if (info.discussion !== undefined) {
      const { data: response } = await github.graphql<any>(
        `mutation {
            createDiscussion(input: {
              repositoryId: "${context.repo.repo}",
              title: "${info.title}",
              body: "This is a discussion for #${no} - ${info.title}",
            }) {
              discussion {
              id
            }
          }
            }`,
      );

      info.discussion = response.discussion.id;

      core.info("-----Discussion Created-----");
      core.info(JSON.stringify(response, null, 2));
    }

    const dir = `challenges/${getQuestionFullName(no, info.difficulty, info.title)}`;

    fs.writeFile(resolveFilePath(dir, "info", "yml", locale), `${YAML.dump(info)}\n`);
  } else {
    core.info("No matched labels, skipped");
  }
};

function getCodeBlock(text: string, title: string, lang = "ts") {
  const regex = new RegExp(`## ${title}[\\s\\S]*?\`\`\`${lang}([\\s\\S]*?)\`\`\``);
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
