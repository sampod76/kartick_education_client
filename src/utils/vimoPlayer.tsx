'use client';
import Script from 'next/script';
import { cn } from './cn';
import vimeoUrlChack from './vimeoUrlChecker';

function VimeoPlayer({
  link,
  autoplay = true,
  width,
  height,
  className,
}: {
  link: string | number;
  autoplay?: boolean;
  width?: any;
  height?: any;
  className?: string;
}) {
  // const playerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (!link || !playerRef.current) {
  //     return;
  //   }

  //   const player = new Player(playerRef.current, {
  //     url: link,
  //     width: width,
  //     height: height,
  //     autopause: true,
  //     autoplay,
  //   });

  //   return () => {
  //     player.unload();
  //   };
  // }, [link, autoplay]);
  let vimeoNumber;
  if (typeof link === 'string') {
    vimeoNumber = vimeoUrlChack(link);
  } else if (typeof link === 'number') {
    vimeoNumber = link;
  }
  return (
    // <div className="w-full h-full flex items-center justify-center">
    //   <div ref={playerRef} className="mx-auto bg-black text-white">

    //   </div>
    // </div>
    <div>
      <div
        className="w-full rounded-3xl p-5 shadow-2xl shadow-purple-400"
        // style={{ padding: '56.25% 0 0 0', position: 'relative', border: '2px' }}
      >
        <iframe
          src={`https://player.vimeo.com/video/${vimeoNumber || 1022083255}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          style={{
            top: 0,
            left: 0,
            width: width,
            height: height,
          }}
          title="jwt"
          className={cn('', className)}
        ></iframe>
      </div>

      {/* Vimeo API script */}
      <Script
        src="https://player.vimeo.com/api/player.js"
        strategy="lazyOnload"
      />
    </div>
  );
}

export default VimeoPlayer;

// components/VimeoPlayer.js

// const VimeoPlayer = ({
//   videoId,
//   className,
// }: {
//   videoId: string;
//   className?: string;
// }) => {
//   return (
//     <div>
//       {/* Vimeo Embed */}

//       <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
//         <iframe
//           src={`https://player.vimeo.com/video/${videoId || 1022083255}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
//           frameBorder="0"
//           allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             // width: '500px',
//             // height: '500px',
//           }}
//           title="jwt"
//           className={cn('max-w-md', className)}
//         ></iframe>
//       </div>

//       {/* Vimeo API script */}
//       <Script
//         src="https://player.vimeo.com/api/player.js"
//         strategy="lazyOnload"
//       />
//     </div>
//   );
// };

// export default VimeoPlayer;
