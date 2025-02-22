const WebSocket = require("ws");

// ✅ Create WebSocket Server on port 6002
const wss = new WebSocket.Server({ port: 6002 });

console.log("📡 WebSocket server running on ws://localhost:6002");

wss.on("connection", (ws) => {
  console.log("✅ New client connected!");

  ws.on("message", (message) => {
    console.log(`📷 Received image (${message.length} bytes)`);

    // ✅ Forward image to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => console.log("❌ Client disconnected"));
});
