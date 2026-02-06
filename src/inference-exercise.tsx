import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  setCount(count + 1);
  setCount((prev) => prev + 1);

  console.log(count, setCount);
  return <div>{count}</div>;
}

interface MyButtonProps {
  onClick: (value: string) => void;
}

export function MyButton(props: MyButtonProps) {
  return <button onClick={() => props.onClick("7")}>7</button>;
}

export function MyCalculator() {
  const handleClick = (value: string) => {
    console.log(value);
  };

  return <MyButton onClick={handleClick} />;
}
