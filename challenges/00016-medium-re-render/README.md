Imagine an app that has some component that takes a long time to re-render.

```jsx
export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </>
  );
}

export default App;
```

Now you are required to add a Button that opens a dialog. For that you added button and dialog and a state to manage the dialog.

```jsx
export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
      {isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> : null}
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </>
  );
}
```

But the problem is with the above code is that because of slow component re-rendering, the dialog takes more than 1 second to open. How can we optimize this?

Source: [https://www.advanced-react.com/examples/01/01](https://www.advanced-react.com/examples/01/01)