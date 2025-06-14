// src/pages/customer/customer_marquee.tsx - 修正 ESLint 警告
import React, { useState, useEffect, useRef } from 'react';

function MyMarquee({ texts }: { texts: Array<string> }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const marqueeTextRef = useRef<HTMLDivElement | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const marqueeElement = marqueeTextRef.current;
    if (!marqueeElement || texts.length === 0) {
      return;
    }

    marqueeElement.style.animation = 'none';
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    // 移除會觸發 ESLint 警告的 marqueeElement.offsetHeight; 這一行
    // 因為在 React 中，使用 key 屬性來強制組件重新渲染通常已足夠。
    // marqueeElement.offsetHeight; // 移除此行

    const pixelsPerSecond = 80;
    const textActualWidth = marqueeElement.scrollWidth;
    const containerVisibleWidth = marqueeElement.parentElement ? marqueeElement.parentElement.offsetWidth : window.innerWidth;
    const totalDistance = textActualWidth + containerVisibleWidth;
    const duration = totalDistance / pixelsPerSecond;

    requestAnimationFrame(() => {
        marqueeElement.style.animation = `marquee ${duration}s linear forwards`;
    });

    animationTimeoutRef.current = setTimeout(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, duration * 1000);

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      if (marqueeElement) {
        marqueeElement.style.animation = 'none';
      }
    };
  }, [currentTextIndex, texts]);

  if (!texts || texts.length === 0) {
    return <div className="marquee"></div>;
  }

  return (
    <div className="marquee">
      <div
        key={currentTextIndex} // 使用 currentTextIndex 作為 key，確保 React 重新渲染
        className="marquee-text"
        ref={marqueeTextRef}
      >
        {texts[currentTextIndex]}
      </div>
    </div>
  );
}

export default MyMarquee;