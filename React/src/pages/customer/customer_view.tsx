// customer_view.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useMoreData,
  useNumberData,
} from "../../components/backend/backend_reader";
import MyMarquee from "./customer_marquee";
import {ShowNumber} from "./customer_numberUnit";
import YouTubeVideo from "./customer_youtube";

function CustomerComponent() {
  const { title, marquee ,info} = useMoreData(); 
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { numberData = [] } = useNumberData(refreshTrigger);
  return (
    <div className="customerPage">
      <div className="title">{title}</div>
      <YouTubeVideo />
      <div className="infoText">{info}</div>
      <div className="customerContainer">
        <div className="numberBallFrame">
          {numberData.map((data, index) => (
            <ShowNumber
              key={index}
              name={data.name}
              currentNumber={data.number}
            />
          ))}
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <MyMarquee texts={marquee} />
      </div>
    </div>
  );
}

export default CustomerComponent;
