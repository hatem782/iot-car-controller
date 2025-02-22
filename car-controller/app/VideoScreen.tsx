"use client";

import { Camera } from "lucide-react";
import { useEffect, useState } from "react";

const VideoScreen = () => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://51.38.49.42:6002"); // Change to your actual server IP

    socket.onopen = () => {
      console.log("✅ Connected to WebSocket");
      socket.send("i am client"); // Register this as a receiving client
    };

    socket.onmessage = (event) => {
      const blob = new Blob([event.data], { type: "image/jpeg" });
      setImageSrc(URL.createObjectURL(blob as any) as any); // Convert to image URL
    };

    return () => socket.close(); // Cleanup when component unmounts
  }, []);

  return (
    <div className="w-2/4 h-full flex items-center justify-center">
      <div className="w-[98%] h-[96.5%] bg-blue-600 rounded-lg flex flex-col items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="ESP32 Camera Feed"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <>
            <Camera className="text-white w-[30vw] h-[30vw]" />
            <h1 className="text-white font-bold text-[3vw] text-center">
              Waiting for camera feed...
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoScreen;
