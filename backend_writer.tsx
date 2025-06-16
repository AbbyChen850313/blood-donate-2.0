// Writer.tsx
import { MoreData, BloodNumberData } from "./backend_data";

export async function updateMoreData(data: MoreData) {
  // 直接使用 Cloud Function 的完整 URL
  const cloudFunctionUpdateMoreDataUrl = 'https://us-central1-blood-donate-efab9.cloudfunctions.net/updateMoreData';

  try {
    const response = await fetch(cloudFunctionUpdateMoreDataUrl, {
      method: "POST", // 應該是 POST 請求
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // 發送要更新的數據
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const result = await response.json();
    console.log("MoreData updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Error updating MoreData via Cloud Function:", error);
    // 在這裡處理錯誤，例如顯示給用戶
  }
}

export async function updateNumberData(data: BloodNumberData) {
  // 直接使用 Cloud Function 的完整 URL
  const cloudFunctionUpdateNumberDataUrl = 'https://us-central1-blood-donate-efab9.cloudfunctions.net/updateNumberData';

  try {
    const response = await fetch(cloudFunctionUpdateNumberDataUrl, {
      method: "POST", // 應該是 POST 請求
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // 發送要更新的數據
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const result = await response.json();
    console.log("NumberData updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Error updating NumberData via Cloud Function:", error);
    // 在這裡處理錯誤，例如顯示給用戶
  }
}