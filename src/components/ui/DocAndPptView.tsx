import { IFileAfterUpload } from '@/types/globalType';
import fileObjectToLink from '@/utils/fileObjectToLink';
import React from 'react';
import { DocumentViewer } from 'react-documents';

const file = {
  url: 'https://iblossomlearn.s3.us-east-2.amazonaws.com/upload/docs/samplepptx-1730923267819.pptx',
  mimetype:
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  filename: 'samplepptx.pptx',
  path: 'upload/docs/samplepptx-1730923267819.pptx',
  cdn: 'https://d30hkubekb1969.cloudfront.net',
  platform: 'aws',
  createdAt: '2024-11-06T20:01:12.010Z',
  updatedAt: '2024-11-06T20:01:12.010Z',
};

export default function DocAndPptView({ file }: { file: IFileAfterUpload }) {
  return (
    <div>
      <DocumentViewer
        queryParams="hl=Nl"
        url={fileObjectToLink(file)}
        viewer="office" // or "google" or another supported viewer type
        viewerUrl="https://view.officeapps.live.com/op/embed.aspx?src="
        overrideLocalhost="https://react-doc-viewer.firebaseapp.com/"
        className="ApplicationContainer"
      />
    </div>
  );
}
