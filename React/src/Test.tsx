import React, { useState } from "react";

const Test = () => {
  const [inputValue, setInputValue] = useState("");
  const [readIndex, setReadIndex] = useState("");
  const [readResult, setReadResult] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleReadIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReadIndex(e.target.value);
  };

  const handleSubmit = async () => {
    const apiUrl = process.env.REACT_APP_API_URL as string;
    const response = await fetch(`${apiUrl}/api/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: inputValue }),
    });

    if (response.ok) {
      console.log("Content added to Google Sheets");
    } else {
      console.error("Failed to add content");
    }
  };

  const handleRead = async () => {
    // 假設你有一個後端端點來處理讀取操作
    const response = await fetch(`/api/read?index=${readIndex}`);
    const data = await response.json();

    if (response.ok) {
      setReadResult(data.content);
    } else {
      console.error("Failed to read content");
    }
  };

  return (
    <div>
      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleSubmit}>送出</button>
      </div>
      <div>
        <input type="text" value={readIndex} onChange={handleReadIndexChange} />
        <button onClick={handleRead}>讀取</button>
        {readResult && <p>讀取結果：{readResult}</p>}
      </div>
    </div>
  );
};

export default Test;
