// AddNumberModal.js
import React, { useState, useEffect } from "react";
import { BloodNumberDataUnit } from "../../../components/backend/backend_data";

interface AddNumberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditFinished: (updatedItem: BloodNumberDataUnit) => void;
  initialData?: BloodNumberDataUnit | null;
}

function AddNumberModal({ isOpen, onClose, onEditFinished, initialData }: AddNumberModalProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [number, setNumber] = useState(initialData?.number.toString() || "");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setNumber(initialData.number.toString());
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isNewItem = !initialData || initialData.id === undefined;
  
    const updatedItem: BloodNumberDataUnit = {
      ...initialData,
      name,
      number: parseInt(number, 10),
      id: isNewItem ? Date.now() : initialData?.id,
    };
  
    onEditFinished(updatedItem);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="closeBtn" onClick={onClose}>X</span>
        <h2>{initialData ? "編輯" : "新增"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            名稱:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            號碼:
            <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} />
          </label>
          <button type="submit">{initialData ? "確認" : "新增"}</button>
        </form>
      </div>
    </div>
  );
}

export default AddNumberModal;
