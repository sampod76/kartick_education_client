import React, { useRef, useEffect } from "react";
import Player from "@vimeo/player";

function VimeoPlayer({ link }: { link: string }) {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize the Vimeo player once the component mounts
    if (!link || !playerRef.current) {
      return;
    }

    const player = new Player(playerRef.current, {
      url: link,
      // Replace VIDEO_ID with the actual ID of the Vimeo video you want to embed
    });

    // Cleanup the player instance when the component unmounts
    return () => {
      player.unload();
    };
  }, [link]);

  return (
    <div className="z-50">
      <div ref={playerRef}></div>
    </div>
  );
}

export default VimeoPlayer;
