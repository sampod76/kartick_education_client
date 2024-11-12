 'use client';
import { useState, useEffect } from 'react';

interface DocumentFile {
  uri: string;
  fileName: string;
  fileType: string;
}

const DocumentViewer = () => {
  const [docs, setDocs] = useState<DocumentFile[]>([]);
  const [activeDoc, setActiveDoc] = useState<DocumentFile | null>(null);

  useEffect(() => {
    setDocs([
      {
        uri: "https://calibre-ebook.com/downloads/demos/demo.docx",
        fileName: "demo.docx",
        fileType: "docx",
      },
      {
        uri: "https://sample-videos.com/xls/Sample-Spreadsheet-10-rows.xls",
        fileName: "demo sample.xls",
        fileType: "xls",
      },
      {
        uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileName: "dummy.pdf",
        fileType: "pdf",
      },
      {
        uri: "https://bucketdevsampod.s3.us-east-1.amazonaws.com/upload/docs/1729605539480-160930-artificial-intelligence-template-16x9.pptx",
        fileName: "example.ppt",
        fileType: "ppt",
      }
    ]);

    setActiveDoc({
      uri: "https://calibre-ebook.com/downloads/demos/demo.docx",
      fileName: "demo.docx",
      fileType: "docx",
    });
  }, []);

  const handleDocumentChange = (index: number) => {
    setActiveDoc(docs[index]);
  };

  const renderDoc = (doc: DocumentFile) => {
    const { uri, fileType } = doc;

    if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileType)) {
      // Use Microsoft Office Viewer for Office document types
      return (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(uri)}`}
          width="100%"
          height="900px"
          style={{ border: 'none' }}
          title={doc.fileName}
        />
      );
    } else if (['pdf'].includes(fileType)) {
      // Render PDFs with Google Docs Viewer or directly in iframe
      return (
        <iframe
          src={`https://docs.google.com/gview?url=${uri}&embedded=true`}
          width="100%"
          height="900px"
          style={{ border: 'none' }}
          title={doc.fileName}
        />
      );
    } else {
      return <p>Unsupported document type.</p>;
    }
  };

  return (
    <div className="flex flex-row h-screen  ">
      {/* Sidebar for document list */}
      <div className="w-1/6 bg-gray-100 p-4 border-r-2 border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Available Documents</h2>
        <ul>
          {docs.map((doc, index) => (
            <li key={index} className="mb-2">
              <button
                onClick={() => handleDocumentChange(index)}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeDoc?.fileName === doc.fileName
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-blue-500 border border-blue-500'
                } hover:bg-blue-600 hover:text-white transition duration-200`}
              >
                {doc.fileName}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Document display */}
      <div className="w-3/4 p-4">
        {activeDoc ? (
          <div className="border-2 border-gray-200 shadow-lg rounded-lg overflow-hidden">
            {renderDoc(activeDoc)}
          </div>
        ) : (
          <p>Loading document...</p>
        )}
      </div>
    </div>
  );
};

export default DocumentViewer;



// import { useState, useEffect } from 'react';
// import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

// interface Document {
//   uri: string;
//   fileType: string;
//   fileName: string;
// }

// const DocumentViewer = () => {
//   const [docs, setDocs] = useState<Document[]>([]);

//   useEffect(() => {
//     setDocs([
//       {
//         uri: "https://calibre-ebook.com/downloads/demos/demo.docx",
//         fileType: "docx",
//         fileName: "demo.docx"
//       },
//       {
//         uri: "https://sample-videos.com/xls/Sample-Spreadsheet-10-rows.xls",
//         fileType: "xls",
//         fileName: "demo sample.xls"
//       }
//     ]);
//   }, []);

//   const handleDocumentChange = (doc: Document) => {
//     console.log('Document changed:', doc);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center w-full h-full">
//       <DocViewer
//         theme={{
//           primary: "#5296d8",
//           secondary: "#ffffff",
//           tertiary: "#5296d899",
//           textPrimary: "#ffffff",
//           textSecondary: "#5296d8",
//           textTertiary: "#00000099",
//           disableThemeScrollbar: false,
//         }}
//         documents={docs}
//         initialActiveDocument={docs[0]}
//         pluginRenderers={DocViewerRenderers}
//         onDocumentChange={handleDocumentChange}
//         config={{
//           header: {
//             disableHeader: false,
//             disableFileName: true,
//             retainURLParams: false,
//           }
//         }}
//         className="w-full h-[100vh]"
//       />
//     </div>
//   );
// };

// export default DocumentViewer;
