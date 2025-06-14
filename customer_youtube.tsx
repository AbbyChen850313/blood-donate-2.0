// src/pages/customer/customer_youtube.tsx - 修正響應式影片

import React from "react";

interface YouTubeVideoProps {
  playlistId: string;
}

function YouTubeVideo({ playlistId }: YouTubeVideoProps) {
  if (!playlistId) {
    return <div className="youtube-placeholder">載入影片中...</div>;
  }

  // 清理 playlistId，移除不必要的參數
  const cleanedPlaylistId = playlistId.split('&')[0];

  // 使用標準的 YouTube 嵌入播放列表 URL
  const embedSrc = `https://www.youtube.com/embed/videoseries?list=${cleanedPlaylistId}&autoplay=1&loop=1&controls=1&modestbranding=1&rel=0&enablejsapi=1`;

  return (
    <div className="youtube-video-container">
      <iframe
        className="youtube-iframe"
        src={embedSrc}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="YouTube Video Player"
      ></iframe>
    </div>
  );
}

export default YouTubeVideo;