require("dotenv").config();
 
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRouter = require("./routes/user")

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"))

mongoose
    .connect(process.env.MONGO_URL)
    .then((e) => console.log("MongoDB Connected"));


app.use("/user" , userRouter);
app.get("/" , (req,res)=>{
    res.render("home");
})

app.listen(PORT , ()=>console.log(`connected at ${PORT}`));
