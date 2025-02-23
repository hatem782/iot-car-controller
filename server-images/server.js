const WebSocket = require("ws");

// Create WebSocket Server on port 6002
const wss = new WebSocket.Server({ port: 6002 });

console.log("📡 WebSocket server running on ws://localhost:6002");

const clients = new Set(); // Stores only Next.js clients (not ESP32)

wss.on("connection", (ws) => {
  console.log("✅ New client connected!");

  ws.on("message", (message) => {
    try {
      const msg = message.toString(); // This might fail for binary data

      if (msg === "i am client") {
        console.log("🖥️ Next.js client registered!");
        clients.add(ws); // Store Next.js clients only
        return;
      }

      // Forward image only to Next.js clients
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message); // Send raw message (binary or text)
        }
      });
    } catch (err) {
      console.error("⚠️ Error processing message:", err.message);
    }
  });

  ws.on("error", (err) => {
    console.error("⚠️ WebSocket error:", err.message);
  });

  ws.on("close", () => {
    console.log("❌ Client disconnected");
    clients.delete(ws); // Remove disconnected clients
  });
});

// Handle server-level errors
wss.on("error", (err) => {
  console.error("⚠️ WebSocket server error:", err.message);
});
