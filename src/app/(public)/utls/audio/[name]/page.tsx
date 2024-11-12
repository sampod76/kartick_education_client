// app/(public)/utls/audio/[name]/page.js
import Link from 'next/link';
import React from 'react';
import dynamic from 'next/dynamic';
import 'react-h5-audio-player/lib/styles.css';
// Dynamically import AudioPlayer to ensure it works correctly in SSR
const AudioPlayer = dynamic(() => import('react-h5-audio-player'), {
  ssr: false,
});

export default function Audio({ params }: any) {
  const { name } = params;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="rounded-xl p-11 ring-2 ring-cyan-500">
        <Link
          href={'http://audacityteam.org/download'}
          className="text-center text-[16px]"
        >
          (Download Audacity)
        </Link>
        <div className="mx-auto mt-3 flex max-w-[400px] justify-center">
          <AudioPlayer
            autoPlay={false}
            src={
              'https://iblossomlearn.s3.us-east-2.amazonaws.com/audios/audio-5456646456454.mp3'
            }
            crossOrigin="anonymous"
            preload="auto"
          />
        </div>
      </div>
    </div>
  );
}
