// src/components/unified/YouTubeVideo.tsx
// 統一的 YouTube 影片組件 - 響應式嵌入

import React from 'react';

/**
 * YouTube 影片組件屬性接口
 */
export interface YouTubeVideoProps {
  /** YouTube 播放清單 ID */
  playlistId?: string;
  /** 可選的自定義類名 */
  className?: string;
  /** 是否自動播放，預設 true */
  autoplay?: boolean;
  /** 是否循環播放，預設 true */
  loop?: boolean;
  /** 是否顯示控制項，預設 true */
  controls?: boolean;
  /** 是否靜音，預設 true */
  muted?: boolean;
}

/**
 * 統一的 YouTube 影片組件
 * 
 * 特性：
 * - 完全響應式設計，自動適應容器大小
 * - 支援播放清單嵌入
 * - 可配置的播放選項
 * - 優雅的載入狀態處理
 * - 良好的可訪問性支援
 * 
 * @param props 組件屬性
 * @returns YouTube 影片組件
 * 
 * @example
 * ```tsx
 * <YouTubeVideo 
 *   playlistId="PLPSmbV4GJWx92kOMv4XRRekMEaZNWKC3t"
 *   autoplay={true}
 *   muted={true}
 * />
 * ```
 */
function YouTubeVideo({ 
  playlistId,
  className = '',
  autoplay = true,
  loop = true,
  controls = true,
  muted = true
}: YouTubeVideoProps): JSX.Element {

  /**
   * 建構 YouTube 嵌入 URL
   */
  const buildEmbedUrl = (id: string): string => {
    // 清理播放清單 ID，移除可能的額外參數
    const cleanedPlaylistId = id.split('&')[0];
    
    // 建構參數
    const params = new URLSearchParams({
      list: cleanedPlaylistId,
      autoplay: autoplay ? '1' : '0',
      loop: loop ? '1' : '0',
      controls: controls ? '1' : '0',
      modestbranding: '1', // 減少 YouTube 品牌元素
      rel: '0', // 不顯示相關影片
      enablejsapi: '1', // 啟用 JavaScript API
      mute: muted ? '1' : '0'
    });

    return `https://www.youtube.com/embed/videoseries?${params.toString()}`;
  };

  // 沒有播放清單 ID 時顯示佔位符
  if (!playlistId) {
    return (
      <div 
        className={`youtube-video-container ${className}`.trim()}
        role="img"
        aria-label="YouTube 影片載入中"
      >
        <div className="video-placeholder">
          <div className="placeholder-content">
            📺 YouTube 影片播放區域
            <br />
            <small>響應式設計，完美適應所有螢幕</small>
          </div>
        </div>
      </div>
    );
  }

  const embedSrc = buildEmbedUrl(playlistId);

  return (
    <div 
      className={`youtube-video-container ${className}`.trim()}
      role="region"
      aria-label="YouTube 影片播放器"
    >
      <iframe
        className="youtube-iframe"
        src={embedSrc}
        frameBorder="0"
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
        title="YouTube 影片播放器"
        loading="lazy" // 延遲載入優化
      />
    </div>
  );
}

export default YouTubeVideo;