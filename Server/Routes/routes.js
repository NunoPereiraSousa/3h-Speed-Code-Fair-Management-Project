const express = require('express');
const router = express.Router();
const userController = require("../Controller/users.controller");
const logAndRegController = require("../Controller/log.Controller");
const marketController = require("../Controller/markets.controller");
// const verifyToken = require("../middlewares/Token/verifyToken");
const expressSanitizer = require('express-sanitizer');

router.use(expressSanitizer())

// USERS routers
router.get("/users", userController.getUsers)
router.get("/users/:id", userController.getUserByID)
router.post("/add-users", userController.addUsers)
router.put("/users/update/:id", userController.updateUser)
router.put("/users/delete/:id", userController.deleteUser)

// LOGIN & REGISTER routers
router.post("/login", logAndRegController.logUser)
router.post("/register", logAndRegController.signUpUser)

// MARKET routers
router.get("/markets", marketController.getAllMarket)
router.get("/markets/:id", marketController.getMarketByUserID)
router.put("/markets/update/:id", marketController.updateMarket)
router.get("/markets/delete/:id", marketController.deleteMarket)
router.get("/like-markets", marketController.likeMarket)

module.exports = router