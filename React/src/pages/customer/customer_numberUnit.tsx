// customer_blood_number.tsx
import React from "react";

export function ShowNumber({ name, currentNumber }: { name: string; currentNumber: number }) {
  return (
    <div className="numberBall">
        <h1>{name}</h1>
        <p>{currentNumber}</p>
    </div>
  );
}
export function ShowNumberPC({ name, currentNumber }: { name: string; currentNumber: number }) {
  return (
    <div className="numberBallPC">
      <div className="numberBallContentPC">
        <h1>{name}</h1>
        <p>{currentNumber}</p>
      </div>
    </div>
  );
}
