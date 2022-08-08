import React, { useEffect, useState } from "react";
import "./App.scss";
import NumberDisplay from "./components/NumberDisplay/NumberDisplay";
import { generateCells } from "./utils/data";
import Button from "./components/Button/Button";
import { Cell, CellState, Face } from "./types/types";
import { NO_OF_BOMBS } from "./constants/constants";

const App = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [face, setFace] = useState<Face>(Face.smile);
  const [time, setTime] = useState(0);
  const [live, setLive] = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState(NO_OF_BOMBS);

  useEffect(() => {
    const handleMouseDown = () => {
      setFace(Face.oh);
    };
    const handleMouseUp = () => {
      setFace(Face.smile);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (live && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time]);

  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    if (!live) {
      setLive(true);
    }
  };

  const handleCellContext =
    (rowParam: number, colParam: number) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      e.preventDefault();

      if (!live) {
        setLive(true);
      }

      const currentCells = cells.slice();
      const currentCell = cells[rowParam][colParam];

      if (currentCell.state === CellState.visible) {
        return;
      } else if (currentCell.state === CellState.open) {
        currentCells[rowParam][colParam].state = CellState.flagged;
        setCells(currentCells);
        if (bombCounter > -99) {
          setBombCounter(bombCounter - 1);
        }
      } else if (currentCell.state === CellState.flagged) {
        currentCells[rowParam][colParam].state = CellState.open;
        setCells(currentCells);
        setBombCounter(bombCounter + 1);
      }
    };

  const handleFaceClick = (): void => {
    if (live) {
      setLive(false);
      setTime(0);
      setCells(generateCells());
    }
  };

  const renderCells = () => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Button
          key={`${rowIndex} - ${colIndex}`}
          state={cell.state}
          value={cell.value}
          row={rowIndex}
          col={colIndex}
          onClick={handleCellClick}
          onContext={handleCellContext}
        />
      ))
    );
  };

  return (
    <div className="app">
      <div className="header">
        <NumberDisplay value={bombCounter} />
        <div className="face" onClick={handleFaceClick}>
          <span role="img" aria-label="face">
            {face}
          </span>
        </div>
        <NumberDisplay value={time} />
      </div>
      <div className="body">{renderCells()}</div>
    </div>
  );
};

export default App;
