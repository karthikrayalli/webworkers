let sharedWorker;
const messageList = document.querySelector('ul');

// 1. Feature detection
if (window.SharedWorker) {
  // 2. Create a SharedWorker instance
  sharedWorker = new SharedWorker('sharedWorker.js');
  sharedWorker.port.start(); // start the port

  // 3. Click event to send data to the worker
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('chatInput'); // Select by id now
    console.log("input value:", input.value); // Log the input value

    if (input.value) {
      // Send the chat message to the worker
      sharedWorker.port.postMessage(input.value);
      input.value = ""; // Clear the input field after sending
    }
    input.focus();
  });

  // 7. Listen for incoming messages from the worker
  sharedWorker.port.onmessage = function (e) {
    console.log('Message received from worker:', e.data);
    const li = document.createElement('li');
      li.textContent = e.data;
      messageList.appendChild(li);
  };
} else {
  console.log('SharedWorker is not supported in this browser.');
}
