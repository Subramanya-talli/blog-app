const { Router } = require("express");
const router = Router();
const { newUserSignUp, addNewUser, userSignIn  } = require("../contollers/contoller");

router.get('/signup', newUserSignUp);
router.post('/signup', addNewUser);
router.post('/signin', userSignIn);

module.exports = router;