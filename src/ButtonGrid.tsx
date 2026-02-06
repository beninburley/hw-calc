import Button from "./Button";
import type { Digit, Operation } from "./types";

interface ButtonGridProps {
  onNumberClick: (number: Digit | Operation | "=" | "C" | ".") => void;
  onOperationClick: (operation: Operation) => void;
  onEqualsClick: () => void;
  onClearClick: () => void;
  onDecimalClick: () => void;
  pendingOperation: Operation | null;
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
      <Button value="7" onClick={onNumberClick} className="py-4" />
      <Button value="8" onClick={onNumberClick} className="py-4" />
      <Button value="9" onClick={onNumberClick} className="py-4" />
      <Button
        value="−"
        onClick={() => onOperationClick("−")}
        variant={pendingOperation === "−" ? "active" : "operation"}
        className="py-4"
      />

      {/* Third row: 4, 5, 6, + */}
      <Button value="4" onClick={onNumberClick} className="py-4" />
      <Button value="5" onClick={onNumberClick} className="py-4" />
      <Button value="6" onClick={onNumberClick} className="py-4" />
      <Button
        value="+"
        onClick={() => onOperationClick("+")}
        variant={pendingOperation === "+" ? "active" : "operation"}
        className="py-4"
      />

      {/* Fourth row: 1, 2, 3, and equals (starts here, spans 2 rows) */}
      <Button value="1" onClick={onNumberClick} className="py-4" />
      <Button value="2" onClick={onNumberClick} className="py-4" />
      <Button value="3" onClick={onNumberClick} className="py-4" />
      <Button
        value="="
        onClick={onEqualsClick}
        variant="equals"
        className="row-span-2 py-4"
      />

      {/* Fifth row: 0, decimal */}
      <Button value="0" onClick={onNumberClick} className="col-span-2 py-4" />
      <Button value="." onClick={onDecimalClick} className="py-4" />
    </div>
  );
};

export default ButtonGrid;
