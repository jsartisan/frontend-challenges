```tsx App.tsx
import React, { useState } from "react";

import { Stepper } from "./Stepper";

const App = () => {
  const steps = ["Login", "Shipping", "Payment", "Review"];
  const [currentStep, setCurrentStep] = useState(steps[0])

  return (
    <div style={{ padding: 20 }}>
      <h2>Checkout Flow</h2>

      <Stepper
        steps={steps}
        initialStep={0}
        allowSkip={false}
        onChange={(step) => setCurrentStep(step)}
      />

      <div>{`You are on the ${currentStep} step`}</div>
    </div>
  );
};

export default App;
```

```tsx Stepper.tsx active
import React, { useState, forwardRef, useImperativeHandle } from 'react';

export interface StepperProps {
  steps: string[];
  initialStep?: number;
  onChange?: (index: number) => void;
  allowSkip?: boolean;
}

export interface StepperRef {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  reset: () => void;
}

export const Stepper = forwardRef<StepperRef, StepperProps>(
  (
    {
      steps,
      initialStep = 0,
      onChange,
      allowSkip = true,
    },
    ref,
  ) => {
    const [current, setCurrent] = useState(initialStep);

    // TODO: expose imperative handlers via useImperativeHandle
    // TODO: render steps list respecting vertical / horizontal layout
    // TODO: apply aria-current and click behaviour according to allowSkip

    return (
      <div /* TODO: layout classes */>
        {/* TODO: render each step */}
      </div>
    );
  },
);

Stepper.displayName = 'Stepper';
```