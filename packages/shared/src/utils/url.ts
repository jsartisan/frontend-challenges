import { Challenge, SupportedLocales, SupportedTemplates } from "../types";
import { DEFAULT_LOCALE, DOMAIN, REPO } from "../constants";

export const PLAYGROUND = `${DOMAIN}/play`;

export function getRepoREADMEUrl(locale?: string) {
  return locale && locale !== DEFAULT_LOCALE ? `${REPO}/blob/main/README.${locale}.md` : `${REPO}/blob/main/README.md`;
}

/**
 * get question 's readme url (repo)
 * @param quiz
 * @param locale
 * @param absolute
 * @returns
 */
export function getChallengeReadmeURL(quiz: Challenge, locale?: string, absolute = false) {
  const prefix = absolute ? `${REPO}/blob/main` : ".";

  return locale && locale !== DEFAULT_LOCALE && quiz.readme[locale]
    ? `${prefix}/challenges/${quiz.path}/README.${locale}.md`
    : `${prefix}/challenges/${quiz.path}/README.md`;
}

export function toNearborREADME(quiz: Challenge, locale?: string) {
  return locale && locale !== DEFAULT_LOCALE && quiz.readme[locale] ? `./README.${locale}.md` : "./README.md";
}

export function toReadmeShort(no: number, locale?: string) {
  return locale !== DEFAULT_LOCALE ? `${DOMAIN}/${no}/${locale}` : `${DOMAIN}/${no}`;
}

/**
 * get questions url (site)
 *
 * @param path
 * @returns
 */
export function getQuestionURL(path: string) {
  return `${DOMAIN}/challenges/${path}`;
}

/**
 * get question's solution url (repo)
 *
 * @param no
 * @returns
 */
export function getSolutionsURL(no: number) {
  return `${REPO}/issues?q=label%3A${no}+label%3Aanswer+sort%3Areactions-%2B1-desc`;
}

/**
 * returns the url for submitting a new question (repo)
 * which is a github issue
 *
 * @param props
 * @returns
 */
export const getShareAnswerURL = (props: {
  challenge: Challenge;
  locale?: SupportedLocales;
  template?: SupportedTemplates;
}) => {
  const { challenge, template, locale = "en" } = props;
  const BASE_URL = `${REPO}/issues/new?template=answer.md&labels=answer,${challenge.no}`;

  if (challenge.type === "quiz") {
    return `${BASE_URL},quiz&title=${encodeURIComponent(
      `${challenge.no} - ${challenge.info[locale]?.title} - ${template}`,
    )}`;
  }

  const readme = ``;

  if (locale && locale !== DEFAULT_LOCALE) {
    return `${BASE_URL},${encodeURIComponent(locale)},${template}&title=${encodeURIComponent(
      `${challenge?.no} - ${challenge?.info.en?.title} - ${template}`,
    )}&body=${encodeURIComponent(readme)}`;
  }

  const URL = `${BASE_URL},${template}&title=${encodeURIComponent(
    `${challenge?.no} - ${challenge?.info.en?.title} - ${template}`,
  )}&body=${encodeURIComponent(readme)}`;

  return URL;
};
