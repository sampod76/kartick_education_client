import { getCloudinaryEnv } from "@/helpers/config/envConfig";

const env = getCloudinaryEnv();

const url = `https://api.cloudinary.com/v1_1/${"duyfxtcdd"}/image/upload`;

const uploadImgCloudinary = async (file: any) => {
  console.log(
    "🚀 ~ file: ImgUploadCloudinary.ts:8 ~ uploadImgCloudinary ~ file:",
    file
  );

  // console.log(url);
  try {
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("upload_preset", "mvfmecoi");
    formData.append("cloud_name", "duyfxtcdd");

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
