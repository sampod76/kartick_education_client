"use client";
import React, { ReactElement, useState } from "react";
import { Button, Modal } from "antd";


const ModalComponent = ({
  children,
  buttonText,
  loading = false,
  
}: {
  children: React.ReactElement;
  buttonText?: string;
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
      <Button type="default" onClick={showModal}>
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
       {React.cloneElement(children, { open, setOpen })}
      </Modal>
    </>
  );
};

export default ModalComponent;