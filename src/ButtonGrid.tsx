import Button from "./Button";
import type { Digit, Operation } from "./types";

interface ButtonGridProps {
  readonly onNumberClick: (number: Digit) => void;
  readonly onOperationClick: (operation: Operation) => void;
  readonly onEqualsClick: () => void;
  readonly onClearClick: () => void;
  readonly onDecimalClick: () => void;
  readonly pendingOperation: Operation | null;
}

const ButtonGrid = ({
  onNumberClick,
  onOperationClick,
  onEqualsClick,
  onClearClick,
  onDecimalClick,
  pendingOperation,
}: ButtonGridProps) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {/* First row: Clear and operations */}
      <Button
        value="C"
        onClick={onClearClick}
        variant="clear"
        className="col-span-2 py-4"
      />
      <Button
        value="÷"
        onClick={() => onOperationClick("÷")}
        variant={pendingOperation === "÷" ? "active" : "operation"} //AI helped with the syntax of this (and the other similar buttons) line
        className="py-4"
      />
      <Button
        value="×"
        onClick={() => onOperationClick("×")}
        variant={pendingOperation === "×" ? "active" : "operation"}
        className="py-4"
      />

      {/* Second row: 7, 8, 9, - */}
      <Button value="7" onClick={() => onNumberClick("7")} className="py-4" />
      <Button value="8" onClick={() => onNumberClick("8")} className="py-4" />
      <Button value="9" onClick={() => onNumberClick("9")} className="py-4" />
      <Button
        value="−"
        onClick={() => onOperationClick("−")}
        variant={pendingOperation === "−" ? "active" : "operation"}
        className="py-4"
      />

      {/* Third row: 4, 5, 6, + */}
      <Button value="4" onClick={() => onNumberClick("4")} className="py-4" />
      <Button value="5" onClick={() => onNumberClick("5")} className="py-4" />
      <Button value="6" onClick={() => onNumberClick("6")} className="py-4" />
      <Button
        value="+"
        onClick={() => onOperationClick("+")}
        variant={pendingOperation === "+" ? "active" : "operation"}
        className="py-4"
      />

      {/* Fourth row: 1, 2, 3, and equals (starts here, spans 2 rows) */}
      <Button value="1" onClick={() => onNumberClick("1")} className="py-4" />
      <Button value="2" onClick={() => onNumberClick("2")} className="py-4" />
      <Button value="3" onClick={() => onNumberClick("3")} className="py-4" />
      <Button
        value="="
        onClick={onEqualsClick}
        variant="equals"
        className="row-span-2 py-4"
      />

      {/* Fifth row: 0, decimal */}
      <Button
        value="0"
        onClick={() => onNumberClick("0")}
        className="col-span-2 py-4"
      />
      <Button value="." onClick={onDecimalClick} className="py-4" />
    </div>
  );
};

export default ButtonGrid;
