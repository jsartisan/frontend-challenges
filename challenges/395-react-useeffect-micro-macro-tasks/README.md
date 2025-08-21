<!--info-header-start--><h1>useEffect 4 <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23react-999" alt="#react"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/395-useeffect-4" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

What will be the output in console for the following code:

```jsx
function App() {
  const [state] = useState(0)
  console.log(1)
  
  const start = Date.now()
  while (Date.now() - start < 50) {
    window.timestamp = Date.now()
  }
  
  useEffect(() => {
    console.log(2)
  }, [state])

  Promise.resolve().then(() => console.log(3))

  setTimeout(() => console.log(4), 0)

  return null
}
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,395,quiz&title=395%20-%20useEffect%204%20-%20undefined" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A395+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->