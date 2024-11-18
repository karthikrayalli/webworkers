function calculateFibonacci(n) {
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}

// In worker.js
// 4. Implement onmessage
onmessage = function(e) {
  console.log('Message received from main script:', e.data);
  
  // Perform long running tasks here
  // 5. Return result to main thread
  const result = calculateFibonacci(e.data);
  postMessage(result);
}