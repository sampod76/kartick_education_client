import uploadFileCloudinary from "@/hooks/UploadSIngleCloudinary";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { AudioOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Error_model_hook } from "@/utils/modalHook";

const getBase64 = (file: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(file);
};

const beforeUpload = (file: RcFile, fileType: string) => {
    const isSupportedType =
        (fileType === "image" && /^image\/(jpeg|png|jpg)$/.test(file.type)) ||
        (fileType === "audio" && /^audio\//.test(file.type));

    if (!isSupportedType) {
        Error_model_hook(`You can only upload ${fileType === "image" ? "JPG/PNG" : "audio"} files!`);
    }

    return isSupportedType;
};

type FileUploadProps = {
    name: string;
    fileType: "image" | "audio";
    defaultFiles?: string[];
    customChange?: any;
    isReset?: boolean;
};

const UploadAudioFile = ({
    name,
    fileType,
    defaultFiles = [],
    customChange,
    isReset = false,
}: FileUploadProps) => {
    const [loading, setLoading] = useState(false);
    const [filesUrl, setFilesUrl] = useState<string[]>(defaultFiles);
    const { setValue } = useFormContext();

    useEffect(() => {
        setValue(name, filesUrl);
    }, [filesUrl, name]);

    const handleFileProcessing = useCallback(async (file: any) => {
        try {
            // Handle file processing based on file type (image or audio)
            const processedFile = fileType === "image" ? await handleImageProcessing(file) : await handleAudioProcessing(file);

            setFilesUrl((prevFiles) => [...prevFiles, processedFile]);
            setLoading(false);
        } catch (error) {
            console.error("Error processing file:", error);
            setLoading(false);
        }
    }, [fileType]);

    const handleImageProcessing = async (file: RcFile) => {
        // Your existing image processing logic here...
        // Replace this with your actual image processing logic
        // ...

        return processedImageUrl;
    };

    const handleAudioProcessing = async (file: RcFile) => {
        // Handle audio processing logic (e.g., upload to cloudinary)
        try {
            const audioUrl = await uploadFileCloudinary(file);
            console.log("Audio URL:", audioUrl);
            return audioUrl;
        } catch (error) {
            console.error("Error uploading audio file:", error);
            throw error;
        }
    };

    const handleChange: UploadProps["onChange"] = async (
        info: UploadChangeParam<UploadFile>
    ) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            await handleFileProcessing(info.file.originFileObj);
        }
    };

    const uploadButton = (
        <div className="">
            {loading ? (
                <LoadingOutlined />
            ) : (
                fileType === "image" ? <PlusOutlined /> : <AudioOutlined />
            )}
            <div style={{ marginTop: 8 }}>{fileType === "image" ? "Upload Image" : "Upload Audio"}</div>
        </div>
    );

    useEffect(() => {
        if (isReset) {
            setFilesUrl([]);
        }
    }, [isReset]);

    return (
        <div className="flex justify-center items-center border p-5 rounded-lg my-2 gap-3">
            {defaultFiles.length
                ? defaultFiles?.map((file, i) => (
                    // Render existing files (image or audio)
                    <div key={i}>
                        {fileType === "image" ? (
                            <img className="rounded" src={file} width={300} height={120} alt="" />
                        ) : (
                            <audio controls>
                                <source src={file} type="audio/mp3" />
                                Your browser does not support the audio element.
                            </audio>
                        )}
                    </div>
                ))
                : null}
            <Upload
                name={name}
                listType={fileType === "image" ? "picture-card" : "text"}
                className="avatar-uploader"
                showUploadList={true}
                multiple={true}
                maxCount={5}
                action="/api/file"
                beforeUpload={(file) => beforeUpload(file, fileType)}
                onChange={handleChange}
            >
                {uploadButton}
            </Upload>
        </div>
    );
};

export default UploadAudioFile;
