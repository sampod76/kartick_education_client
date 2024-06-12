
import { FaXTwitter, FaLinkedin, FaFacebookF, FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { getUserInfo } from "@/services/auth.service";
import { useAddContactMutation } from "@/redux/api/adminApi/contactApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { Button, Col, Form, Row } from "antd";
import FormInput from "../Forms/FormInput";
import FormTextArea from "../Forms/FormTextArea";
import ContactForm from "./ContactForm";

const NewContactPage = () => {

  return (
    <>
      <div>
        <div className="bg-[#F7EEE5]">
          <div className="mt-5">
            <p className="mt-2 text-center font-bold text-[30px]">
              {`Contact Info`}
            </p>
            <p className="mt-[14px] text-[#4A4A4A] text-center text-[22px]">
              {`Welcome to our website. We are glad to have you around`}
            </p>
          </div>
          <div className="h-[100%] mt-6 flex">
            <div className="info w-[40%]">
              <div className="w-[85%] p-4 mx-auto mt-[35%]">
                <div className="flex gap-4 items-center">
                  <p>{`Follow Us`}</p>
                  <FaXTwitter size={18} />
                  <FaLinkedin size={18} />
                  <FaFacebookF size={17} />
                </div>
                <div className="contact-info mt-6">
                  <div className="flex gap-4 border-b-2 border-[#FB8500] pb-5 pt-1 items-center">
                    <FaPhoneAlt size={16} />
                    <div className="font-bold">{`1 (888) 2010390`}</div>
                  </div>
                  <div className="flex gap-3 border-b-2 border-[#FB8500] pb-5 pt-3 items-center">
                    <IoMdMail size={19} />
                    <div className="font-bold">{`hello@iblossomlearn.com`}</div>
                  </div>
                  <div className="flex gap-3 pb-5 pt-3 items-center">
                    <FaLocationDot size={18} />
                    <div className="font-bold">
                      {`375 Rockbridge Rd. NewYork. United States of America`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="form w-[60%]">
              <div className="w-[80%] h-[620px] mx-auto mt- m-5 p-5 bg-[white] rounded-[16px]">
                <p className="text-[#1E1E1E] text-[24px] font-bold">
                  {`Let's Get In Touch.`}
                </p>
                <p className="text-[16px] text-[#1E1E1E] mt-3">
                  {`Fill the form and get in contact with us`}
                </p>

                <div className="flex w-[100%] gap-[28px] mt-10">
                  <div className="w-[48%]">
                    <p className="text-[#1E1E1E] text-[16px]">{`First name`}</p>
                    <input
                      className="border-b-2 pb-2 border-[#E3DBDB] w-[100%] mt-2"
                      type="text"
                      placeholder="e.g. James"
                    />
                  </div>
                  <div className="w-[48%]">
                    <p className="text-[#1E1E1E] text-[16px]">{`Last name`}</p>
                    <input
                      className="border-b-2 pb-2 border-[#E3DBDB] w-[100%] mt-2"
                      type="text"
                      placeholder="e.g. Bond"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-[#1E1E1E] text-[16px]">{`Your E-mail`}</p>
                  <input
                    className="border-b-2 pb-2 border-[#E3DBDB] w-[100%] mt-2"
                    type="text"
                    placeholder="e.g. j.bondinlossom@gmail.com"
                  />
                </div>
                <div className="mt-6">
                  <p className="text-[#1E1E1E] text-[16px]">{`Your Subject`}</p>
                  <input
                    className="border-b-2 pb-2 border-[#E3DBDB] w-[100%] mt-2"
                    type="text"
                  />
                </div>
                <div className="mt-6">
                  <p className="text-[#1E1E1E] text-[16px]">{`How can we help you?`}</p>
                  <input
                    className="border-b-2 pb-2 border-[#E3DBDB] w-[100%] mt-2"
                    type="text"
                  />
                </div>
                <p className="mt-6">
                  {`By submitting this form, I confirm that I have read and accept the Privacy Policy.`}
                </p>
                <div className="mt-7">
                  <button className="h-[50px] w-[82px] bg-[#5371FB] text-[white] rounded-[8px]">{`Send`}</button>
                </div>
              </div>
            </div> */}
            <div className="form w-[60%]"><ContactForm /></div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default NewContactPage;
