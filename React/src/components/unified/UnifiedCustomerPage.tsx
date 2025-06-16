// src/components/unified/UnifiedCustomerPage.tsx
// 完整的統一客戶頁面組件 - LOGO更新按鈕 + 良全預拌主題配色

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
 * - 良全預拌主題配色
 * - LOGO 更新按鈕整合
 * - 老人友善大字體設計
 * - 智能數字球佈局
 * 
 * @returns 響應式客戶頁面組件
 */
function UnifiedCustomerPage(): JSX.Element {
  const { deviceType, isMobile } = useResponsive();
  const { title, marquee, info, video } = useMoreData();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { numberData = [] } = useNumberData(refreshTrigger);

  /**
   * 處理 LOGO 更新按鈕點擊
   * 觸發數據重新獲取並提供豐富的視覺反饋
   */
  const handleLogoUpdate = (): void => {
    setRefreshTrigger(prev => prev + 1);
    
    // LOGO 更新按鈕的視覺反饋動畫
    const logoBtn = document.querySelector('.logo-update-btn');
    if (logoBtn instanceof HTMLElement) {
      // 第一階段：縮小 + 輕微旋轉
      logoBtn.style.transform = 'scale(0.9) rotate(10deg)';
      logoBtn.style.filter = 'brightness(1.3) drop-shadow(0 8px 25px rgba(198, 40, 40, 0.5))';
      
      setTimeout(() => {
        // 第二階段：放大 + 反向旋轉
        logoBtn.style.transform = 'scale(1.1) rotate(-5deg)';
        
        setTimeout(() => {
          // 第三階段：回復正常
          logoBtn.style.transform = 'scale(1) rotate(0deg)';
          logoBtn.style.filter = '';
        }, 200);
      }, 150);
    }
    
    // 可選：控制台提示
    console.log('🔄 血液庫存數據更新中...');
  };

  return (
    <div className={`customerPage ${deviceType}-layout`}>
      {/* 標題區域 */}
      <header className="customer-header">
        <h1 className="customer-title">{title}</h1>
        
        {/* LOGO 更新按鈕（僅桌面版顯示） */}
        {!isMobile && (
          <div 
            className="logo-update-btn"
            onClick={handleLogoUpdate}
            title="點擊更新血液庫存數據"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleLogoUpdate();
              }
            }}
          >
            <img 
              src="/logo/liangquan-logo.png"
              alt="良全預拌LOGO - 點擊更新"
              className="logo-image"
              draggable={false}
            />
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