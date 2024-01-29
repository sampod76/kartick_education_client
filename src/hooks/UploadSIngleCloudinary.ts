import { getBaseUrl, getCloudinaryEnv } from "@/helpers/config/envConfig";

const env = getCloudinaryEnv();

const url = `${getBaseUrl()}/upload/upload-single-image`;

const uploadImgCloudinary = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("image", file as Blob);

    const response = await fetch(url, {
      method: "post",
      body: formData,
    });
    // console.log(response)

    if (response.ok) {
      const data = await response.json();
      console.log("🚀 ~ uploadImgCloudinary ~ data:", data)
      return data?.data?.secure_url;
    } else {
      console.error("Failed to upload image to Cloudinary");
    }
  } catch (error) {
    console.error(error, "error");
  }
};

export default uploadImgCloudinary;
