'use client';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { searchPlugin } from '@react-pdf-viewer/search';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import React, { useEffect } from 'react';

interface PDFViewerProps {
  file: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  // Initialize plugins
  const defaultLayout = defaultLayoutPlugin();
  const search = searchPlugin();
  const zoom = zoomPlugin();
  const fullScreen = fullScreenPlugin();
  const pageNavigation = pageNavigationPlugin();

  // UseEffect to set the initial zoom level to 100% after the component mounts
  useEffect(() => {
    const zoomTo100 = zoom.zoomTo;
    zoomTo100(1); // 1 is 100% scale
  }, [zoom]);
  // const handleLoad = () => {
  //   console.log('flsd');
  // };
  return (
    <div
      className="h-[400px] w-full rounded-md sm:h-[600px] sm:w-[600px] md:h-[700px] md:w-[700px] lg:h-[800px] lg:w-[800px]"
      style={{ height: '90vh' }}
    >
      <p className="text-center">
        (Note: When showing{' '}
        <span className="text-red-500">Failed to fetch</span> then change
        browser)
      </p>
      <Viewer
        fileUrl={`/api/fetch-pdf?url=${encodeURIComponent(file)}`}
        plugins={[defaultLayout, search, zoom, fullScreen, pageNavigation]}
      />
    </div>
  );
};

export default PDFViewer;
