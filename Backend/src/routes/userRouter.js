const express = require("express") ;
const userRouter = express.Router() ;

const bookDemo = require("../controller/userRegister") ;
const { startLead, completeLead } = require("../controller/demoLeadController") ;

userRouter.post("/bookDemo" , bookDemo) ;

// New "Book a Demo" wizard (grade, mobile, date, time, timezone) — same
// partial-capture-on-phone pattern as /learn-lead.
userRouter.post("/bookDemo/start" , startLead) ;
userRouter.post("/bookDemo/complete" , completeLead) ;

module.exports = userRouter ;