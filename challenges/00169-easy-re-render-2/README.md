Imagine an app that includes a scrollable content area, likely with an intricate layout featuring a sticky header, a collapsible sidebar on the left, and the core functionality in the central section. You were required to add a moving block that shows current scroll position. The code looks like this after implementation:

```jsx
export default function App() {
  const [position, setPosition] = useState(150);

  const onScroll = (e: any) => {
    const calculated = getPosition(e.target.scrollTop);
    setPosition(calculated);
  };

  return (
    <div className="scrollable-block" onScroll={onScroll}>
      <MovingBlock position={position} />
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </div>
  );
}
```

But the implementation was not optimial, because of state updates, the VerySlowComponent re-renders as well making the moving block laggy. How can we optimize this?

Source: [https://www.advanced-react.com/examples/02/01](https://www.advanced-react.com/examples/02/01)