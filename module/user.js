const { createHmac, randomBytes } = require('crypto');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    salt: {
        type: String,
    },

    password: {
        type: String,
        required: true,
    },

    profileImageUrl: {
        type: String,
        default: "./Images/user-avatar.png",
    },
    role:
    {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
},{
    timestamps: true
});

userSchema.pre("save", function(next){
    const user = this;
    if(!user.isModified("password")){
        return;
    }

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest('hex');

    this.salt = salt;
    this.password = hashedPassword;

    next();
})

userSchema.static("matchpassword", function(email, password)
{
    const user  = this.findOne({email});
    if(!user)
    {
        return new Error({error: "The user does not exist"});
    }
    
    const salt = user.salt;
    const hashedPassword = user.password;
})

const User = mongoose.model("user", userSchema);



module.exports = User;
