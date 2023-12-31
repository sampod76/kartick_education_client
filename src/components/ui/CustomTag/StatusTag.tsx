import { ENUM_STATUS } from "@/constants/globalEnums";

const StatusTag = ({ status }: { status: string }) => {
  return (
    <div className="flex justify-center items-center">
      {status == ENUM_STATUS.ACTIVE ? (
        <p className="bg-green-600 capitalize text-white rounded-lg py-1 px-2  text-center w-[5.1875rem]">
          {status}
        </p>
      ) : (
        <p className="bg-red-500 capitalize text-white rounded-lg py-1 px-2 text-center w-[5.1875rem]">
          {status}
        </p>
      )}
    </div>
  );
};

export default StatusTag;
