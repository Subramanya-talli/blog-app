const { Router } = require("express");
const router = Router();
const { newUserSignUp, addNewUser, userSignIn, userSignINGet  } = require("../contollers/contoller");

router.get('/signup', newUserSignUp);
router.post('/signup', addNewUser);
router.get('/signin', userSignINGet);
router.post('/signin', userSignIn);

module.exports = router;