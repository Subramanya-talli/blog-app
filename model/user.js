const { createHmac, randomBytes } = require('crypto');
const { createTokenForUser } = require("../services/authentication")
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


userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    const user = await this.findOne({ email });
    console.log(user)
    if (!user) {
        throw new Error("The user does not exist");
    }
    const { salt, password: hashedPassword } = user;

    const userProvidedHash = createHmac("sha256", salt)
        .update(password)
        .digest('hex');

    if (hashedPassword !== userProvidedHash) {
        throw new Error("Incorrect Password");
    }

    const token = createTokenForUser(user);
    return token;
});


const User = mongoose.model("user", userSchema);



module.exports = User;
