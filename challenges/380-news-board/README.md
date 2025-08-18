<!--info-header-start--><h1>News Board <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23react-999" alt="#react"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/380-news-board" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement a React component that fetches and displays stories from the [Hacker News API](https://github.com/HackerNews/API).

- Use the endpoint:

  ```
  https://hacker-news.firebaseio.com/v0/topstories.json
  ```

  to get a list of top story IDs.

- For each story ID, fetch the story details from:

  ```
  https://hacker-news.firebaseio.com/v0/item/{id}.json
  ```

**Requirements:**

1. Fetch the list of top story IDs.
2. Display the stories **5 at a time**.
3. Include a **“Load More” button** to fetch the next 5 stories.
4. Show a loading state while fetching.
5. Show an error state if the API request fails.
6. On success, display each story’s title as a clickable link to its URL.
7. Use React hooks (`useState`, `useEffect`) to manage state.

**Bonus:**

- Disable the **“Load More”** button when no more stories are left.
- Handle retries if a fetch request fails.

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,380,undefined&title=380%20-%20News%20Board%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A380+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
