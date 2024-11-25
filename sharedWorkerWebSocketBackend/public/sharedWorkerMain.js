let sharedWorker;
const messageList = document.querySelector('ul');

// 1. Feature detection
if (window.SharedWorker) {
  // 2. Create a SharedWorker instance
  sharedWorker = new SharedWorker('sharedWorker.js');
  sharedWorker.port.start(); // start the port

  // 3. Click event to send data to the worker
  document.getElementById('sendButton').addEventListener('click', () => {
    sharedWorker.port.postMessage("fetch_orders_data");
  });

  // 7. Listen for incoming messages from the worker
  sharedWorker.port.onmessage = function (e) {
    console.log('Message received from worker:', e.data);
    const li = document.createElement('li');
      li.textContent = e.data;
      // li.textContent = `Order ID: ${e.data.id}, Customer: ${e.data.customer}, Amount: ${e.data.amount}`;
      messageList.appendChild(li);
  };
} else {
  console.log('SharedWorker is not supported in this browser.');
}
