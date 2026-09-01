const express = require("express");
const learnLeadRouter = express.Router();

const { startLead, completeLead } = require("../controller/learnLeadController");

learnLeadRouter.post("/start", startLead);
learnLeadRouter.post("/complete", completeLead);

module.exports = learnLeadRouter;
