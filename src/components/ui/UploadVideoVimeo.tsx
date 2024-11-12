import React, { useState } from 'react';
import { Upload, Button, Select, Input, message } from 'antd';
import type { UploadProps } from 'antd';
import axios from 'axios';
import { getOnlyBaseUrl } from '@/helpers/config/envConfig';


const { Option } = Select;

interface VimeoUploadResponse {
  uploadLink: string;
}

const VideoUpload: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoName, setVideoName] = useState<string>('');
  const [privacyOption, setPrivacyOption] = useState<string>('nobody');
  const [password, setPassword] = useState<string>('');
  const [domains, setDomains] = useState<string[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  // Function to validate file type (only video)
  const beforeUpload = (file: File) => {
    const isVideo = file.type.startsWith('video/');
    if (!isVideo) {
      message.error('You can only upload video files!');
    }
    return isVideo || Upload.LIST_IGNORE; // Return false if the file is not a video
  };

  // Function to handle file selection
  const handleFileChange: UploadProps['onChange'] = (info) => {
    const { status } = info.file;
    if (status === 'done') {
        //@ts-ignore
      setVideoFile(info.file.originFileObj); // Use originFileObj for correct File reference
      message.success(`${info.file.name} file selected.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file selection failed.`);
    }
  };

  // Function to upload video to Vimeo
  const uploadToVimeo = async () => {
    if (!videoFile) {
      message.error('Please select a video file.');
      return;
    }

    setUploadStatus('Requesting upload link...');

    try {
      const response = await axios.post<VimeoUploadResponse>(
        `${getOnlyBaseUrl()}/api/vimeo/upload-link`,
        {
          videoName: videoName || videoFile.name,
          videoSize: videoFile.size,
          privacyOption,
          password: privacyOption === 'password' ? password : null,
          domain: privacyOption === 'domain' ? domains : null,
        },
      );

      const uploadLink = response.data.uploadLink;

      setUploadStatus('Uploading...');

      await axios.patch(uploadLink, videoFile, {
        headers: {
          'Content-Type': 'application/offset+octet-stream',
          'Upload-Offset': '0',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            //@ts-ignore
            (progressEvent.loaded * 100) / progressEvent?.total,
          );
          setUploadStatus(`Upload Progress: ${percentCompleted}%`);
        },
      });

      setUploadStatus('Upload successful!');
      message.success('Video uploaded successfully!');
    } catch (error) {
      console.error('Error uploading video', error);
      setUploadStatus('Error uploading video.');
      message.error('Error uploading video.');
    }
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    beforeUpload, // Validate file type
    onChange: handleFileChange, // Handle file selection
    showUploadList: false, // Hide default file list display
  };

  return (
    <div>
     
      <h1>Upload Video to Vimeo</h1>

      <Upload {...uploadProps}>
        <Button type="primary">Select Video File</Button>
      </Upload>

      <Input
        placeholder="Video Name"
        value={videoName}
        onChange={(e) => setVideoName(e.target.value)}
        style={{ marginTop: '10px' }}
      />

      <Select
        value={privacyOption}
        onChange={(value) => setPrivacyOption(value)}
        style={{ width: '100%', marginTop: '10px' }}
      >
        <Option value="nobody">Private (Nobody)</Option>
        <Option value="password">Password Protected</Option>
        <Option value="domain">Domain Restricted</Option>
        <Option value="link_only">Link Only (Unlisted)</Option>
      </Select>

      {privacyOption === 'password' && (
        <Input
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginTop: '10px' }}
        />
      )}

      {privacyOption === 'domain' && (
        <Select
          mode="tags" // Enables multiple domain input
          placeholder="Enter allowed domains"
          value={domains}
          onChange={(value) => setDomains(value as string[])} // Update domain array
          style={{ width: '100%', marginTop: '10px' }}
        />
      )}

      <Button
        onClick={uploadToVimeo}
        type="primary"
        style={{ marginTop: '10px' }}
      >
        Upload
      </Button>

      <p>{uploadStatus}</p>
    </div>
  );
};

export default VideoUpload;
