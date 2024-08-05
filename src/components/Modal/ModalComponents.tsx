"use client";
import React, { ReactElement, useState } from "react";
import { Button, Modal } from "antd";

const ModalComponent = ({
  children,
  buttonText,
  button,
  loading = false,
}: {
  children: React.ReactElement;
  buttonText?: string;
  button?: any;
  loading?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  //   const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {button ? (
        <div onClick={showModal}>{button}</div>
      ) : (
        <Button type="default" onClick={showModal}>
          {buttonText || "Open Modal"}
        </Button>
      )}
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
        {React.cloneElement(children, { open, setOpen })}
      </Modal>
    </>
  );
};

export default ModalComponent;
