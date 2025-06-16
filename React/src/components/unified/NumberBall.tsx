// src/components/unified/NumberBall.tsx
// 統一的數字球組件 - 響應式設計

import React from 'react';

/**
 * 數字球組件屬性接口
 */
export interface NumberBallProps {
  /** 數字球標題（如：A型、B型等） */
  name: string;
  /** 當前數量 */
  currentNumber: number;
  /** 可選的自定義類名 */
  className?: string;
  /** 可選的點擊處理函數 */
  onClick?: () => void;
}

/**
 * 統一的數字球組件
 * 
 * 特性：
 * - 完全響應式設計，自動適應各種螢幕尺寸
 * - 老人友善的大字體設計
 * - 使用 CSS Container Queries 實現智能縮放
 * - 支援點擊交互（可選）
 * - 良好的可訪問性支持
 * 
 * @param props 組件屬性
 * @returns 數字球組件
 * 
 * @example
 * ```tsx
 * <NumberBall 
 *   name="A型" 
 *   currentNumber={25} 
 *   onClick={() => console.log('點擊了A型')}
 * />
 * ```
 */
function NumberBall({ 
  name, 
  currentNumber, 
  className = '', 
  onClick 
}: NumberBallProps): JSX.Element {
  
  /**
   * 處理鍵盤事件（可訪問性支持）
   */
  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  /**
   * 格式化數字顯示
   * 確保數字始終以兩位數顯示（如：05, 25）
   */
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div 
      className={`number-ball ${className}`.trim()}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : 'presentation'}
      tabIndex={onClick ? 0 : -1}
      aria-label={`${name}: ${currentNumber}單位`}
    >
      <div className="number-ball-content">
        <h1 className="number-ball-title">
          {name}
        </h1>
        <p className="number-ball-number">
          {formatNumber(currentNumber)}
        </p>
      </div>
    </div>
  );
}

export default NumberBall;