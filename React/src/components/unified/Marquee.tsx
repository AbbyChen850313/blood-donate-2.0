// src/components/unified/Marquee.tsx
// 統一的跑馬燈組件 - 智能輪播系統

import React, { useState, useEffect, useRef } from 'react';

/**
 * 跑馬燈組件屬性接口
 */
export interface MarqueeProps {
  /** 要輪播的文字陣列 */
  texts: string[];
  /** 可選的自定義類名 */
  className?: string;
  /** 滾動速度（像素/秒），預設 80 */
  speed?: number;
  /** 是否啟用自動輪播，預設 true */
  autoRotate?: boolean;
}

/**
 * 統一的跑馬燈組件
 * 
 * 特性：
 * - 智能計算滾動時間，根據文字長度自動調整
 * - 支援多條訊息輪播
 * - 流暢的動畫效果
 * - 響應式字體大小
 * - 自動處理邊界情況
 * 
 * @param props 組件屬性
 * @returns 跑馬燈組件
 * 
 * @example
 * ```tsx
 * <Marquee 
 *   texts={[
 *     "歡迎使用血液庫存管理系統",
 *     "請定期檢查庫存狀況"
 *   ]}
 *   speed={100}
 * />
 * ```
 */
function Marquee({ 
  texts, 
  className = '', 
  speed = 150,
  autoRotate = true 
}: MarqueeProps): JSX.Element {
  
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const marqueeTextRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const marqueeElement = marqueeTextRef.current;
    
    // 邊界檢查
    if (!marqueeElement || !texts || texts.length === 0) {
      return;
    }

    // 重置動畫
    marqueeElement.style.animation = 'none';
    
    // 清理之前的計時器
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    // 計算動畫持續時間
    const textActualWidth = marqueeElement.scrollWidth;
    const containerVisibleWidth = marqueeElement.parentElement?.offsetWidth || window.innerWidth;
    const totalDistance = textActualWidth + containerVisibleWidth;
    const duration = totalDistance / speed;

    // 應用動畫
    requestAnimationFrame(() => {
      marqueeElement.style.animation = `marquee ${duration}s linear forwards`;
    });

    // 設置下一次輪播計時器
    if (autoRotate && texts.length > 1) {
      animationTimeoutRef.current = setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }, duration * 1000);
    }

    // 清理函數
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      if (marqueeElement) {
        marqueeElement.style.animation = 'none';
      }
    };
  }, [currentTextIndex, texts, speed, autoRotate]);

  // 邊界處理：沒有文字時顯示空容器
  if (!texts || texts.length === 0) {
    return (
      <div 
        className={`marquee ${className}`.trim()}
        aria-label="暫無跑馬燈訊息"
      />
    );
  }

  return (
    <div 
      className={`marquee ${className}`.trim()}
      role="banner"
      aria-live="polite"
      aria-label="跑馬燈訊息"
    >
      <div
        key={currentTextIndex} // 強制重新渲染以重置動畫
        className="marquee-text"
        ref={marqueeTextRef}
        aria-label={`當前訊息: ${texts[currentTextIndex]}`}
      >
        {texts[currentTextIndex]}
      </div>
    </div>
  );
}

export default Marquee;