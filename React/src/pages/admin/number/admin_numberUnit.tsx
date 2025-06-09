// admin_number_unit.tsx
import React from "react";
import { BloodNumberDataUnit } from "../../../components/backend/backend_data";

interface NumberDataInputProps {
  numberDataValue: Array<BloodNumberDataUnit>;
  onDeleteNumberData: (index: number) => void;
  onIncrementNumber: (index: number) => void;
  onEditButtonClick: (index: number) => void;
  showEditButtons: boolean;
  showDeleteButtons: boolean; 
}

const NumberDataInput: React.FC<NumberDataInputProps> = ({
  numberDataValue,
  onDeleteNumberData,
  onIncrementNumber,
  onEditButtonClick,
  showEditButtons,
  showDeleteButtons,
}) => {
  return (
    <div className="numberBallFrame">
      {numberDataValue.map((item, index) => (
        <div key={index} style={{ margin: "20px" }}>
          <div className="numberBall">
            <h1>{item.name}</h1>
            <p>{item.number.toString()}</p>
            <button
              className="addBtn"
              onClick={() => {
                onIncrementNumber(index);
              }}
            >
              +
            </button>

            {showDeleteButtons && (
              <button
                className="deleteBtn"
                onClick={() => onDeleteNumberData(item.id)}
              >
                X
              </button>
            )}
            {showEditButtons && (
              <button
                className="editBtn"
                onClick={() => onEditButtonClick(item.id)}
              >
                編輯
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NumberDataInput;
