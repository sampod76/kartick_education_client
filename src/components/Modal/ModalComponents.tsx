"use client";
import React, { ReactElement, useState } from "react";
import { Button, Modal } from "antd";


const ModalComponent = ({
  children,
  buttonText,
  loading = false,
  setSetModel,
  showModel,
}: {
  children: React.ReactElement;
  buttonText?: string;
  loading?: boolean;
  showModel?: any;
  setSetModel?: any;
}) => {
  const [open, setOpen] = useState(false);
  //   const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    // setModalText("The modal will be closed after two seconds");
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {buttonText || "Open Modal"}
      </Button>
      <Modal
        // title="Title"
        open={open}
        confirmLoading={loading}
        onCancel={handleCancel}
        //! when i went hidden ok and cancel button then it use
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            {/* <Button>Custom Button</Button>
            <CancelBtn />
            <OkBtn /> */}
          </>
        )}
        width={1000}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;