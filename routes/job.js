const express = require("express");
const { createJob, getAllJobs } = require("../controllers/job");
const authenticationMiddleware = require("../middlewares/auth");
const router = express.Router();

router.route("/create").post(authenticationMiddleware, createJob);
router.route("/").get(authenticationMiddleware, getAllJobs);

module.exports = router;
