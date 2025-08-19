What will be output in console for the following code:

```jsx
function App() {
  const [state, setState] = useState(0)
  console.log(state)

  useEffect(() => {
    setState(state => state + 1)
  }, [])

  useEffect(() => {
    console.log(state)
    setTimeout(() => {
      console.log(state)
    }, 100)
  }, [])

  return null
}
```

[Source](https://bigfrontend.dev/react-quiz/useEffect)
