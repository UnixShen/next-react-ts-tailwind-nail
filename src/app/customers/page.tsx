import React from "react";

const Customer = () => {
  return <div className="bg-[#FBDADD] p-4 rounded-2xl shadow-soft">
    <p className="text-sm text-gray-600 mb-2">客户管理</p>
    <div className="space-y-2 text-sm">
      <div className="flex items-center justify-between">
        <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>今日预约</span>
        <span></span>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-pink-400 mr-2"></div>2人</span>
        <span></span>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-red-400 mr-2"></div>待跟进</span>
        <span></span>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>3人</span>
        <span></span>
      </div>
    </div>
  </div>
};

export default Customer;
