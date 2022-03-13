const express = require("express");
const home = require("./home");
const user = require("./user");
const song = require("./song");
const session = require("./session");

const router = express();

router.use("/", home);
router.use("/", user);
router.use("/", song);
router.use("/", session);

module.exports = router;
