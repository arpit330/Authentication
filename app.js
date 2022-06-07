const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors());
var AuthRoutes = require("./Routes/auth");
app.use('/',AuthRoutes);
// var UserRoutesRouter = require('./routes/UserRoutes');
// app.use('/UserRoutes', UserRoutesRouter);

mongoose
  .connect(process.env.database)
  .then(() => console.log("💻 Mongodb Connected"))
  .catch(err => console.error(err));

let port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log(`server is running on ${port} 😎`);
});











