import { getBaseUrl } from "@/helpers/config/envConfig";

const url = `${getBaseUrl()}/upload/upload-multiple-images`;

const uploadFilesCloudinary = async (files: FileList | File[]) => {
  try {
    const fileListArray = Array.from(files); // Convert FileList or File[] to an array

    const formData = new FormData();

    for (let i = 0; i < fileListArray.length; i++) {
      formData.append("images", fileListArray[i]);
    }

    const response = await fetch(url, {
      method: "post",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("🚀 ~ uploadFilesCloudinary ~ data:", data);
      return data?.data?.map((resource: any) => resource.secure_url);
    } else {
      console.error("Failed to upload files to Cloudinary");
    }
  } catch (error) {
    console.error(error, "error");
  }
};

export default uploadFilesCloudinary;
