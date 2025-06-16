// src/pages/customer/customer_view_PC.tsx



import React, { useState } from "react";

import { Link } from "react-router-dom";

import {

  useMoreData,

  useNumberData,

} from "../../components/backend/backend_reader";

import MyMarquee from "./customer_marquee";

import { ShowNumberPC } from "./customer_numberUnit"; // 確保導入 ShowNumberPC

import YouTubeVideo from "./customer_youtube";

import '../../Css/customerCss.css'; // 客戶頁面主要 CSS



function CustomerComponentPC() {

  const { title, marquee, info, video } = useMoreData();

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { numberData = [] } = useNumberData(refreshTrigger);



  const handleClickUpdateBtn = () => {

    setRefreshTrigger((prev) => prev + 1);

  };



  return (

    <div className="customerPage">

      <div className="header-flex-container">

        <div className="titlePC">{title}</div>

      </div>

      <div className="main-content-flex-container">

        <div className="video-area-pc">

          {video ? (

            <YouTubeVideo playlistId={video} />

          ) : (

            <p className="youtube-placeholder">載入影片中...</p>

          )}

        </div>

        <div className="rightFrame">

          <button className="UpdateBtn" onClick={handleClickUpdateBtn}>

            更新

          </button>

          <div className="numberBallFramePC">

            {numberData.map((data, index) => (

              <ShowNumberPC // 使用 ShowNumberPC

                key={index}

                name={data.name}

                currentNumber={data.number}

              />

            ))}

          </div>

          <div className="infoTextPC">{info}</div>

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



export default CustomerComponentPC;