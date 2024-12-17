const { validateToken } = require("../services/authentication")

function checkAuthenticationCookie(cookieName)
{
    return (req,res,next) =>
    {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            next()
        }
        try {
            const userPayLoad = validateToken(tokenCookieValue);
            req.user = userPayLoad;
        } catch (error) {
            
        }

        return next();
    }
}

module.exports = checkAuthenticationCookie;