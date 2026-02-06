export type ButtonVariant =
  | "default"
  | "operation"
  | "equals"
  | "clear"
  | "active";

export type Operation = "+" | "−" | "×" | "÷";

export type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type PendingOperation = Operation | null;

export type CalculatorState = "hi";
