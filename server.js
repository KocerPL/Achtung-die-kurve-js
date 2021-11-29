const express = require('express');
const app = express();
app.listen();
const PORT =3000 || process.env.PORT;
app.listen(PORT,()=> {console.log("Server running on port"+PORT)});