<!--info-header-start--><h1>re-render 2 <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23react-999" alt="#react"/> <img src="https://img.shields.io/badge/-%23performance-999" alt="#performance"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/169-re-render-2" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

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


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,169,undefined&title=169%20-%20re-render%202%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A169+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->