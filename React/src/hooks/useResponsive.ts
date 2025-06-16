// src/hooks/useResponsive.ts
// 響應式設計 Hook - 統一裝置檢測邏輯

import { useState, useEffect } from 'react';

/**
 * 設備類型定義
 */
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

/**
 * 響應式 Hook 返回值接口
 */
export interface ResponsiveState {
  /** 當前設備類型 */
  deviceType: DeviceType;
  /** 是否為手機設備 */
  isMobile: boolean;
  /** 是否為平板設備 */
  isTablet: boolean;
  /** 是否為桌面設備 */
  isDesktop: boolean;
  /** 當前視窗寬度 */
  windowWidth: number;
  /** 當前視窗高度 */
  windowHeight: number;
}

/**
 * 斷點常數定義
 */
const BREAKPOINTS = {
  MOBILE_MAX: 768,
  TABLET_MAX: 1024,
} as const;

/**
 * 響應式設計 Hook
 * 
 * 提供統一的裝置檢測和響應式狀態管理
 * 
 * 特性：
 * - 自動檢測設備類型（手機/平板/桌面）
 * - 監聽視窗大小變化
 * - 提供多種便利的布爾值狀態
 * - 性能優化的事件監聽
 * 
 * @returns 響應式狀態對象
 * 
 * @example
 * ```tsx
 * const { deviceType, isMobile, windowWidth } = useResponsive();
 * 
 * if (isMobile) {
 *   return <MobileLayout />;
 * }
 * ```
 */
export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>(() => {
    // 初始化狀態，避免 SSR 問題
    if (typeof window === 'undefined') {
      return {
        deviceType: 'desktop',
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        windowWidth: 1200,
        windowHeight: 800,
      };
    }

    return calculateResponsiveState(window.innerWidth, window.innerHeight);
  });

  useEffect(() => {
    // 確保在客戶端環境
    if (typeof window === 'undefined') return;

    /**
     * 處理視窗大小變化
     */
    const handleResize = (): void => {
      const newState = calculateResponsiveState(window.innerWidth, window.innerHeight);
      setState(newState);
    };

    // 初始化設置
    handleResize();

    // 添加事件監聽器
    window.addEventListener('resize', handleResize);

    // 清理函數
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return state;
}

/**
 * 計算響應式狀態
 * 
 * @param width 視窗寬度
 * @param height 視窗高度
 * @returns 響應式狀態對象
 */
function calculateResponsiveState(width: number, height: number): ResponsiveState {
  const isMobile = width <= BREAKPOINTS.MOBILE_MAX;
  const isTablet = width > BREAKPOINTS.MOBILE_MAX && width <= BREAKPOINTS.TABLET_MAX;
  const isDesktop = width > BREAKPOINTS.TABLET_MAX;

  let deviceType: DeviceType;
  if (isMobile) {
    deviceType = 'mobile';
  } else if (isTablet) {
    deviceType = 'tablet';
  } else {
    deviceType = 'desktop';
  }

  return {
    deviceType,
    isMobile,
    isTablet,
    isDesktop,
    windowWidth: width,
    windowHeight: height,
  };
}

/**
 * 預定義的媒體查詢 Hook
 * 
 * @param query CSS 媒體查詢字符串
 * @returns 是否匹配該媒體查詢
 * 
 * @example
 * ```tsx
 * const isLargeScreen = useMediaQuery('(min-width: 1200px)');
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    
    const handleChange = (event: MediaQueryListEvent): void => {
      setMatches(event.matches);
    };

    // 設置初始值
    setMatches(mediaQuery.matches);

    // 添加監聽器
    mediaQuery.addEventListener('change', handleChange);

    // 清理函數
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}