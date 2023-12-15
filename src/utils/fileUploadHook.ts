import axios from "axios";
import Resizer from "react-image-file-resizer";

import { Error_model_hook } from "./modalHook";


export const fileUploadHook = async ({
  profileImage,
  singleImage,
  multipalImage,
  singlePdf,
}:any) => {
  //   const [imageFileData, setImageFileData] = useState({
  //     singleProfileImageData: {},
  //     singleImageFileData: {},
  //     multipalImageFileData: [],
  //   });
  let allFileData = {
    singleProfileImageData: {},
    singleImageFileData: {},
    multipalImageFileData: [],
    singlePdfData: {},
  };
  //
  const resizeImage = (file:any, maxWidth = 300, maxHeight = 300) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        maxWidth, // max width
        maxHeight, // max height
        "JPEG", // format
        100, // quality
        0, // rotation
        (uri:any) => {
          // The uri argument here is the compressed image as a Blob
          const compressedImage = new File([uri], file.name, {
            type: file.type,
            lastModified: file.lastModified,
          });
          resolve(compressedImage);
        },
        "file" // output type: 'file', 'base64', 'blob' (default is blob)
      );
    });
  };
  //


  //
  if (singleImage?.file) {
    const formData = new FormData();
    const compressedImage:any = await resizeImage(singleImage.file, 800, 600);
    formData.append("image", compressedImage);
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/uploade-single-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_CLIENT_BASE}`,
            "Access-Control-Allow-Credentials": "true",
            // authorization: localStorage.getItem("tech_token"),
          },
        }
      );
      console.log(result);
      if (result.data?.success) {
        allFileData.singleImageFileData = result.data.data;
        // setImageFileData((c) => ({
        //   ...c,
        //   singleImageFileData: result.data.data,
        // }));
      } else {
       
        
        // setLoading(false);
      }
    } catch (error) {
      
  
      // setLoading(false);
    }
  }
 
  return allFileData;
};
