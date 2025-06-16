// src/components/unified/UnifiedCustomerPage.tsx
// 統一的響應式客戶頁面組件 - Clean Code 重構版本

import React, { useState } from 'react';
import { useMoreData, useNumberData } from '../backend/backend_reader';
import { useResponsive } from '../../hooks/useResponsive';
import NumberBall from './NumberBall';
import Marquee from './Marquee';
import YouTubeVideo from './YouTubeVideo';
import './UnifiedCustomerPage.css';

/**
 * 統一的客戶頁面組件
 * 
 * 特性：
 * - 完全響應式設計，自動適應桌面、平板、手機
 * - 老人友善大字體設計
 * - 智能數字球佈局
 * - 統一的維護點
 * 
 * @returns 響應式客戶頁面組件
 */
function UnifiedCustomerPage(): JSX.Element {
  const { deviceType, isMobile } = useResponsive();
  const { title, marquee, info, video } = useMoreData();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { numberData = [] } = useNumberData(refreshTrigger);

  /**
   * 處理更新按鈕點擊
   * 觸發數據重新獲取並提供視覺反饋
   */
  const handleUpdate = (): void => {
    setRefreshTrigger(prev => prev + 1);
    
    // 視覺反饋效果
    const updateBtns = document.querySelectorAll('.update-btn');
    updateBtns.forEach(btn => {
      if (btn instanceof HTMLElement) {
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          btn.style.transform = '';
        }, 150);
      }
    });
  };

  return (
    <div className={`customerPage ${deviceType}-layout`}>
      {/* 標題區域 */}
      <header className="customer-header">
        <h1 className="customer-title">{title}</h1>
        
        {/* 桌面版更新按鈕 */}
        {!isMobile && (
          <div className="desktop-buttons">
            <button 
              className="update-btn" 
              onClick={handleUpdate}
              aria-label="更新數據"
            >
              更新
            </button>
          </div>
        )}
      </header>

      {/* 主要內容區域 */}
      <main className="customer-main">
        {/* 影片區域 */}
        <section className="video-section" role="complementary">
          <YouTubeVideo playlistId={video} />
        </section>

        {/* 資訊區域（包含數字球和注意事項） */}
        <aside className="info-section" role="complementary">
          {/* 數字球容器 */}
          <div 
            className="number-ball-container" 
            data-count={numberData.length}
            role="region"
            aria-label="血液庫存數據"
          >
            {numberData.map((data) => (
              <NumberBall
                key={data.id}
                name={data.name}
                currentNumber={data.number}
              />
            ))}
          </div>
          
          {/* 桌面版注意事項 */}
          <div 
            className="info-text-container"
            role="region"
            aria-label="重要提醒事項"
          >
            {info}
          </div>
        </aside>
      </main>

      {/* 手機版獨立注意事項區域 */}
      {isMobile && (
        <div 
          className="mobile-info-text-container"
          role="region"
          aria-label="重要提醒事項"
        >
          {info}
        </div>
      )}

      {/* 跑馬燈區域 */}
      <footer className="marquee-section" role="banner">
        {marquee && Array.isArray(marquee) && marquee.length > 0 ? (
          <Marquee texts={marquee} />
        ) : (
          <div className="marquee" aria-label="暫無跑馬燈訊息"></div>
        )}
      </footer>
    </div>
  );
}

export default UnifiedCustomerPage;