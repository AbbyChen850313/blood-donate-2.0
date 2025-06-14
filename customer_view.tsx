// src/pages/customer/customer_view.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useMoreData,
  useNumberData,
} from "../../components/backend/backend_reader";
import MyMarquee from "./customer_marquee";
import { ShowNumber } from "./customer_numberUnit"; // 確保導入 ShowNumber
import YouTubeVideo from "./customer_youtube";
import '../../Css/customerCss.css'; // 客戶頁面主要 CSS

function CustomerComponent() {
  const { title, marquee, info, video } = useMoreData();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { numberData = [] } = useNumberData(refreshTrigger);

  return (
    <div className="customerPage mobile-page"> {/* 新增 mobile-page class */}
      <div className="title">{title}</div> {/* 手機版標題用 .title */}
      <div className="video-area-mobile">
        {video ? (
          <YouTubeVideo playlistId={video} />
        ) : (
          <p className="youtube-placeholder">載入影片中...</p>
        )}
      </div>
      <div className="infoText">{info}</div> {/* 手機版用 .infoText */}
      <div className="customerContainer">
        <div className="numberBallFrame"> {/* 手機版用 .numberBallFrame */}
          {numberData.map((data, index) => (
            <ShowNumber // 使用 ShowNumber
              key={index}
              name={data.name}
              currentNumber={data.number}
            />
          ))}
        </div>
      </div>
      <div className="marquee-area">
        {marquee && Array.isArray(marquee) && marquee.length > 0 ? (
          <MyMarquee texts={marquee} />
        ) : (
          <div className="marquee"></div>
        )}
      </div>
    </div>
  );
}

export default CustomerComponent;