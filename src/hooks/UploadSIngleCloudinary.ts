import { authKey } from "@/constants/storageKey";
import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { getBaseUrl, getCloudinaryEnv } from "@/helpers/config/envConfig";
import { getFromLocalStorage } from "@/utils/local-storage";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { Error_model_hook } from "@/utils/modalHook";

const url = `${getBaseUrl()}/upload/upload-single-image`;

const uploadImgCloudinary = async (file: any) => {
  // console.log("🚀 ~ uploadImgCloudinary ~ file:", file);
  try {
    const formData = new FormData();
    formData.append("image", file as Blob);

    const response = await axiosInstance({
      url: url,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    console.log(response);

    if (response.data.url) {
      return response?.data?.secure_url;
    } else {
      console.error("Failed to upload image to Cloudinary");
      Error_model_hook("Failed to upload image to Cloudinary");
    }
  } catch (error: any) {
    console.error(error, "error");
    Error_model_hook(error?.message);
  }
};

export default uploadImgCloudinary;
