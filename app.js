const Dotenv = require("dotenv")
Dotenv.config()
const express = require("express")
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path") 


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get('/', (req,res)=>{
    res.render("home");
});

app.listen(PORT, ()=>{
    console.log(`Server is running in ${PORT}`)
})