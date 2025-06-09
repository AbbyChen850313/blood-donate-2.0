// TitleMarqueeSettings.tsx
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import {updateMoreData} from '../../../components/backend/backend_writer';
import {useMoreData} from '../../../components/backend/backend_reader';
import MarqueeInput from './admin_marqueeUnit';

const AdminMoreSettings = () => {
  const { title, marquee ,info} = useMoreData();
  const [titleValue, setTitleValue] = useState(title);
  const [infoValue, setInfoValue] = useState(info);
  const [marqueeInputs, setMarqueeInputs] = useState(
    marquee.map((text, index) => ({ id: index, text }))
  );
  useEffect(() => {
    setTitleValue(title);
    setInfoValue(info);
    setMarqueeInputs(marquee.map((text, index) => ({ id: index, text })));
  }, [title, marquee]);
  
  const handleUpdateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };
  const handleUpdateInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfoValue(e.target.value);
  };

  const handleUpdateMarqueeInput = (id: number, newText: string) => {
    const updatedMarquees = marqueeInputs.map((input) =>
      input.id === id ? { ...input, text: newText } : input
    );
    setMarqueeInputs(updatedMarquees);
  };

  const handleDeleteMarqueeInput = (id: number) => {
    const updatedMarquees = marqueeInputs.filter((input) => input.id !== id);
    setMarqueeInputs(updatedMarquees);
  };
 
  const handleAddMarqueeInput = () => {
    const newId =
      marqueeInputs.length > 0
        ? marqueeInputs[marqueeInputs.length - 1].id + 1
        : 0;
    setMarqueeInputs([...marqueeInputs, { id: newId, text: "" }]);
  };

  const handleSaveChanges = () => {
    updateMoreData({
      title: titleValue,
      marquee: marqueeInputs.map((input) => input.text),
      info:infoValue,
    });
  };

  return (
    <div className="adminPage">
    <Link to="/admin-number" className="BackBtn">
      Back
    </Link>
    <div className="title">編輯頁面</div>
    <div className="frame">
    <p>標題</p>
      <input type="text" value={titleValue} onChange={handleUpdateTitle} />
      <p>資訊</p>
      <input type="text" value={infoValue} onChange={handleUpdateInfo} />
      <div className="frame">
        <p>跑馬燈</p>
        <div className="marqueeAddButtonContainer">
          <button
            className="marqueeAddButton"
            onClick={handleAddMarqueeInput}
          >
            新增
          </button>
        </div>
        {marqueeInputs.map((input, index) => (
          <MarqueeInput
            key={index}
            id={input.id}
            text={input.text}
            onUpdate={handleUpdateMarqueeInput}
            onDelete={handleDeleteMarqueeInput}
          />
        ))}
      </div>
      <button className="saveButtonContainer" onClick={handleSaveChanges}>
        保存
      </button>
    </div>
  </div>
  );
};

export default AdminMoreSettings;
