const { Router } = require("express");
const router = Router();
const { newUserSignUp, addNewUser  } = require("../contollers/contoller")

router.get('/signup', newUserSignUp)
router.post('/signup', addNewUser)

module.exports = router;