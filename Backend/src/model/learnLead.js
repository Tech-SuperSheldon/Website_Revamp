const mongoose = require("mongoose") ;
const {Schema} = mongoose ;

const learnLeadSchema = new Schema({
    country: {
        type: String,
        required: true,
        enum: ["uk", "au"],
    },
    subject: {
        type: String,
        required: true,
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

const LearnLead = mongoose.model("learnLead", learnLeadSchema) ;

module.exports = LearnLead ;
