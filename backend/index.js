const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors=require("cors")
const { Worker } = require('worker_threads')
const port = process.env.PORT || 4001;
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,           
  optionSuccessStatus:200
}
const app = express();
app.use(cors(corsOptions))
const server = http.createServer(app);

const io = socketIo(server);
async function runService(workerData) {
  return new Promise((resolve, reject) => {
    console.log("worker dta",workerData)
    const worker = new Worker('./service.js', { workerData });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })
  })
}


io.on("connection", async(socket) => {
  console.log("New client connected");
  socket.on("fib",async(input)=>{
    console.log(input, typeof input)
    const value=await runService(input)
    console.log(value)
    socket.emit("fibout",value)
  })
  socket.on("error", (err) => {
      socket.disconnect();
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});



server.listen(port, () => console.log(`Listening on port ${port}`));