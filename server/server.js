const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 6001 });

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);

    // Broadcast the command to all connected clients (ESP32)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => console.log("Client disconnected"));
});

console.log("WebSocket server running on 6001");
