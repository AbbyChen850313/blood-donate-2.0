// Reader.tsx (src/components/backend/backend_reader.tsx)

import { useEffect, useState } from "react";
// 確保從 backend_data 導入 MoreData，BloodNumberData, BloodNumberDataUnit
import { MoreData, BloodNumberData, BloodNumberDataUnit } from "./backend_data";

// 修改 useMoreData Hook
// 增加 refreshTrigger 以便外部觸發刷新，使其行為與 useNumberData 類似
export function useMoreData(refreshTrigger?: number) { // 增加 refreshTrigger 以便外部觸發刷新
  const [data, setData] = useState<MoreData>({
    title: "",
    marquee: [],
    info: "",
    video: "", // <-- 為 video 字段設置初始空值，必須與 MoreData 接口匹配
    id: "singleDocument", // <-- 也為 id 設置初始值，與接口匹配
  });

  // 直接使用 Cloud Function 的完整 URL
  const cloudFunctionMoreDataUrl = 'https://us-central1-blood-donate-efab9.cloudfunctions.net/bloodDonateMoreData';

  useEffect(() => {
    console.log("Fetching MoreData..."); // 添加 log 方便追蹤
    fetch(cloudFunctionMoreDataUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("MoreData received:", responseData); // 添加 log 方便追蹤
        // 你的 Cloud Function 返回的是一個陣列，其中包含一個物件
        // 所以你需要訪問 responseData[0] 來獲取實際的單一文件內容
        if (Array.isArray(responseData) && responseData.length > 0) {
          const singleDocumentData = responseData[0];
          setData({
            id: singleDocumentData.id || "singleDocument", // 獲取 id 字段
            title: singleDocumentData.title || "", // 確保有預設值，如果 Firestore 中沒有此字段
            marquee: Array.isArray(singleDocumentData.marquee) ? singleDocumentData.marquee : [], // 確保 marquee 是陣列
            info: singleDocumentData.info || "",
            video: singleDocumentData.video || "", // <-- **關鍵！正確獲取 video 字段**
          });
        } else {
          console.warn("Cloud Function (MoreData) 返回的數據為空或非預期格式:", responseData);
          setData({
            id: "singleDocument", // 在無數據時也設置 id
            title: "無數據",
            marquee: [],
            info: "目前沒有相關資訊。",
            video: "", // 確保在無數據時也設置 video
          });
        }
      })
      .catch((error) => console.error("Error fetching MoreData from Cloud Function:", error));
  }, [refreshTrigger]); // <-- **關鍵！將 refreshTrigger 添加為依賴，使其能夠響應外部刷新**

  return data;
}

// useNumberData 保持不變，因為之前的版本已經是正確的
export function useNumberData(refreshTrigger: number) {
    const [data, setData] = useState<BloodNumberData>({
        numberData: [],
    });

    const cloudFunctionNumberDataUrl = 'https://us-central1-blood-donate-efab9.cloudfunctions.net/bloodDonateNumberData';

    useEffect(() => {
        fetch(cloudFunctionNumberDataUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((responseData: BloodNumberDataUnit[]) => {
                setData({
                    numberData: Array.isArray(responseData) ? responseData : [],
                });
            })
            .catch((error) => console.error("Error fetching NumberData from Cloud Function:", error));
    }, [refreshTrigger]);

    return data;
}