const User = require('../module/user');


async function newUserSignUp(req, res) {
    return res.render("userSignUp")
}

async function addNewUser(req, res) {
    const { fullName, email, password} =req.body;
    await User.create({
        fullName,
        email,
        password,
    });

    return res.redirect('/');
}

async function userSignIn(req,res)
{
    const {email, password} = req.body;
}



module.exports = {
    newUserSignUp,
    addNewUser,
    userSignIn
}