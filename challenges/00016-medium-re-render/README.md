Imagine a site that has a slow component.

```jsx
const App = () => <SlowComponent />;

export default App;
```

Now you are required to add a Button that opens a dialog. For that you added button and dialog and a state to manage the dialog.

```jsx
const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SlowComponent />
      <button onClick={() => setIsDialogOpen(true)}>Open Dialog</button>
      {isOpen && (
        <dialog open={isOpen}>
          <button onClick={() => setIsOpen(false)}>Close Dialog</button>
        </dialog>
      )}
    </>
  );
};

export default App;
```

But the problem is with the above code is that because of slow component re-rendering, the dialog takes more than 1 second to open. How can we optimize this?