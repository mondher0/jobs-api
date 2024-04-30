const express = require("express");
const {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
} = require("../controllers/job");
const authenticationMiddleware = require("../middlewares/auth");
const router = express.Router();

router.route("/create").post(authenticationMiddleware, createJob);
router.route("/").get(authenticationMiddleware, getAllJobs);
router
  .route("/:id")
  .get(authenticationMiddleware, getJob)
  .patch(authenticationMiddleware, updateJob)
  .delete(authenticationMiddleware, deleteJob);

module.exports = router;
