import { getBaseUrl } from '@/helpers/config/envConfig';
import VimeoPlayer from '@/utils/vimoPlayer';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const HomeVideoCard = ({ title, desc, videoname, videoURl }: any) => {
  // console.log("🚀 ~ HomeVideoCard ~ videoname:", videoname);
  const [videoUrlSrc, setVideoUrl] = useState<string | null>(null);
  const screens = useBreakpoint();
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoname && !videoURl) {
      const fetchVideo = async () => {
        try {
          const response = await axios.get(
            `${getBaseUrl()}/paly-video/${videoname}`,
            {
              responseType: 'blob', // Ensure the response is a Blob
            },
          );
          const videoBlob = new Blob([response.data], { type: 'video/mp4' });
          const videoObjectUrl = URL.createObjectURL(videoBlob);
          setVideoUrl(videoObjectUrl);
        } catch (error) {
          console.error('Error fetching the video:', error);
        }
      };

      fetchVideo();
    }
  }, [videoname, videoURl]);

  // Use provided video URL if available
  const finalVideoUrl = videoURl || videoUrlSrc;
  // console.log("🚀 ~ HomeVideoCard ~ finalVideoUrl:", finalVideoUrl);

  if (!finalVideoUrl) {
    return <p>Loading video...</p>;
  }

  return (
    <div className="">
      {videoURl ? (
        <div className="mx-3">
          <VimeoPlayer
            width={365}
            height={347}
            autoplay={false}
            // link={result.data as string}
            link={videoURl}
          />
        </div>
      ) : (
        <video controls className="h-[240px] w-full">
          <source src={finalVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* <div className='w-full h-1 bg-black'></div>
            <div className='flex flex-col gap-3 p-2'>
                <h3>
                    {title || "DR. Sabah"}
                </h3>
                <p>
                    {desc || "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
                </p>
            </div> */}
    </div>
  );
};

export default HomeVideoCard;
