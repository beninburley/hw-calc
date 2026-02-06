import { useState } from "react";
import Display from "./Display";
import ButtonGrid from "./ButtonGrid";
import type { Digit, Operation } from "./types";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [pendingOperation, setPendingOperation] = useState<Operation | null>(
    null,
  );

  const handleNumberClick = (
    number: Digit | Operation | "=" | "C" | ".",
  ): void => {
    console.log("Number clicked:", number);
    // TODO: Implement number input logic
    const prevNum = display; //Is this even worth doing?
    if (prevNum === "0") {
      setDisplay(number); //Figure out why this is unsafe and how to do it better
    } else {
      setDisplay((prevNum) => prevNum + number); //Figure out why this is unsafe and how to do it better
    }
  };

  const handleOperationClick = (op: Operation): void => {
    console.log("Operation clicked:", op);
    // TODO: Implement operation logic
    let result: string = "";
    const pends: Operation | null = pendingOperation;
    if (!pends) {
      // console.log(
      //   "There is no pending operation. Setting Operation and previous value",
      // );
      result = display;
      setPendingOperation(op);
      setPreviousValue(Number(result));
    } else if (
      pends &&
      display.split(pends).length > 1 &&
      display.split(pends)[1].length > 0
    ) {
      console.log("There is a pending operation.");
      console.log("Here's the parts of the display:", display.split(pends));
      result = handleEqualsClick();
      setPreviousValue(Number(result));
      setPendingOperation(op);
    } else if (pends !== null) {
      console.log("replacing", pends, "with", op);
      result = display.replace(pends, "");
      setPendingOperation(op);
    }
    console.log("End operation, making", result, op);
    setDisplay(result + op);
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

    if (!pendingOperation || previousValue === null) {
      return display;
    }

    const parts = display.split(pendingOperation);
    const secondNumber = Number(parts[1]);

    console.log(
      "Performing operation:",
      previousValue,
      pendingOperation,
      secondNumber,
    );

    const result = operations[pendingOperation](previousValue, secondNumber);

    setPendingOperation(null);
    setDisplay(String(result));
    return String(result);
  };

  const handleClearClick = (): void => {
    console.log("Clear clicked");
    setDisplay("0");
    setPendingOperation(null);
    setPreviousValue(null);
  };

  const handleDecimalClick = (): void => {
    console.log("Decimal clicked");
    if (display.includes(".")) {
      if (
        pendingOperation &&
        !display.replace(String(previousValue), "").includes(".")
      ) {
        setDisplay(display + ".");
      }
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-slate-700 rounded-2xl shadow-2xl p-6 w-80">
        <Display value={display} />
        <ButtonGrid
          onNumberClick={handleNumberClick}
          onOperationClick={handleOperationClick}
          onEqualsClick={handleEqualsClick}
          onClearClick={handleClearClick}
          onDecimalClick={handleDecimalClick}
          pendingOperation={pendingOperation}
        />
      </div>
    </div>
  );
};

export default Calculator;
