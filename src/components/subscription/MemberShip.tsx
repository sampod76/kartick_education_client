import Link from "next/link";
import NewCom from "./NewCom";
import { FaCheck } from "react-icons/fa";

type ISubscription = {
  _id: string;
  title: string;
  enroll_time: string; // Assuming ISO date string format
  price: number;
  time_duration: string;
  // img: any;
  params: string;
};

const subscriptionData: ISubscription[] = [
  {
    _id: "1",
    title: "family & personal",
    params: "family_personal",
    enroll_time: "2024-01-15T10:30:00Z",
    price: 29.99,
    time_duration: "3 months",
    // img: AllImage.subscription.subFamily,
  },

  {
    _id: "2",
    title: "Premium Plan",
    params: "",
    enroll_time: "2024-01-20T12:45:00Z",
    price: 39.99,
    time_duration: "6 months",
    // img: AllImage.subscription.subTeacher,
  },
  {
    _id: "3",
    title: "Custom Membership/ Free trial",
    params: "school_teacher",
    enroll_time: "2024-01-10T08:00:00Z",
    price: 19.99,
    time_duration: "1 month",
    // img: AllImage.subscription.subAdmin,
  },
];

const Membership = () => {
  return (
    <>
      <div>
        <div>
          <p className="text-center font-bold text-4xl mt-6">Price & Plans</p>
          <p className="text-center text-[22px] mt-[22px] text-[#4A4A4A]">
            Check Out Our Plans And Choose What Best For You.
          </p>
          <div className="w-[215px] mx-auto mt-9 flex  gap-[15px] text-[14px]">
            Bill months <NewCom /> Bill Yearly
          </div>
        </div>
        <div className="   mt-12">
          <div className="w-[70%] mx-auto flex gap-[8%] ">
            {subscriptionData?.map(
              (subscription: ISubscription, index: number) => {
                return (
                  <div key={index} className="cards duration-300 hover:border-[#5371FB] border h-[450px] w-[380px] pt-[60px] rounded-[15px]">
                    <div className="h-[330px] w-[245px]   mx-auto">
                      <div className="h-[60px]">
                        <p className="font-bold text-[20px] mt-1">
                          {subscription?.title}
                        </p>
                      </div>
                      <div className="mt-10">
                        <span className="text-[52px] font-bold">
                          {subscription?.price}
                        </span>
                        <span>/month</span>
                      </div>
                      <div className="mt-2">
                        <div className="flex gap-3">
                          {/* <Unicons.UilCheck color={"#FB8500"} /> */}
                          <FaCheck color={"#FB8500"} />
                          <p>50+ free coursses</p>
                        </div>
                        <div className="flex gap-3">
                          <FaCheck color={"#FB8500"} />
                          <p>World class support</p>
                        </div>
                        <div className="flex gap-3">
                          <FaCheck color={"#FB8500"} />
                          <p>Free lifetime updates</p>
                        </div>
                      </div>
                      <div className="mt-11">
                        <button className="bg-[#5371FB] text-[white] h-[48px] w-[155px] rounded-[8px]">
                          <Link
                            href={`/subscription/join/${subscription?._id}?pack=${subscription?.params}`}
                            className="bg-[#5371FB] text-[white] h-[48px] w-[155px] rounded-[8px]"
                          >
                            Join Now
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Membership;
