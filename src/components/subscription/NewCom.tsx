"use client";
import React, { useState } from 'react';

const Switch = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="flex items-center">
      <button
        className={`${
          isOn ? 'bg-blue-500' : 'bg-white'
        } relative inline-flex flex-shrink-0 h-6 w-12 border-2 border-gray-200 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
        onClick={toggleSwitch}
      >
        <span
          className={`${
            isOn ? 'translate-x-6' : 'translate-x-0'
          } inline-block w-6 h-6 transform bg-blue-400 rounded-full transition-transform duration-200`}
        />
      </button>
    </div>
  );
};

export default Switch;
