// https://nextjs.org/docs/api-reference/next.config.js/introduction
module.exports = {
  reactStrictMode: false,
  redirects: async () => [
    {
      source: "/1/solutions",
      destination:
        "https://github.com/jsartisan/frontend-challenges/issues?q=label%3A1+label%3Aanswer+sort%3Areactions-%2B1-desc",
      permanent: true,
    },
    {
      source: "/2/solutions",
      destination:
        "https://github.com/jsartisan/frontend-challenges/issues?q=label%3A2+label%3Aanswer+sort%3Areactions-%2B1-desc",
      permanent: true,
    },
    {
      source: "/3/solutions",
      destination:
        "https://github.com/jsartisan/frontend-challenges/issues?q=label%3A3+label%3Aanswer+sort%3Areactions-%2B1-desc",
      permanent: true,
    },
    {
      source: "/4/solutions",
      destination:
        "https://github.com/jsartisan/frontend-challenges/issues?q=label%3A4+label%3Aanswer+sort%3Areactions-%2B1-desc",
      permanent: true,
    },
  ],
};
