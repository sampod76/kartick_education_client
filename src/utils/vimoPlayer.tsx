import React, { useRef, useEffect } from "react";
import Player from "@vimeo/player";

function VimeoPlayer({
  link,
  width = 640,
  height = 640,
  autoplay = true
}: {
  link: string;
  width?: number;
  height?: number;
  autoplay?: boolean;
}) {
  const playerRef = useRef<HTMLDivElement>(null);
  // console.log(autoplay)
  useEffect(() => {
    // Initialize the Vimeo player once the component mounts
    if (!link || !playerRef.current) {
      return;
    }

    const player = new Player(playerRef.current, {
      url: link,
      height: height,
      width: width,
      autopause: true,
      autoplay,
      // responsive: true,

      // Replace VIDEO_ID with the actual ID of the Vimeo video you want to embed
    });

    // Cleanup the player instance when the component unmounts
    return () => {
      player.unload();
    };
  }, [link, width, height, autoplay]);

  return (
    <div className="-mt-[50px] -mb-[30px]">
      <div ref={playerRef}></div>
    </div>
  );
}

export default VimeoPlayer;
