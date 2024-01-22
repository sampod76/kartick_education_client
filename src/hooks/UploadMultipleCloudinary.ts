import { getCloudinaryEnv } from "@/helpers/config/envConfig";

const cloudinaryEnv = getCloudinaryEnv();
const upload_preset = cloudinaryEnv.upload_preset;
const cloud_name = cloudinaryEnv.cloud_name;
const url = `https://api.cloudinary.com/v1_1/${"duyfxtcdd"}/image/upload`;

const uploadFilesCloudinary = async (files: FileList | File[]) => {
  try {
    const fileListArray = Array.from(files); // Convert FileList or File[] to an array

    const formData = new FormData();

    for (let i = 0; i < fileListArray.length; i++) {
      formData.append("files", fileListArray[i]);
    }

    formData.append("upload_preset", "mvfmecoi");
    formData.append("cloud_name", "duyfxtcdd");

    const response = await fetch(url, {
      method: "post",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data?.resources.map((resource: any) => resource.secure_url);
    } else {
      console.error("Failed to upload files to Cloudinary");
    }
  } catch (error) {
    console.error(error, "error");
  }
};

export default uploadFilesCloudinary;
