Consider the following code:

```js
const ChildMemo = React.memo(Child);
const Component = () => {
  return (
    <ChildMemo>
      <div>Some text here</div>
    </ChildMemo>
  );
};
```

Let's say a state change happens in the `Component`, will `ChildMemo` re-render or not?
