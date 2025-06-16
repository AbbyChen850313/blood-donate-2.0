// src/pages/customer/customer_numberUnit.tsx

import React from "react";

// 定義 ShowNumberProps 接口，避免重複定義
interface ShowNumberProps {
  name: string;
  currentNumber: number;
}

// PC 版的數字球組件
export function ShowNumberPC({ name, currentNumber }: ShowNumberProps) {
  return (
    <div className="numberBallPC"> {/* PC 版使用 numberBallPC */}
      <div className="numberBallContentPC"> {/* 使用 numberBallContentPC */}
        <h1>{name}</h1>
        <p>{currentNumber}</p>
      </div>
    </div>
  );
}

// 手機版的數字球組件
export function ShowNumber({ name, currentNumber }: ShowNumberProps) {
  return (
    <div className="numberBall"> {/* 手機版使用 numberBall */}
      <div className="numberBallContent"> {/* 使用 numberBallContent */}
        <h1>{name}</h1>
        <p>{currentNumber}</p>
      </div>
    </div>
  );
}