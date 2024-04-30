const BadRequest = require("../errors/bad-request");
const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");

// create job
const createJob = async (req, res) => {
  const { title, company, position, description } = req.body;
  if (!title || !company || !position || !description) {
    throw new BadRequest("Please provide all fields");
  }
  const job = await Job.create({
    title,
    company,
    position,
    description,
    user: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Job created successfully",
    job,
  });
};

// get all jobs
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ user: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ success: true, jobs });
};

// get single job
const getJob = async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id, user: req.user.userId });
  if (!job) {
    throw new BadRequest("Job not found", StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ success: true, job });
};

// update job
const updateJob = async (req, res) => {
  const { title, company, position, description, status } = req.body;
  if (!title || !company || !position || !description || !status) {
    throw new BadRequest("Please provide all fields");
  }
  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, user: req.user.userId },
    req.body,
    { new: true, runValidators: true },
  );
  if (!job) {
    throw new BadRequest("Job not found", StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ success: true, job });
};

// delete job
const deleteJob = async (req, res) => {
  const job = await Job.findOneAndDelete({
    _id: req.params.id,
    user: req.user.userId,
  });
  if (!job) {
    throw new BadRequest("Job not found", StatusCodes.NOT_FOUND);
  }
  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "Job deleted successfully" });
};

module.exports = {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
};
