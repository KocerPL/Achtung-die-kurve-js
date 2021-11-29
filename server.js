const path = require('path');
const express = require('express');
const io = require("socket.io")(5500);
const app = express();
app.listen();
app.use(express.static(path.join(__dirname,'public')))
const PORT =5500 || process.env.PORT;
app.listen(PORT,()=> {console.log("Server running on port: "+PORT)});
io.on("connection",(sock)=>{sock.send("WORKS"); console.log("connected!")})