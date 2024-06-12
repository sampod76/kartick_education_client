/* eslint-disable @next/next/no-img-element */
'use client';
import { Button, Form, Input } from "antd";
import Link from "next/link";
import React from "react";


export default function LoginStudent() {
  return (
    <>
    <div className="flex justify-center items-center bg-gray-100 font-[sans-serif] text-[#333] h-full md:min-h-screen p-4">
      <div className="grid justify-center max-w-md mx-auto">
        <div>
          <img src="https://media.istockphoto.com/id/1449462492/photo/3d-render-cute-boy-ride-a-pencil.jpg?s=2048x2048&w=is&k=20&c=3KSyOAqVx0wG_uLDSvzVSnPT4TUqlhgvh4m3wzuGpBg=" alt="login-image" />
        </div>
        <div className="bg-white rounded-2xl p-6 -mt-24 relative z-10 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]">
          <div className="mb-10">
            <h3 className="text-3xl font-extrabold text-blue-600">Student Login</h3>
          </div>

        <Form>
              <div>
            <div className="relative flex items-center">
              <Input name="email" type="text" required  style={{"paddingLeft":"0.5rem","paddingRight":"0.5rem","paddingTop":"0.75rem","paddingBottom":"0.75rem","borderBottomWidth":"1px","borderColor":"#D1D5DB","outlineStyle":"none","width":"100%","fontSize":"0.875rem","lineHeight":"1.25rem"}} placeholder="Enter email" />
              
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                <defs>
                  <clipPath id="a" clipPathUnits="userSpaceOnUse">
                    <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                  </clipPath>
                </defs>
                <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                  <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                  <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                </g>
              </svg>
            </div>
          </div>
          <div className="mt-8">
            <div className="relative flex items-center">
              <Input.Password name="password" type="password" required  style={{"paddingLeft":"0.5rem","paddingRight":"0.5rem","paddingTop":"0.75rem","paddingBottom":"0.75rem","borderBottomWidth":"1px","borderColor":"#D1D5DB","outlineStyle":"none","width":"100%","fontSize":"0.875rem","lineHeight":"1.25rem"}} placeholder="Enter password" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 mt-6">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label  className="ml-3 block text-sm">
                Remember me
              </label>
            </div>
            <div>
              <a href="jajvascript:void(0);" className="text-blue-600 text-sm hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>
          <div className="mt-10">
            <Button    htmlType="submit"  className="" style={{"padding":"1re","borderRadius":"9999px","width":"100%","fontSize":"0.875rem","lineHeight":"1.25rem","fontWeight":600,"color":"#ffffff","backgroundColor":"#2563EB" , height:"2rem"}}>
              Sign in
            </Button>
            <p className="text-sm text-center mt-6">Dont have an account <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</a></p>
          </div>
        </Form>
    
        </div>
      </div>
    </div>
    </>
  );
}