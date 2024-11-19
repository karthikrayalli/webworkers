let sharedWorker;
const result = document.getElementById('result');

// 1. Feature detection
if (window.SharedWorker) {
  // 2. Create a SharedWorker instance
  sharedWorker = new SharedWorker('sharedWorker.js');
  sharedWorker.port.start(); // start the port

  // 3. Click event to send data to the worker
  document.getElementById('startWorker').onclick = () => {
    const randomNumber = Math.floor(Math.random() * 1000); // Generate random data to send
    sharedWorker.port.postMessage(randomNumber); // send to worker
  };

  // 7. Listen for incoming messages from the worker
  sharedWorker.port.onmessage = function (e) {
    console.log('Message received from worker:', e.data);
    result.innerText = e.data; // Update the result in the current tab
  };
} else {
  console.log('SharedWorker is not supported in this browser.');
}
