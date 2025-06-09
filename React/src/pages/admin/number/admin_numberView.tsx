// admin_number.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { updateNumberData } from "../../../components/backend/backend_writer";
import { useNumberData } from "../../../components/backend/backend_reader";
import { BloodNumberDataUnit } from "../../../components/backend/backend_data";
import NumberDataInput from "./admin_numberUnit";
import AddNumberModal from "./admin_AddNumberModal";
function AdminNumber() {
  const [refreshTrigger, setRefreshTrigger] = useState(0); 
  const { numberData: numberData } = useNumberData(refreshTrigger);
  const [numberDataValue, setNumberDataValue] =
    useState<Array<BloodNumberDataUnit>>(numberData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BloodNumberDataUnit | null>(
    null
  );
  const [showEditButtons, setShowEditButtons] = useState(false);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    console.log("isAuthenticated:" + isAuthenticated);
    if (isAuthenticated !== "true") {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    setNumberDataValue(Array.isArray(numberData) ? numberData : []);
  }, [numberData]);

  const handleEditButtonClick = (id: number) => {
    const itemToEdit = numberDataValue.find((item) => item.id === id);
    setEditingItem(itemToEdit ?? null);
    setModalIsOpen(true);
  };

  const handleAddButtonClick = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleEditButtonClickGlobal = () => {
    setShowEditButtons(true);
    setShowDeleteButtons(false);
  };

  const handleDeleteButtonClickGlobal = () => {
    setShowEditButtons(false);
    setShowDeleteButtons(true);
  };

  const handleSaveOrUpdateNumberData = async (item: BloodNumberDataUnit) => {
    let updatedNumberData = [...numberDataValue];

    if (
      item.id &&
      numberDataValue.some((dataItem) => dataItem.id === item.id)
    ) {
      updatedNumberData = updatedNumberData.map((dataItem) =>
        dataItem.id === item.id ? item : dataItem
      );
    } else {
      if (!item.id) {
        const newId = Date.now();
        item.id = newId;
      }
      updatedNumberData.push(item);
    }

    await updateNumberData({ numberData: updatedNumberData });
    setNumberDataValue(updatedNumberData);
    setModalIsOpen(false);
    setEditingItem(null);
  };

  const handleDeleteNumberData = async (id: number) => {
    const updatedNumberData = numberDataValue.filter((item) => item.id !== id);
    await updateNumberData({ numberData: updatedNumberData });
    setNumberDataValue(updatedNumberData);
    handleSaveChanges(updatedNumberData);
  };
  const handleIncrementNumber = (index: number) => {
    const updatedNumberData = [...numberDataValue];
    updatedNumberData[index] = {
      ...updatedNumberData[index],
      number: updatedNumberData[index].number + 1,
    };
    setNumberDataValue(updatedNumberData);
    setShowEditButtons(false);
    setShowDeleteButtons(false);
    handleSaveChanges(updatedNumberData);
  };

  const handleSaveChanges = (updatedNumberData: BloodNumberDataUnit[]) => {
    updateNumberData({
      numberData: updatedNumberData,
    });
  };
  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/");
  };
  return (
    <div>
      <AddNumberModal
        isOpen={modalIsOpen}
        onClose={handleModalClose}
        onEditFinished={handleSaveOrUpdateNumberData}
        initialData={editingItem ?? undefined}
      />
      <div className="adminPage">
        {/* <Link to="/customer" className="BackBtn">
          切換
        </Link>*/}
        <button className="BackBtn" onClick={handleLogout}>
          登出
        </button>
        <div className="title">編輯頁面</div>
        <div className="itemBar">
          <button className="addButton" onClick={handleAddButtonClick}>
            新增
          </button>
          <button className="editButton" onClick={handleEditButtonClickGlobal}>
            編輯
          </button>
          <button
            className="deleteButton"
            onClick={handleDeleteButtonClickGlobal}
          >
            刪除
          </button>
        </div>
        <div className="frame">
          <NumberDataInput
            numberDataValue={numberDataValue}
            onDeleteNumberData={handleDeleteNumberData}
            onIncrementNumber={handleIncrementNumber}
            onEditButtonClick={handleEditButtonClick}
            showEditButtons={showEditButtons}
            showDeleteButtons={showDeleteButtons}
          />
        </div>

        <Link to="/admin-more" className="MoreSettingBtn">
          更多設定
        </Link>
      </div>
    </div>
  );
}
export default AdminNumber;
