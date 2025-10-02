The nice nesting syntax in JSX is really just sugar for passing a `children` prop. For example, this code:

```js
const Component = () => {
  return (
    <ChildMemo>
      <div>Some text here</div>
    </ChildMemo>
  );
};
```

is equivalent to:

```js
const Component = () => {
  return <ChildMemo children={<div>Some text here</div>} />;
};
```

It behaves exactly the same. JSX elements are just objects created via `React.createElement`. In this case, the `<div>` is represented as an object like:

```js
{
  type: "div",
  // ...other properties
}
```

From a memoization perspective, `ChildMemo` receives a prop (`children`) that is a **new object on every render**. This means `React.memo` won’t prevent re-renders.

To fix this, we need to memoize the `div` itself using `useMemo`:

```js
const Component = () => {
  const content = useMemo(() => <div>Some text here</div>, []);
  return <ChildMemo children={content} />;
};
```

Now the `children` prop is stable, and `React.memo` can effectively prevent unnecessary re-renders.
