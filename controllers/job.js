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

module.exports = {
  createJob,
  getAllJobs,
};
