Implement a custom React hook `useMediaQuery(query, defaultValue)` that tells a component whether a CSS media query currently matches, and re-renders the component when that changes.

```js
const isWide = useMediaQuery("(min-width: 768px)");
const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
```

Arguments:

- `query`: any media query string, the same text you would write after `@media` in CSS.
- `defaultValue`: the value to return when the browser cannot answer the question. Defaults to `false`.

It returns a boolean: `true` while the query matches, `false` otherwise.

Requirements:

- The very first render must already return the right value. Don't render `false` first and then fix it in an effect, because that makes the layout flicker.
- When the query starts or stops matching (the window is resized, the user switches the OS to dark mode, and so on), the component re-renders with the new value. Hint: `window.matchMedia(query)` returns a `MediaQueryList` that fires a `change` event.
- Changes to other media queries must not re-render the component.
- If `query` changes, the hook follows the new query from then on and stops listening to the old one.
- Clean up: when the component unmounts, no listener may be left behind.
- Several components using the same query must always agree on the value.
- If `window.matchMedia` does not exist (very old browsers, some test environments) or the code runs on the server, return `defaultValue` instead of crashing.

### Example

```jsx
function Layout() {
  const isWide = useMediaQuery("(min-width: 768px)");

  return isWide ? <SidebarLayout /> : <MobileLayout />;
}
```

Drag the browser window narrower than 768px and the layout switches to the mobile one. Drag it wider and the sidebar comes back, with no page reload.

Bonus: think about which built-in React hook is designed for subscribing to a value that lives outside React.
