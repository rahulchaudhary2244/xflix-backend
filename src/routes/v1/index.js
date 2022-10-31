const router = require("express").Router();
const videoRoute = require("./video.route");

router.use("/videos", videoRoute);

module.exports = router;
