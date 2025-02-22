"use client";

import { Camera } from "lucide-react";

const VideoScreen = () => {
  return (
    <div className="w-2/4 h-full flex items-center justify-center">
      <div className="w-[98%] h-[96.5%] bg-blue-600 rounded-lg flex flex-col items-center justify-center">
        <Camera className="text-white w-[30vw] h-[30vw]" />
        <h1 className="text-white font-bold text-[5vw]">COMING SOON</h1>
      </div>
    </div>
  );
};

export default VideoScreen;
