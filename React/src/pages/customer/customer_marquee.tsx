import React, { useState, useEffect, useRef } from 'react';
function MyMarquee({ texts }:{ texts: Array<string>}) {

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const marqueeTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const marqueeElement = marqueeTextRef.current;
  
    if (marqueeElement && texts.length > 0) { 
      const animationDuration = Math.max(25, texts[currentTextIndex].length); // 調整每個字增加的時間

      marqueeElement.style.animationDuration = `${animationDuration}s`;
  
      const handleAnimationIteration = () => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      };
  
      marqueeElement.addEventListener('animationiteration', handleAnimationIteration);
  
      return () => {
        marqueeElement.removeEventListener('animationiteration', handleAnimationIteration);
      };
    }
  }, [currentTextIndex, texts]);
  if (!texts) {
    return <div className="marquee"></div>;
  }

  return (
    <div className="marquee">
      <div
        key={texts[currentTextIndex]}
        className="marquee-text"
        ref={marqueeTextRef}
      >
        {texts[currentTextIndex]}
      </div>
    </div>
  );
}

export default MyMarquee;
