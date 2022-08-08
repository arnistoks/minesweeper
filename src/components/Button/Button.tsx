import React from "react";
import "./Button.scss";
import { CellState, CellValue } from "../../types/types";

interface ButtonProps {
  state: CellState;
  value: CellValue;
  row: number;
  col: number;
  onClick(rowParam: number, colParam: number): (...args: any[]) => void;
  onContext(rowParam: number, colParam: number): (...args: any[]) => void;
}

const Button: React.FC<ButtonProps> = ({
  state,
  value,
  row,
  col,
  onClick,
  onContext,
}) => {
  const renderContent = () => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return (
          <span role="img" aria-label="bomb">
            💣
          </span>
        );
      } else if (value === CellValue.none) {
        return null;
      }

      return value;
    } else if (state === CellState.flagged) {
      return (
        <span role="img" aria-label="flag">
          🚩
        </span>
      );
    }
    return null;
  };

  return (
    <div
      className={`button ${
        state === CellState.visible && "visible"
      } value-${value}`}
      onClick={onClick(row, col)}
      onContextMenu={onContext(row, col)}
    >
      {renderContent()}
    </div>
  );
};

export default Button;
