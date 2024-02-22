import { LoadingOutlined, UploadOutlined,PlayCircleOutlined } from "@ant-design/icons";
import { Upload, Button, Space } from "antd";
import type { UploadChangeParam, RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Error_model_hook } from "@/utils/modalHook";
import uploadAudioCloudinary from "@/hooks/UploadAudioCloudinary";
import Link from "next/link";
import uploadAudioInServer from "@/hooks/uploadAudio";

type UploadAudioFileProps = {
    name: string;
    defaultFiles?: string;
    customChange?: any;
    isReset?: boolean;
    fileType: "image" | "audio";
};

const UploadAudioFile = ({
    name,
    defaultFiles = '',
    customChange,
    isReset = false,
    fileType,
}: UploadAudioFileProps) => {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<string>(defaultFiles);
    const { setValue } = useFormContext();

    useEffect(() => {
        setValue(name, files);
    }, [files, name, setValue]);

    const handleFileProcessing = useCallback(async (file: any) => {
        try {
            // Process the file based on fileType (image or audio)
            // For now, let's just log the file type and URL
            console.log("File Type:", fileType);
            console.log("File URL:", file);
            if (file) {
                const audioURL = await uploadAudioInServer(file)
                // console.log('audioURL', audioURL)
                file = audioURL
            }
            setFiles(file);
            setLoading(false);
        } catch (error) {
            console.error("Error processing file:", error);
            setLoading(false);
        }
    }, [fileType]);

    const handleChange: UploadProps["onChange"] = async (
        info: UploadChangeParam<UploadFile>
    ) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // Get the processed file URL
            await handleFileProcessing(info.file.originFileObj);
        }
    };

    const uploadButton = (
        <div className="flex flex-col justify-center items-start">
            {loading ? <LoadingOutlined /> : <UploadOutlined />}
            <div style={{ marginTop: 8 }} className="-ml-3">Upload</div>
        </div>
    );

    useEffect(() => {
        if (isReset) {
            setFiles('');
        }
    }, [isReset]);


    // console.log('defaultFiles', defaultFiles)
    return (
        <div className="flex justify-center items-center border p-5 rounded-lg my-2 gap-3">
           
           
            {defaultFiles.length
                ?
                <Link href={defaultFiles} rel="noopener noreferrer" target="_blank"> 
                    {/* <audio controls> */}
                    {/* <source src={defaultFiles} type={`audio/${fileType}`} /> */}
                 
                  <span className="mx-2">
                        Play
                  </span>
                    <PlayCircleOutlined />
                {/* </audio> */}
                </Link>
             
                : null}
            <Upload
                name={name}
                listType={fileType === "image" ? "picture-card" : "text"}
                className="avatar-uploader"
                showUploadList={true}
                multiple={true}
                maxCount={5}
                action="/api/file"
                beforeUpload={customChange ? customChange : () => true}
                onChange={handleChange}
            >
                {uploadButton}
            </Upload>
        </div>
    );
};

export default UploadAudioFile;
