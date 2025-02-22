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
import VideoScreen from "./VideoScreen";

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

  useEffect(() => {
    const keyMappings = [
      { key: "z", onPress: Forward, onRelease: Stop },
      { key: "s", onPress: Backward, onRelease: Stop },
      { key: "d", onPress: Left, onRelease: Stop },
      { key: "q", onPress: Right, onRelease: Stop },
      { key: "a", onPress: Light, onRelease: Light },
      { key: "e", onPress: Stop, onRelease: Stop },
    ];

    const pressedKeys = new Set();

    const handleKeyDown = (event: any) => {
      const keyObj = keyMappings.find((k) => k.key === event.key.toLowerCase());
      if (keyObj && !pressedKeys.has(event.key)) {
        pressedKeys.add(event.key);
        console.log("Key Pressed:", event.key);
        if (keyObj.onPress) keyObj.onPress();
      }
    };
    const handleKeyUp = (event: any) => {
      const keyObj = keyMappings.find((k) => k.key === event.key.toLowerCase());
      if (keyObj) {
        pressedKeys.delete(event.key);
        console.log("Key Released:", event.key);
        if (keyObj.onRelease) keyObj.onRelease();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [ws]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white">
      <div className="flex-grow w-full flex justify-center items-center">
        <div className="w-1/4 h-full">
          <Button Icon={ArrowLeft} onPress={Right} onRelease={Stop} />
          <ButtonOneClick
            Icon={Flashlight}
            color="bg-yellow-500"
            onPress={Light}
          />
          <Button Icon={ArrowRight} onPress={Left} onRelease={Stop} />
        </div>
        <VideoScreen />
        <div className="w-1/4 h-full">
          <Button Icon={ArrowUp} onPress={Forward} onRelease={Stop} />
          <ButtonOneClick Icon={Hand} color="bg-red-500" onPress={Stop} />
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

const ButtonOneClick = ({
  Icon,
  color = "bg-blue-600",
  onPress = () => {},
}: {
  Icon: any;
  color?: string;
  onPress?: any;
}) => {
  return (
    <div
      className="w-full h-1/3 flex items-center justify-center"
      onClick={onPress}
    >
      <div
        className={`w-[90%] h-[90%] ${color} rounded-lg flex items-center justify-center !text-white`}
      >
        <Icon className="w-[8vw] h-[8vw] !text-white" />
      </div>
    </div>
  );
};
