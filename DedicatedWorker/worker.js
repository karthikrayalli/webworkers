let port1, port2;
addEventListener('connect', (event) => {
  const port = event.ports[0];
  port.start();
  port.addEventListener('message', (mes) => {
    switch (mes.data.command) {
      case 'store_port':
        if (mes.data.scriptNo === 1) {
          port1 = port;
        } else {
          port2 = port;
        }
        break;
      case 'get_data':
        if (mes.data.scriptNo === 1) {
          port.postMessage('SCRIPT 1');
        } else {
          port.postMessage('SCRIPT 2');
        }
        break;
      case 'send_data':
        if (mes.data.scriptNo === 1) {
          port2.postMessage(mes.data.text);
        } else {
          port1.postMessage(mes.data.text);
        }
        break;
    }
  });
});
document.querySelector('#calculateWithoutWorker').addEventListener('click', function () {
  const result = calculateFibonacci(42); // This might take a while
  console.log(`Result without worker: ${result}`);
});

document.querySelector('#sayHello').addEventListener('click', function () {
  console.log('Hello there!');
});

document.querySelector('#calculateWithWorker').addEventListener('click', function () {
  const worker = new Worker('fibonacciWorker.js');
  worker.onmessage = function (event) {
    console.log(event.data);
  };
  worker.postMessage(40);
});

function calculateFibonacci(n) {
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}
