const Dotenv = require("dotenv")
Dotenv.config()
const express = require("express")
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path") 
const userRouter = require("./routes/route")
const connectDb = require("./connectDb")
app.use(express.json());
const cookieParser = require("cookie-parser");
const checkAuthenticationCookie = require("./middlewares/authentication");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkAuthenticationCookie("token"));


app.get('/', (req,res)=>{
    res.render("home", {
        user: req.user,
    });
});

app.use('/user', userRouter);


connectDb((process.env.MongoDB_URL)).then(()=>{
    console.log("MongoDb is Connected");
})
.catch((err)=>
{
    console.log(err)
})

app.listen(PORT, ()=>{
    console.log(`Server is running in ${PORT}`)
})