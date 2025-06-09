// Writer.tsx
import { MoreData, BloodNumberData } from "./backend_data";
export async function updateMoreData(data: MoreData) {
  const apiUrl = process.env.REACT_APP_API_URL_MORE as string;
  //const apiUrl = process.env.REACT_APP_API_URL_T as string;
  try {
    const response = await fetch(`${apiUrl}/more-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating data:", error);
  }
}

export async function updateNumberData(data: BloodNumberData) {
  const apiUrl = process.env.REACT_APP_API_URL_NUMBER as string;
  // const apiUrl = process.env.REACT_APP_API_URL_T as string;
  try {
    const response = await fetch(`${apiUrl}/number-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating data:", error);
  }
}
