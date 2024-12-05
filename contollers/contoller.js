const User = require('../module/user');


async function newUserSignUp(req, res) {
    return res.render("userSignUp")
}

async function addNewUser(req, res) {
    const { fullName, email, password} =req.body;
    console.log(req.body)
    await User.create({
        fullName,
        email,
        password,
    });

    return res.redirect('/');
}


module.exports = {
    newUserSignUp,
    addNewUser,
}