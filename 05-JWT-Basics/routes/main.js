const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../controllers/main");

router.route("/dashboard").get(dashboard);
router.route("/login").post(login);

module.exports = router;

// this route files is to route the request to the controller
