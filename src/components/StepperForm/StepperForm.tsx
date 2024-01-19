"use client";

import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import { Button, message, Steps } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface ISteps {
  title?: string;
  content?: React.ReactElement | React.ReactNode;
}

interface IStepsProps {
  steps: ISteps[];
  persistKey: string;
  submitHandler: (el: any) => void;
  navigateLink?: string;
}

const StepperForm = ({
  steps,
  submitHandler,
  navigateLink,
  persistKey,
}: IStepsProps) => {
  const router = useRouter();

  const [current, setCurrent] = useState<number>(
    !!getFromLocalStorage("step")
      ? Number(JSON.parse(getFromLocalStorage("step") as string).step)
      : 0
  );

  const [savedValues, setSavedValues] = useState(
    !!getFromLocalStorage(persistKey)
      ? JSON.parse(getFromLocalStorage(persistKey) as string)
      : ""
  );

  useEffect(() => {
    setToLocalStorage("step", JSON.stringify({ step: current }));
  }, [current]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps?.map((item) => ({ key: item.title, title: item.title }));

  const methods = useForm({ defaultValues: savedValues });
  const watch = methods.watch();

  useEffect(() => {
    setToLocalStorage(persistKey, JSON.stringify(watch));
  }, [watch, persistKey, methods]);

  const { handleSubmit, reset } = methods;

  const handleStudentOnSubmit = (data: any) => {
    submitHandler(data);
    reset();
    setToLocalStorage("step", JSON.stringify({ step: 0 }));
    setToLocalStorage(persistKey, JSON.stringify({}));
    navigateLink && router.push(navigateLink);
  };
  // console.log(items?.length, current, "items?.length === current");
  return (
    <>
      {/* <Steps current={current} items={items} /> */}
      <div className="flex items-items space-x-6 w-max border-2 rounded-full font-[sans-serif] m-4 overflow-hidden">
        {items.map((item, index) => (
          <div
            key={index + 1}
            className={`flex items-center cursor-pointer ${
              index === current
                ? "bg-[#23b2b0 bg-primary text-white" // Apply active color to the active step
                : "bg-white text-gray-400"
            } h-[50px] py-2 px-6 relative`}
          >
            <div className="z-10">
              <h4 className="text-sm font-bold">{item.title}</h4>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-[105%] absolute top-0 -right-[38px]  ${
                index === current ? "fill-white" : "fill-gray-50"
              } ${items?.length - 1 === current && "hidden"}`}
              viewBox="0 0 362 362.667"
            >
              <path
                d="M213.668 181.332c0 4.27-1.281 8.535-3.629 11.734l-106.664 160c-3.84 5.762-10.242 9.602-17.707 9.602h-64c-11.734 0-21.336-9.602-21.336-21.336 0-4.266 1.281-8.531 3.629-11.73l98.773-148.27L3.961 33.066C1.613 29.867.332 25.602.332 21.332.332 9.602 9.934 0 21.668 0h64c7.465 0 13.867 3.84 17.707 9.602l106.664 160c2.348 3.199 3.629 7.464 3.629 11.73zm0 0"
                data-original="#2196f3"
              />
            </svg>
          </div>
        ))}
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleStudentOnSubmit)}
          style={{ marginTop: "36px" }}
        >
          <div>{steps[current]?.content}</div>

          <div style={{ marginTop: 30 }}>
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="default" onClick={() => next()}>
                Next
              </Button>
            )}

            {current === steps.length - 1 && (
              <Button
                type="default"
                htmlType="submit"
                style={{
                  minWidth: "8rem",
                }}
                onClick={() => message.success("Processing complete!")}
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
};

// export default StepperForm;

export default dynamic(() => Promise.resolve(StepperForm), {
  ssr: false,
});
