const JWT = require("jsonwebtoken");

const secretKey = process.env.Secret_Key;

function createTokenForUser(user)
{
    const payLoad = {
        _id: user._id,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role
    }

    const token = JWT.sign(payLoad, secretKey);

    return token;
} 


function validateToken(token)
{
    const payload = JWT.verify(token, secretKey);

    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken
};