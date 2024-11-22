const ws = new WebSocket("ws://localhost:3001");

// Array to store all connected instances (browsers/tabs)
let browserInstances = [];
// 6. Send the result back to all connected browser instances
ws.onmessage = (event) => {
  browserInstances.forEach((port) => port.postMessage(event.data));
  console.log('message', event.data);
};
onconnect = function (e) {
  console.log('Connected to a new browser instance');
  const port = e.ports[0];
  browserInstances.push(port);

  // 5. Listen for messages from the main script
  port.onmessage = msg => {
    // Forward this message to the ws connection.
    ws.send(JSON.stringify({ data: msg.data }));
  };
};

