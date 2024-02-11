import { authKey } from "@/constants/storageKey";
import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import {
  getOnlyBaseUrl,
  getBaseUrl,
  getCloudinaryEnv,
} from "@/helpers/config/envConfig";
import { getFromLocalStorage } from "@/utils/local-storage";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { Error_model_hook } from "@/utils/modalHook";

const url = `${getBaseUrl()}/upload/upload-audio`;

const uploadAudioCloudinary = async (file: any) => {
  console.log("🚀 ~ uploadAudioCloudinary ~ file:", file);
  try {
    const formData = new FormData();
    formData.append("audio", file as Blob);

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

    if (response.data.original_filename) {
    
      return   `${getOnlyBaseUrl()}/audios/${response?.data?.original_filename}`;
    } else {
      console.error("Failed to upload image to Cloudinary");
      Error_model_hook("Failed to upload image to Cloudinary");
    }
  } catch (error: any) {
    console.error(error, "error");
    Error_model_hook(error?.message);
  }
};

export default uploadAudioCloudinary;
