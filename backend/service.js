const { workerData, parentPort } = require('worker_threads')
try{
function calculateFib(n) {
    if (n == 0 || n == 1)
      return n;
    else
      return calculateFib(n - 1) + calculateFib(n - 2);
  }
parentPort.postMessage({ function: "fib",input: workerData,data: calculateFib(workerData) })
}
catch(error){
    console.log("error in service file", errror)
}