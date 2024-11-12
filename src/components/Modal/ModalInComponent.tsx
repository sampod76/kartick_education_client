import { ReactNode, useEffect, useState } from 'react';

const ModalInComponent = ({
  children,
  button,
}: {
  children: ReactNode;
  button: any;
}) => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = openModal ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openModal]);

  return (
    <div className="mt-4 w-full">
      {/* Pay Button */}
      <div onClick={() => setOpenModal(true)} className="">
        {button || 'Click to open'}
      </div>
      <div
        className={`fixed z-[100] flex items-center justify-center bg-transparent ${openModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 h-full w-full duration-300`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`0 absolute flex h-full w-full justify-center overflow-x-hidden overflow-y-scroll rounded-lg bg-white drop-shadow-2xl ${openModal ? 'opacity-1 translate-y-0 duration-300' : 'translate-y-32 opacity-0 duration-100'}`}
        >
          <div className="px-4 py-8 sm:px-6 lg:px-8">
            <p
              onClick={() => setOpenModal(false)}
              className="mx-auto mb-6 mr-0 flex w-16 cursor-pointer rounded-lg bg-slate-950 px-3 py-2 text-white"
            >
              Close
            </p>
            <div className="">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInComponent;
