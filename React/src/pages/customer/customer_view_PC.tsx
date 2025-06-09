// customer_view.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useMoreData,
  useNumberData,
} from "../../components/backend/backend_reader";
import MyMarquee from "./customer_marquee";
import{ ShowNumberPC} from "./customer_numberUnit";
import YouTubeVideo from "./customer_youtube";

function CustomerComponentPC() {
  const { title, marquee, info } = useMoreData();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { numberData = [] } = useNumberData(refreshTrigger);
  const handleClickUpdateBtn = () => {
    setRefreshTrigger((prev) => prev + 1);
  }
  return (
    <div className="customerPage">
      <div style={{ display: "flex" }}>
        <div className="titlePC">{title}</div>

      </div>
      <div style={{ display: "flex", width: "100%", height: "calc(100vh - 100px)" }}>
        <div style={{ width: "70%", height: "100%" }}>
          < YouTubeVideo />
        </div>
        <div className="rightFrame">
          <div className="customerContainer">
            <div className="numberBallFramePC">
              <button className="UpdateBtn" onClick={handleClickUpdateBtn}>
                更新
              </button>
              {numberData.map((data, index) => (
                <ShowNumberPC
                  key={index}
                  name={data.name}
                  currentNumber={data.number}
                />
              ))}
            </div>
            <div className="infoTextPC">{info}</div>
          </div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <MyMarquee texts={marquee} />
      </div>
    </div>
  );
}

export default CustomerComponentPC;
