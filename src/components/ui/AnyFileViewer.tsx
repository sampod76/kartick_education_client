'use client';
import { ENUM_VIDEO_PLATFORM } from '@/constants/globalEnums';
import { IFileAfterUpload } from '@/types/globalType';
import { LinkToGetExtensions } from '@/utils/LinkToGetExtensions';
import fileObjectToLink from '@/utils/fileObjectToLink';
import { urlChecker } from '@/utils/urlChecker';
import VimeoPlayer from '@/utils/vimoPlayer';
import { Tabs } from 'antd';
import { useState } from 'react';
import YouTubePlayer from 'react-player/youtube';
import CustomImageTag from '../ui/CustomTag/CustomImageTag';
import LoadingSkeleton from '../ui/Loading/LoadingSkeleton';
import PDFViewer from '../ui/PdfViewer';

export default function AnyFileViewer({
  files,
}: {
  files: IFileAfterUpload[];
}) {
  const [loading, setLoading] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  if (!files || files.length === 0) {
    return <div className="my-4 w-full text-center">No content found.</div>;
  }

  const items = files.map((file: IFileAfterUpload, index: number) => {
    const application = LinkToGetExtensions(fileObjectToLink(file), [
      '.doc',
      '.docx',
      '.pptx',
      '.ppt',
    ]);
    const result = urlChecker(fileObjectToLink(file));

    return {
      key: index.toString(),
      label: `File ${index + 1}`,
      children: (
        <div className="my-3 flex items-center justify-center border">
          {file.mimetype.includes('image') && (
            <CustomImageTag
              src={fileObjectToLink(file)}
              width={500}
              height={500}
              className="h-96 w-96"
            />
          )}
          {result.platform === ENUM_VIDEO_PLATFORM.VIMEO && result.data && (
            <div className="flex items-center justify-center">
              <VimeoPlayer
                width={750}
                height={600}
                className=""
                link={result.data!}
              />
            </div>
          )}
          {result.platform === ENUM_VIDEO_PLATFORM.YOUTUBE && result.data && (
            <div className="flex items-center justify-center">
              <YouTubePlayer url={result.data as string} />
            </div>
          )}
          {file.mimetype.includes('pdf') && (
            <PDFViewer file={fileObjectToLink(file)} />
          )}
          {application?.type === 'document' &&
            (loading ? (
              <LoadingSkeleton />
            ) : (
              <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                  fileObjectToLink(file),
                )}`}
                className="h-[400px] w-full rounded-md border border-gray-300 shadow-lg sm:h-[600px] sm:w-[600px] md:h-[700px] md:w-[700px] lg:h-[800px] lg:w-[800px]"
                style={{ border: 'none' }}
                title={file?.filename}
                // onLoad={handleLoad}
              />
            ))}
          {application?.type === 'powerPoint' &&
            (loading ? (
              <LoadingSkeleton />
            ) : (
              <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                  fileObjectToLink(file),
                )}`}
                className="h-[400px] w-full rounded-md border border-gray-300 shadow-lg sm:h-[600px] sm:w-[600px] md:h-[700px] md:w-[700px] lg:h-[800px] lg:w-[800px]"
                style={{ border: 'none' }}
                title={file?.filename}
                // onLoad={handleLoad}
              />
            ))}
        </div>
      ),
    };
  });

  return <Tabs defaultActiveKey="0" items={items} />;
}
