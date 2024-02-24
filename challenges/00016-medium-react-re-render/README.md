We have 3 components: App at the top, which renders `Counter`, which renders `BigCountNumber` and a simple `Decoration` component. Due to how React works, when the state `count` changes, the `Decoration` is also re-rendering despite of the fact it is not dependent on the `count` state since it is not receiving count as prop.
How can we avoid re-render of Decoration component?
