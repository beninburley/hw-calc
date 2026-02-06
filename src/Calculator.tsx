import { useState } from "react";
import Display from "./Display";
import ButtonGrid from "./ButtonGrid";
import type { Digit, Operation, CalculatorState } from "./types";

const Calculator = () => {
  const [state, setState] = useState<CalculatorState>({
    displayState: "0",
    pendOp: { preValue: null },
  });

  const handleNumberClick = (number: Digit): void => {
    console.log("Number clicked:", number);
    if (state.displayState === "0") {
      setState({
        ...state,
        displayState: number,
      });
    } else {
      setState({
        ...state,
        displayState: state.displayState + number,
      });
    }
  };

  const handleOperationClick = (op: Operation): void => {
    console.log("Operation clicked:", op);
    const hasPendingOp =
      state.pendOp.preValue !== null &&
      "operand" in state.pendOp &&
      state.pendOp.operand !== null;
    if (!hasPendingOp) {
      // console.log(
      //   "There is no pending operation. Setting Operation and previous value",
      // );
      setState({
        displayState: state.displayState + op,
        pendOp: {
          preValue: Number(state.displayState),
          operand: op,
        },
      });
    } else if (
      hasPendingOp &&
      "operand" in state.pendOp &&
      state.pendOp.operand &&
      state.displayState.split(state.pendOp.operand).length > 1 &&
      state.displayState.split(state.pendOp.operand)[1].length > 0
    ) {
      console.log("There is a pending operation.");
      const result = handleEqualsClick();
      setState({
        displayState: result + op,
        pendOp: {
          preValue: Number(result),
          operand: op,
        },
      });
    } else {
      console.log("replacing operator wih", op);
      const currentOp = "operand" in state.pendOp ? state.pendOp.operand : null;
      const result = currentOp
        ? state.displayState.replace(currentOp, "")
        : state.displayState;
      setState({
        displayState: result + op,
        pendOp: {
          preValue: state.pendOp.preValue,
          operand: op,
        },
      });
    }
  };

  const operations: Record<Operation, (a: number, b: number) => number> = {
    //I originally wanted to make a traditional dictionary for the operations, but AI helped me make this one
    "+": (a, b) => a + b,
    "−": (a, b) => a - b,
    "×": (a, b) => a * b,
    "÷": (a, b) => a / b,
  };

  const handleEqualsClick = (): string => {
    console.log("Equals clicked");

    if (state.pendOp.preValue === null) {
      return state.displayState;
    }
    if (state.pendOp.operand && "operand" in state.pendOp) {
      const parts = state.displayState.split(state.pendOp.operand);
      const secondNumber = Number(parts[1]);

      console.log(
        "Performing operation:",
        state.pendOp.preValue,
        state.pendOp.operand,
        secondNumber,
      );

      const result = operations[state.pendOp.operand](
        state.pendOp.preValue,
        secondNumber,
      );

      setState({
        displayState: String(result),
        pendOp: { preValue: null },
      });
      return String(result);
    }
    return state.displayState;
  };

  const handleClearClick = (): void => {
    console.log("Clear clicked");
    setState({
      displayState: "0",
      pendOp: { preValue: null },
    });
  };

  const handleDecimalClick = (): void => {
    console.log("Decimal clicked");
    if (state.displayState.includes(".")) {
      if (
        "operand" in state.pendOp &&
        !state.displayState
          .replace(String(state.pendOp.preValue), "")
          .includes(".")
      ) {
        setState({
          ...state,
          displayState: state.displayState + ".",
        });
      }
    } else if (!state.displayState.includes(".")) {
      setState({
        ...state,
        displayState: state.displayState + ".",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-slate-700 rounded-2xl shadow-2xl p-6 w-80">
        <Display value={state.displayState} />
        <ButtonGrid
          onNumberClick={handleNumberClick}
          onOperationClick={handleOperationClick}
          onEqualsClick={handleEqualsClick}
          onClearClick={handleClearClick}
          onDecimalClick={handleDecimalClick}
          pendingOperation={
            "operand" in state.pendOp ? state.pendOp.operand : null
          }
        />
      </div>
    </div>
  );
};

export default Calculator;
