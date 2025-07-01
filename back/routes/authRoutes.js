<<<<<<< HEAD
import express from "express";
import { getCurrentUser, loginUser, logoutUser, refreshToken, registerUser } from "../controllers/authController.js";
import { authenticateUser } from "../middleware/authMiddelware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/token", refreshToken);
router.get("/protectroute", authenticateUser);
router.get("/current-user", authenticateUser, getCurrentUser);

export default router; 
=======
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
>>>>>>> 922e4ade9a37c126af1a1c53c83861461e061f36
