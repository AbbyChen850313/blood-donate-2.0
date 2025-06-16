// src/components/unified/index.ts
// 統一組件的導出入口

/**
 * 統一客戶頁面組件模組
 * 
 * 這個模組包含了重構後的所有客戶頁面相關組件：
 * - UnifiedCustomerPage: 主要的響應式客戶頁面
 * - NumberBall: 統一的數字球組件
 * - Marquee: 智能跑馬燈組件
 * - YouTubeVideo: 響應式影片組件
 */

// 主要組件
export { default as UnifiedCustomerPage } from './UnifiedCustomerPage';

// 子組件
export { default as NumberBall } from './NumberBall';
export { default as Marquee } from './Marquee';
export { default as YouTubeVideo } from './YouTubeVideo';

// 類型導出
export type { NumberBallProps } from './NumberBall';
export type { MarqueeProps } from './Marquee';
export type { YouTubeVideoProps } from './YouTubeVideo';

// Hook 導出
export { useResponsive, useMediaQuery } from '../../hooks/useResponsive';
export type { DeviceType, ResponsiveState } from '../../hooks/useResponsive';