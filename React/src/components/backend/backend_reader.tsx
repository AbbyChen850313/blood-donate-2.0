// Reader.tsx
import { useEffect, useState } from "react";
import { MoreData, BloodNumberData } from "./backend_data";
export function useMoreData() {
  const [data, setData] = useState<MoreData>({
    title: "",
    marquee: [],
    info: "",
  });
  const apiUrl = process.env.REACT_APP_API_URL_MORE as string;
 //const apiUrl = process.env.REACT_APP_API_URL_T as string;
  
  useEffect(() => {
    fetch(`${apiUrl}/more-data`)
      .then((response) => response.json())
      .then((data) => {
        setData({
          title: data.title,
          marquee: data.marquee,
          info:data.info
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); 

  return data;
}
export function useNumberData(refreshTrigger: number) {
  const [data, setData] = useState<BloodNumberData>({
    numberData: [],
  });

  const apiUrl = process.env.REACT_APP_API_URL_NUMBER as string;

  useEffect(() => {
    fetch(`${apiUrl}/number-data`)
      .then((response) => response.json())
      .then((data) => {
        setData({
          numberData: data.numberData,
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [refreshTrigger]); // 添加 refreshTrigger 作為依賴

  return data;
}


