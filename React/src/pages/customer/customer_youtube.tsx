import React, { useRef, useState } from "react";
import YouTube from "react-youtube";

const playlistId = "PLPSmbV4GJWx92kOMv4XRRekMEaZNWKC3t";

function YouTubeVideo() {
  const playerRef = useRef<any>(null);
  const [muted, setMuted] = useState(true);

  const onReady = (event: any) => {
    playerRef.current = event.target;
    event.target.mute();
    event.target.playVideo();
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (muted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setMuted(!muted);
    }
  };

  const opts = {
    width: "100%",
    playerVars: {
      listType: "playlist",
      list: playlistId,
      autoplay: 1,
      loop: 1,
      mute: 1,
    },
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <YouTube
          videoId=""
          opts={opts}
          onReady={onReady}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <button
        onClick={toggleMute}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: "8px 14px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        {muted ? "🔊 點我開聲音" : "🔇 點我關閉聲音"}
      </button>
    </div>
  );
}

export default YouTubeVideo;
