var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');
var authMiddelware = require('../middlwares/authMiddlware');

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);
router.post("/token", authController.refreshToken);
router.get("/protectroute", authMiddelware.authenticateUser);
router.get("/current-user", authMiddelware.authenticateUser, authController.getCurrentUser);

module.exports = router;