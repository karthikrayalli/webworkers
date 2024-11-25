const ws = new WebSocket("ws://localhost:3001");

let browserInstances = [];
ws.onmessage = (event) => {
  browserInstances.forEach((port) => port.postMessage(event.data));
};
onconnect = function (e) {
  const port = e.ports[0];
  browserInstances.push(port);

  port.onmessage = msg => {
    ws.send(msg.data)
  };
};

