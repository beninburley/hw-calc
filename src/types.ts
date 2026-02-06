export type ButtonVariant =
  | "default"
  | "operation"
  | "equals"
  | "clear"
  | "active";

export type Operation = "+" | "−" | "×" | "÷";

export type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

// PendingOperation doesn't need an operand if there is no previous value
export type PendingOperation =
  | { preValue: number; operand: Operation | null }
  | { preValue: null };

// Calculator State requires two fields: the display and the pending operation
// (within the operation exists the previous value and the operand).
// These fields are what we used previously with our useState hooks, so I just
// imported them into the CalculatorState.
export type CalculatorState = {
  displayState: string;
  pendOp: PendingOperation;
};
