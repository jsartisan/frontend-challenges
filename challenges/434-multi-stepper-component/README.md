Create a reusable **Multi-Stepper** UI component in React + TypeScript.

The component visually represents a sequence of steps (like a checkout wizard) and exposes imperative helpers to move forward/backward.

### Requirements

1. **Props**

   ```ts
   interface StepperProps {
     steps: string[];           // Step titles / labels
     initialStep?: number;      // default 0
     onChange?: (index: number) => void; // called after a step change
     allowSkip?: boolean;       // if true, clicking ahead skips steps
     vertical?: boolean;        // render vertically instead of horizontally
   }
   ```

2. **API** – the component must forward a ref exposing:

   ```ts
   interface StepperRef {
     next: () => void;
     prev: () => void;
     goTo: (index: number) => void;
     reset: () => void;
   }
   ```

3. **Behaviour**
   * Highlight the **current** step.
   * Disable `prev` on first step and `next` on last step.
   * Emit `onChange` every time the active step changes.
   * If `allowSkip` is `false`, clicking a future step does **nothing**.
   * When `vertical` is `true`, render the steps top-to-bottom, otherwise left-to-right.

4. **Accessibility**
   * Use semantic buttons for step controls.
   * Provide `aria-current="step"` on the active step.

### Example Usage

```tsx
const Wizard = () => {
  const stepperRef = useRef<StepperRef>(null);

  return (
    <>
      <Stepper ref={stepperRef} steps={["Cart", "Address", "Payment", "Review"]} />
      <button onClick={() => stepperRef.current?.prev()}>Back</button>
      <button onClick={() => stepperRef.current?.next()}>Next</button>
    </>
  );
};
```
