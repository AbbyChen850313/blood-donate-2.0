// src/pages/customer/CustomerView.tsx (整合且 Clean Code 的客戶頁面主視圖 - 沒有外部 Hook)

import React, { useState, useEffect } from "react"; // 新增 useEffect
import {
  useMoreData,
  useNumberData,
} from "../../components/backend/backend_reader";
import MyMarquee from "./customer_marquee";
import { ShowNumber } from "./customer_numberUnit";
import YouTubeVideo from "./customer_youtube";
import '../../Css/customerCss.css'; // 導入客戶頁面主要 CSS

function CustomerView() {
  const { title, marquee, info, video } = useMoreData();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { numberData = [] } = useNumberData(refreshTrigger);

  // 直接在組件內部實現 isMobile 邏輯
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 假設 768px 為行動裝置分界點
    };

    handleResize(); // 初始化時執行一次

    window.addEventListener('resize', handleResize); // 監聽視窗大小變化

    return () => { // 清理函數
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 空依賴項表示只在組件 mount 和 unmount 時執行

  const handleClickUpdateBtn = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className={`customerPage ${isMobile ? 'mobile-page' : ''}`}>

      {/* 1. 標題區域 (PC 和手機各自的元素，透過 CSS 決定顯示哪個) */}
      <div className="titlePC">{title}</div> {/* PC 版標題 */}
      <div className="title">{title}</div>    {/* 手機版標題 */}

      {/* 2. 影片區域 (PC 和手機各自的元素，透過 CSS 決定顯示哪個) */}
      <div className="video-area-pc"> {/* PC 影片區 */}
        {video ? (
          <YouTubeVideo playlistId={video} />
        ) : (
          <p className="youtube-placeholder">載入影片中...</p>
        )}
      </div>
      <div className="video-area-mobile"> {/* 手機影片區 */}
        {video ? (
          <YouTubeVideo playlistId={video} />
        ) : (
          <p className="youtube-placeholder">載入影片中...</p>
        )}
      </div>

      {/* 3. 注意事項區域 (PC 和手機各自的元素，透過 CSS 決定顯示哪個) */}
      <div className="infoTextPC">{info}</div> {/* PC 版注意事項 */}
      <div className="infoText">{info}</div>    {/* 手機版注意事項 */}

      {/* 4. 數字球區域 (PC 和手機各自的框架，共用 ShowNumber 組件) */}
      <div className="numberBallFramePC"> {/* PC 版數字球框架 */}
        {numberData.map((data, index) => (
          <ShowNumber // 現在只使用 ShowNumber
            key={index}
            name={data.name}
            currentNumber={data.number}
          />
        ))}
      </div>
      <div className="numberBallFrame"> {/* 手機版數字球框架 */}
        {numberData.map((data, index) => (
          <ShowNumber // 現在只使用 ShowNumber
            key={index}
            name={data.name}
            currentNumber={data.number}
          />
        ))}
      </div>

      {/* 5. 跑馬燈區域 (PC 和手機共用此容器，樣式透過 CSS 響應) */}
      <div className="marquee-area">
        {marquee && Array.isArray(marquee) && marquee.length > 0 ? (
          <MyMarquee texts={marquee} />
        ) : (
          <div className="marquee"></div>
        )}
      </div>

      {/* PC 版獨有的更新按鈕，手機版隱藏 (透過 CSS 控制) */}
      <button className="UpdateBtn" onClick={handleClickUpdateBtn}>
        更新
      </button>

    </div>
  );
}

export default CustomerView;