const User = require('../model/user');


async function newUserSignUp(req, res) {
    return res.render("userSignUp")
}

async function addNewUser(req, res) {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    });

    return res.redirect('/');
}


async function userSignINGet(req, res) {
    return res.render("signIn");
}

async function userSignIn(req, res) {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render("signIn", { error: "Incorrect Email  or Password" });
    }
}



module.exports = {
    newUserSignUp,
    addNewUser,
    userSignIn,
    userSignINGet,
}