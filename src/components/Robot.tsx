'use client';

import { useState } from 'react';

const ALERT_MESSAGE = 'Dont push me of the edge plzz 🙏';

enum Direction {
  North = 'North',
  East = 'East',
  West = 'West',
  South = 'South',
}

const Robot = ({ gridCells }: { gridCells: number }) => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [direction, setDirection] = useState(Direction.North);

  const selectedCell = positionY * gridCells + positionX;

  // Shifts Direction of robot counter clockwise
  const handleLeft = () => {
    switch (direction) {
      case Direction.East:
        setDirection(Direction.North);
        break;

      case Direction.South:
        setDirection(Direction.East);
        break;

      case Direction.West:
        setDirection(Direction.South);
        break;

      // North
      default:
        setDirection(Direction.West);
        break;
    }
  };

  // Shifts Direction of robot counter anti clockwise
  const handleRight = () => {
    switch (direction) {
      case Direction.East:
        setDirection(Direction.South);
        break;

      case Direction.South:
        setDirection(Direction.West);
        break;

      case Direction.West:
        setDirection(Direction.North);
        break;

      // North
      default:
        setDirection(Direction.East);
        break;
    }
  };

  const updatePositionX = (x: number) => {
    // Bail early if new value is negetive or past max number of grid items
    if (x > gridCells || x < 0) {
      // eslint-disable-next-line no-alert
      alert(ALERT_MESSAGE);
      return;
    }
    setPositionX(x);
  };

  const updatePositionY = (y: number) => {
    // Bail early if new value is negetive or past max number of grid items
    if (y > gridCells || y < 0) {
      // eslint-disable-next-line no-alert
      alert(ALERT_MESSAGE);
      return;
    }
    setPositionY(y);
  };

  const updateDirection = (dir: Direction) => {
    setDirection(dir);
  };

  const move = () => {
    // To allow for 0 based value
    const maxCell = gridCells - 1;
    switch (direction) {
      case Direction.South:
        if (positionY === 0) {
          // eslint-disable-next-line no-alert
          alert(ALERT_MESSAGE);
          return;
        }
        updatePositionY(positionY - 1);
        break;
      case Direction.East:
        if (positionX === maxCell) {
          // eslint-disable-next-line no-alert
          alert(ALERT_MESSAGE);
          return;
        }
        updatePositionX(positionX - 1);
        break;
      case Direction.West:
        if (positionX === 0) {
          // eslint-disable-next-line no-alert
          alert(ALERT_MESSAGE);
          return;
        }
        updatePositionX(positionX + 1);
        break;

      // North
      default:
        if (positionY / maxCell === 1) {
          // eslint-disable-next-line no-alert
          alert(ALERT_MESSAGE);
          return;
        }
        updatePositionY(positionY + 1);
        break;
    }
  };

  const report = () => {
    // There's a UI and console.log is just a lil boring so 🤷
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(
      `X is at ${positionX}, Y is at ${positionY} andddd direction poining in ${direction}`,
    );
    synth.speak(utterThis);
  };

  return (
    <div>
      <form>
        <label htmlFor="x">
          X:
          <input
            onChange={(e) => updatePositionX(Number(e.target.value))}
            type="number"
            value={positionX}
            className="bg-gray-200"
            id="x"
          />
        </label>
        <label htmlFor="y">
          Y:
          <input
            onChange={(e) => updatePositionY(Number(e.target.value))}
            type="number"
            value={positionY}
            className="bg-gray-200"
            id="y"
          />
        </label>
        <label htmlFor="direction">
          Direction:
          <select
            value={direction}
            role="combobox"
            onChange={(e) => updateDirection(e.target.value as Direction)}
            className="bg-gray-200"
            id="direction"
          >
            {(Object.keys(Direction) as Array<keyof typeof Direction>).map(
              (key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ),
            )}
          </select>
        </label>
      </form>

      <button
        onClick={handleLeft}
        className=" m-2 rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        type="button"
      >
        left
      </button>
      <button
        onClick={handleRight}
        className=" m-2 rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        type="button"
      >
        right
      </button>
      <button
        onClick={move}
        className=" m-2 rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        type="button"
      >
        move
      </button>

      <button
        onClick={report}
        className=" m-2 rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        type="button"
      >
        report
      </button>

      <div
        className="m-10  grid h-96 w-96 rotate-180 gap-1"
        style={{ gridTemplateColumns: `repeat(${gridCells}, minmax(0, 1fr)` }}
      >
        {Array.from({ length: gridCells * gridCells }, (_, i) => i).map((x) => (
          <div
            /* Give custom background colour if slected */
            className={x === selectedCell ? 'bg-sky-500/80' : 'bg-sky-500/20'}
            key={x}
          />
        ))}
      </div>
    </div>
  );
};

export { Robot };
