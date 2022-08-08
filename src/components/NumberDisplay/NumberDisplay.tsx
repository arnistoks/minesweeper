import React from "react";
import "./NumberDisplay.scss";

interface NumberDisplayProps {
  value: number;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ value }) => {
  const a = 123;

  return (
    <div className="numberDisplay">
      {value < 0
        ? `-${Math.abs(value).toString().padStart(2, "0")}`
        : value.toString().padStart(3, "0")}
    </div>
  );
};

export default NumberDisplay;
