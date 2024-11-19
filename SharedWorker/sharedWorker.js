// Array to store all connected instances (browsers/tabs)
let browserInstances = [];

// 4. Listen for incoming connections from browser instances
onconnect = function (e) {
  console.log('Connected to a new browser instance');
  const port = e.ports[0];
  browserInstances.push(port);

  // 5. Listen for messages from the main script
  port.onmessage = function (e) {
    const data = +e.data;
    const result = data * 2; // Simple calculation (e.g., multiply by 2)

    // 6. Send the result back to all connected browser instances
    browserInstances.forEach((instance) => {
      instance.postMessage(result);
    });
  };
};
