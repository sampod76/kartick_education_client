import { instance as axiosInstance } from '@/helpers/axios/axiosInstance';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { Error_model_hook } from '@/utils/modalHook';

const url = `${getBaseUrl()}/upload/upload-single-image`;
const urls3 = `${getBaseUrl()}/upload/upload-any-files-s3`;

const uploadImgCloudinary = async (file: any) => {
  // console.log("🚀 ~ uploadImgCloudinary ~ file:", file);
  try {
    const formData = new FormData();
    formData.append('image', file as Blob);

    const response = await axiosInstance({
      url: url,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    console.log(response);

    if (response.data.url) {
      return response?.data?.secure_url;
    } else {
      console.error('Failed to upload image to Cloudinary');
      Error_model_hook('Failed to upload image to Cloudinary');
    }
  } catch (error: any) {
    console.error(error, 'error');
    Error_model_hook(error?.message);
  }
};
export const uploadS3AnyFile = async (file: any, mimetype: string) => {
  // console.log("🚀 ~ uploadImgCloudinary ~ file:", file);
  try {
    const formData = new FormData();
    if (file?.length) {
      for (let i = 0; i < file.length; i++) {
        formData.append(mimetype, file[i]);
      }
    } else {
      formData.append(mimetype, file as Blob);
    }

    const response = await axiosInstance({
      url: urls3,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    return response?.data[mimetype];
  } catch (error: any) {
    console.error(error, 'error');
    Error_model_hook(error?.message);
  }
};

export default uploadImgCloudinary;
