// admin_numberView.tsx
import React, { useState, useEffect, useRef, useCallback } from "react"; // 導入 useRef 和 useCallback
import { useNavigate, Link } from "react-router-dom";
import { updateNumberData } from "../../../components/backend/backend_writer";
import { useNumberData } from "../../../components/backend/backend_reader";
import { BloodNumberDataUnit } from "../../../components/backend/backend_data";
import NumberDataInput from "./admin_numberUnit";
import AddNumberModal from "./admin_AddNumberModal";

function AdminNumber() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { numberData } = useNumberData(refreshTrigger);

  const [numberDataValue, setNumberDataValue] =
    useState<Array<BloodNumberDataUnit>>([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BloodNumberDataUnit | null>(
    null
  );
  const [showEditButtons, setShowEditButtons] = useState(false);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);
  const navigate = useNavigate();

  // **新增：用於 debounce 的 ref**
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 身份驗證
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    console.log("isAuthenticated:" + isAuthenticated);
    if (isAuthenticated !== "true") {
      navigate("/");
    }
  }, [navigate]);

  // 當 useNumberData 獲取到新數據時，更新 numberDataValue 狀態
  useEffect(() => {
    setNumberDataValue(Array.isArray(numberData) ? numberData : []);
  }, [numberData]);

  // **新增：Debounced 更新 Firestore 的函數**
  const debouncedUpdateFirestore = useCallback(async (dataToUpdate: BloodNumberDataUnit[]) => {
      console.log("觸發 Debounced 更新 Firestore:", dataToUpdate);
      try {
          await updateNumberData({ numberData: dataToUpdate });
          // 如果此時有其他外部更新，可能需要考慮是否刷新 UI
          // 但對於 '+' 按鈕，我們假設用戶即時看到的是正確的
          // 所以這裡不調用 setRefreshTrigger
      } catch (error) {
          console.error("Debounced Firestore 更新失敗:", error);
          alert("後台更新失敗，請檢查網路或重試！"); // 提示用戶
          // 這裡可以考慮觸發 setRefreshTrigger 來重新同步數據
          // setRefreshTrigger(prev => prev + 1);
      }
  }, []); // 空依賴陣列表示這個函數只創建一次

  const handleEditButtonClick = (id: number) => {
    const itemToEdit = numberDataValue.find((item) => item.id === id);
    setEditingItem(itemToEdit ?? null);
    setModalIsOpen(true);
  };

  const handleAddButtonClick = () => {
    setModalIsOpen(true);
    setEditingItem(null); // 新增時確保 editingItem 為 null
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    setEditingItem(null); // 關閉模態框時重置 editingItem
    // 模態框關閉時，觸發一次完整刷新，確保從 Firestore 獲取最新狀態
    setRefreshTrigger(prev => prev + 1);
  };

  const handleEditButtonClickGlobal = () => {
    setShowEditButtons(true);
    setShowDeleteButtons(false);
  };

  const handleDeleteButtonClickGlobal = () => {
    setShowEditButtons(false);
    setShowDeleteButtons(true);
  };

  // 處理保存或更新數據 (維持刷新機制，因為這不是連續操作)
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

    try {
      await updateNumberData({ numberData: updatedNumberData });
      setModalIsOpen(false);
      setEditingItem(null);
      setRefreshTrigger(prev => prev + 1); // <-- 這裡仍然觸發刷新
    } catch (error) {
      console.error("Error saving/updating number data:", error);
      alert("保存或更新失敗，請檢查網路或重試！");
    }
  };

  // 處理刪除數據 (維持刷新機制，因為這不是連續操作)
  const handleDeleteNumberData = async (id: number) => {
    const updatedNumberData = numberDataValue.filter((item) => item.id !== id);
    try {
      await updateNumberData({ numberData: updatedNumberData });
      setRefreshTrigger(prev => prev + 1); // <-- 這裡仍然觸發刷新
    } catch (error) {
      console.error("Error deleting number data:", error);
      alert("刪除失敗，請檢查網路或重試！");
    }
  };

  // 處理遞增數字 (使用 Debounce)
  const handleIncrementNumber = (index: number) => {
    // 1. 立即在前端更新數據 (樂觀更新)
    const updatedNumberDataForUI = [...numberDataValue];
    if (updatedNumberDataForUI[index]) {
        updatedNumberDataForUI[index] = {
            ...updatedNumberDataForUI[index],
            number: (updatedNumberDataForUI[index].number || 0) + 1,
        };
    }
    setNumberDataValue(updatedNumberDataForUI); // <-- 立即更新前端顯示

    setShowEditButtons(false);
    setShowDeleteButtons(false);

    // 2. 清除之前的定時器，重新設定定時器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      // 2秒後，如果沒有再次點擊，就發送更新請求
      debouncedUpdateFirestore(updatedNumberDataForUI);
    }, 500); // 500 毫秒 = 0.5 秒
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