Consider the app that renders a SearchBar component, which is memoized using React.memo. The SearchBar accepts an onSearch function as a prop to update the search query.

**Can you answer the following**:
- The SearchBar is memoized using React.memo, yet it still re-renders every time the parent component updates. Why does this happen?
- What is causing the memoization of SearchBar to fail, and how would you resolve the issue?
- Modify the code so that SearchBar only re-renders when it truly needs to, without breaking the functionality of the search feature.
