import { instance as axiosInstance } from '@/helpers/axios/axiosInstance';
import { getBaseUrl } from '@/helpers/config/envConfig';
const url = `${getBaseUrl()}/aws/create-aws-upload-files-token`;
const singleFileUploaderInS3 = async (
  fileData: { pre_url: any },
  uploadFile: any,
) => {
  try {
    const response = await axiosInstance({
      url: fileData.pre_url,
      method: 'PUT',
      data: uploadFile,
      withCredentials: true,
    });

    return fileData;
  } catch (error: any) {
    throw new Error(error?.message || 'Error');
  }
};

export const multipleFilesUploaderS3 = async (files: any[]) => {
  try {
    const filesModifyServerFormate = files.map((file, index) => {
      let uid = file?.uid;
      if (!uid) {
        uid = crypto.randomUUID();
        files[index].uid = uid;
      }
      return {
        filename: file.name,
        mimetype: file.type,
        uid: uid, //!when use ant-d uploader then file.originFileObj in have --> default (uid) . when use custom uploader then add uid custom
      };
    });

    const promises: any[] = [];
    const getFilesToken = await axiosInstance({
      url: url,
      method: 'POST',
      data: { images: filesModifyServerFormate },
      withCredentials: true,
    });
    const serverResponseObjects = getFilesToken?.data?.images || [];

    files.forEach((file) => {
      const serverObject = serverResponseObjects?.find(
        (image: { uid: any }) => image?.uid === file?.uid, //!when use ant-d uploader then file.originFileObj in have --> default uid . when use custom uploader then add uid custom
      );
      const fileUpload = singleFileUploaderInS3(serverObject, file);
      promises.push(fileUpload);
    });
    const result = await Promise.all(promises);
    return result;
  } catch (error: any) {
    throw new Error(error?.message || 'Error');
  }
};
