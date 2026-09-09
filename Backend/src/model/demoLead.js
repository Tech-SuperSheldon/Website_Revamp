const mongoose = require("mongoose") ;
const {Schema} = mongoose ;

const demoLeadSchema = new Schema({
    // Which site the booking came from. "global" is a real market, not a
    // fallback: those leads go to the "Demo Bookings" tab, while uk/au go to
    // the "UK"/"Aus" tabs.
    market: {
        type: String,
        required: true,
        enum: ["global", "uk", "au"],
    },
    // Which of the three academies the visitor picked, by product name —
    // "Tuition Academy" | "Exam Academy" | "Skill Academy".
    academy: {
        type: String,
    },
    // That academy's sub-category: a subject, an exam or a skill.
    subject: {
        type: String,
    },
    grade: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    timezone: {
        type: String,
    },
    status: {
        type: String,
        enum: ["partial", "complete"],
        default: "partial",
    },
    utm_source: { type: String },
    utm_medium: { type: String },
    utm_campaign: { type: String },
    utm_content: { type: String },
    utm_term: { type: String },
},{
    timestamps: true
})

const DemoLead = mongoose.model("demoLead", demoLeadSchema) ;

module.exports = DemoLead ;
