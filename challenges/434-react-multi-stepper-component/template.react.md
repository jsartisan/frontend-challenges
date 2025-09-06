```tsx index.tsx 
import React, { useState, forwardRef, useImperativeHandle } from 'react';

export interface StepperProps {
  steps: string[];
  initialStep?: number;
  onChange?: (index: number) => void;
  allowSkip?: boolean;
  vertical?: boolean;
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
      vertical = false,
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

```tsx index.test.tsx 
import React, { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Stepper, StepperRef } from './index';

describe('Stepper', () => {
  const steps = ['A', 'B', 'C'];

  it('renders all steps', () => {
    render(<Stepper steps={steps} />);
    steps.forEach((s) => expect(screen.getByText(s)).toBeInTheDocument());
  });

  it('highlights initial step', () => {
    render(<Stepper steps={steps} initialStep={1} />);
    const step = screen.getByText('B');
    expect(step).toHaveAttribute('aria-current', 'step');
  });

  it('imperative next/prev work', () => {
    const ref = createRef<StepperRef>();
    render(<Stepper ref={ref} steps={steps} />);

    ref.current?.next();
    expect(screen.getByText('B')).toHaveAttribute('aria-current', 'step');

    ref.current?.prev();
    expect(screen.getByText('A')).toHaveAttribute('aria-current', 'step');
  });

  it('disallows skipping when allowSkip=false', () => {
    render(<Stepper steps={steps} allowSkip={false} />);
    const future = screen.getByText('C');
    fireEvent.click(future);
    expect(screen.getByText('A')).toHaveAttribute('aria-current', 'step');
  });
});
```


