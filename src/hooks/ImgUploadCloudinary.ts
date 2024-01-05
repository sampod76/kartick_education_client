import { getCloudinaryEnv } from "@/helpers/config/envConfig";

const upload_preset = getCloudinaryEnv().upload_preset;
const cloud_name = getCloudinaryEnv().cloud_name;
const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

const uploadImgCloudinary = async (file: any) => {
  // console.log(url);
  try {
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("upload_preset", upload_preset as string);
    formData.append("cloud_name", cloud_name as string);

    const response = await fetch(url, {
      method: "post",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data?.secure_url;
    } else {
      console.error("Failed to upload image to Cloudinary");
    }
  } catch (error) {
    console.error(error, "error");
  }
};

export default uploadImgCloudinary;
