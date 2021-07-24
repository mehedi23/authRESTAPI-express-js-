const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

mongoose.connect('mongodb://localhost:27017/todo_db', 
    { 
        useNewUrlParser: true , 
        useUnifiedTopology: true 
    })
    .then(
        ()=> {
            console.log("database connected")
        }
    );

const routerAuth = require("./route/auth");
const post_user = require("./route/post")

// middleware
app.use(express.json());

// router middleware
app.use("/user" , routerAuth);
app.use("/post" , post_user);

app.get('/', (req , res) => {
    res.send("home");
})

app.listen(3000)