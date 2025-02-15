"use client";
import {
  ArrowBigDown,
  ArrowBigUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Camera,
  Flashlight,
  Hand,
} from "lucide-react";
import { useEffect, useState } from "react";

const SERVER_URL = "ws://51.38.49.42:6001/";

export default function Home() {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(SERVER_URL);
    socket.onopen = () => console.log("Connected to WebSocket");
    socket.onclose = () => console.log("Disconnected from WebSocket");
    setWs(socket);
    return () => socket.close();
  }, []);

  const sendCommand = (command: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(command);
      console.log(`Sent: ${command}`);
    }
  };

  const Forward = () => {
    console.log("FORWARD");
    sendCommand("FORWARD");
  };
  const Backward = () => {
    console.log("BACKWARD");
    sendCommand("BACKWARD");
  };
  const Left = () => {
    console.log("LEFT");
    sendCommand("LEFT");
  };
  const Right = () => {
    console.log("RIGHT");
    sendCommand("RIGHT");
  };
  const Stop = () => {
    console.log("STOP");
    sendCommand("STOP");
  };
  const Light = () => {
    console.log("LIGHT");
    sendCommand("LIGHT");
  };

  const Nothing = () => {};

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex-grow w-full flex justify-center items-center">
        <div className="w-1/4 h-full">
          <Button Icon={ArrowLeft} onPress={Right} onRelease={Stop} />
          <Button
            Icon={Flashlight}
            color="bg-yellow-500"
            onPress={Light}
            onRelease={Nothing}
          />
          <Button Icon={ArrowRight} onPress={Left} onRelease={Stop} />
        </div>
        <VideoScreen />
        <div className="w-1/4 h-full">
          <Button Icon={ArrowUp} onPress={Forward} onRelease={Stop} />
          <Button
            Icon={Hand}
            color="bg-red-500"
            onPress={Stop}
            onRelease={Nothing}
          />
          <Button Icon={ArrowDown} onPress={Backward} onRelease={Stop} />
        </div>
      </div>

      {/* <div className="grid grid-cols-3 gap-4">
        <button className="btn" onClick={() => sendCommand("FORWARD")}>
          ⬆️
        </button>
        <button className="btn" onClick={() => sendCommand("LEFT")}>
          ⬅️
        </button>
        <button className="btn" onClick={() => sendCommand("RIGHT")}>
          ➡️
        </button>
        <button className="btn" onClick={() => sendCommand("BACKWARD")}>
          ⬇️
        </button>
        <button className="btn bg-red-500" onClick={() => sendCommand("STOP")}>
          ⏹ STOP
        </button>
        <button
          className="btn bg-yellow-500"
          onClick={() => sendCommand("LIGHT")}
        >
          💡 LIGHT
        </button>
      </div> */}
    </div>
  );
}

const Button = ({
  Icon,
  color = "bg-blue-600",
  onPress = () => {},
  onRelease = () => {},
}: {
  Icon: any;
  color?: string;
  onPress?: any;
  onRelease?: any;
}) => {
  return (
    <div
      className="w-full h-1/3 flex items-center justify-center"
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onTouchStart={onPress}
      onTouchEnd={onRelease}
    >
      <div
        className={`w-[90%] h-[90%] ${color} rounded-lg flex items-center justify-center !text-white`}
      >
        <Icon className="w-[8vw] h-[8vw] !text-white" />
      </div>
    </div>
  );
};

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
