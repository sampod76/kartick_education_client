import { Error_model_hook } from "@/utils/modalHook";
import axios from "axios";
import Resizer from "react-image-file-resizer";

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
  const resizeImage = (file: any, maxWidth = 300, maxHeight = 300) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        maxWidth,
        maxHeight,
        "JPEG",
        100,
        0,
        (result) => {
          if (typeof result === 'string' || result instanceof Blob || result instanceof File) {
            const compressedImage = new File([result], file.name, {
              type: file.type,
              lastModified: file.lastModified,
            });
            resolve(compressedImage);
          } else {
            // Handle unexpected result type
            console.error('Unexpected result type from imageFileResizer:', result);
            // You might want to reject the promise or handle the error in an appropriate way
          }
        },
        "file"
      );
    });
  };
  

  if (profileImage?.file) {
    const formData = new FormData();
    const compressedImage:any = await resizeImage(profileImage.file, 300, 300);
    formData.append("image", compressedImage);
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL_REAL_FILE}/upload/uploade-profile-image`,
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
        allFileData.singleProfileImageData = result.data.data;
        // setImageFileData((c) => ({
        //   ...c,
        //   singleProfileImageData: result.data.data,
        // }));
      } else {
        Error_model_hook(result?.data?.message || "Image upload failed");
        
        console.log(result?.data?.message);
        // setLoading(false);
      }
    } catch (error: any) {
      Error_model_hook(error?.message || error);
      console.log(error);
      // setLoading(false);
    }
  }
  //
  if (singleImage?.file) {
    const formData = new FormData();
    const compressedImage: any = await resizeImage(singleImage.file, 800, 600);
    formData.append("image", compressedImage);
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL_REAL_FILE}/upload/upload-single-image`,
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
        Error_model_hook(result?.data?.message || "Image upload failed");
        console.log(result?.data?.message);
        // setLoading(false);
      }
    } catch (error:any) {
        Error_model_hook(error?.message || error);
        console.log(error);
    }
  }
  //
  //
  if (singlePdf?.file) {
    const formData = new FormData();
    formData.append("pdf", singlePdf?.file);
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL_REAL_FILE}/upload/uploade-single-image`,
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
        allFileData.singlePdfData = result.data.data;
        // setImageFileData((c) => ({
        //   ...c,
        //   singleImageFileData: result.data.data,
        // }));
      }else {
        Error_model_hook(result?.data?.message || "Image upload failed");
        console.log(result?.data?.message);
        // setLoading(false);
      }
    } catch (error:any) {
        Error_model_hook(error?.message || error);
        console.log(error);
    }
  }
  //
  if (multipalImage?.files?.length) {
    try {
      const formData = new FormData();
  
      for (let i = 0; i < multipalImage.files.length; i++) {
        try {
          const compressedImage: any = await resizeImage(
            multipalImage.files[i],
            800,
            600
          );
  
          formData.append("images", compressedImage);
        } catch (resizeError) {
          console.error("Error resizing image:", resizeError);
          // Handle the error appropriately, e.g., show a message to the user
        }
      }
  
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL_REAL_FILE}/upload/uploade-multipal-images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_CLIENT_BASE}`,
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
  
      console.log(result);
  
      if (result.data?.success) {
        allFileData.multipalImageFileData = result.data.data;
        // Update state or perform other actions based on the successful upload
      } else {
        Error_model_hook(result?.data?.message || "Image upload failed");
        console.log(result?.data?.message);
        // Handle the case where the server responds with an error
      }
    } catch (error:any) {
      Error_model_hook(error?.message || "file upload failed");
      console.error("Unexpected error:", error);
      // Handle unexpected errors, e.g., log the error or show a generic error message
    }
  }
  
  return allFileData;
};
