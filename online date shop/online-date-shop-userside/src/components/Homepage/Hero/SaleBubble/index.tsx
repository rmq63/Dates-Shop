import React from "react";

const SaleBubble = () => {
  return (
    <div className="relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full font-bold text-xl flex items-center justify-center">
        50%
        <span className="ml-2 text-base font-normal">OFF</span>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-orange-500 p-1 rounded-t-full">
        <div className="w-4 h-4 bg-white rounded-full absolute bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
};

export default SaleBubble;
