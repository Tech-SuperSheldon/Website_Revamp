const LearnLead = require("../model/learnLead");
const { sendLearnLeadToSheet } = require("../utils/sheetsService");

const REQUIRED_START_FIELDS = ["country", "subject", "grade", "mobile"];

const validateStart = (data) => {
    const isAllowed = REQUIRED_START_FIELDS.every((key) => Object.keys(data).includes(key) && data[key]);
    if (!isAllowed) throw new Error("Some field is missing");
    if (!["uk", "au"].includes(data.country)) throw new Error("Invalid country");
};

// Step 1: grade + phone captured -> upsert a partial lead and notify the sheet
// immediately, even if the visitor never finishes the rest of the form.
const startLead = async (req, res) => {
    try {
        validateStart(req.body);

        const { country, subject, grade, mobile, utm_source, utm_medium, utm_campaign, utm_content, utm_term } = req.body;

        const lead = await LearnLead.findOneAndUpdate(
            { mobile, subject, country, status: "partial" },
            {
                country, subject, grade, mobile,
                utm_source, utm_medium, utm_campaign, utm_content, utm_term,
                status: "partial",
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        sendLearnLeadToSheet({ stage: "partial", ...lead.toObject() }).catch((err) => {
            console.error("Failed to send learn lead (partial) to Google Sheet:", err);
        });

        res.status(200).json({ status: 200, message: "Lead captured" });
    } catch (err) {
        res.status(400).send("Error: " + err);
    }
};

// Step 2: date/time/timezone captured -> complete the same lead (does not
// create a duplicate row in the sheet).
const completeLead = async (req, res) => {
    try {
        validateStart(req.body);

        const { country, subject, grade, mobile, date, time, timezone, utm_source, utm_medium, utm_campaign, utm_content, utm_term } = req.body;

        const lead = await LearnLead.findOneAndUpdate(
            { mobile, subject, country },
            {
                country, subject, grade, mobile, date, time, timezone,
                utm_source, utm_medium, utm_campaign, utm_content, utm_term,
                status: "complete",
            },
            { new: true, upsert: true, setDefaultsOnInsert: true, sort: { createdAt: -1 } }
        );

        sendLearnLeadToSheet({ stage: "complete", ...lead.toObject() }).catch((err) => {
            console.error("Failed to send learn lead (complete) to Google Sheet:", err);
        });

        res.status(200).json({ status: 200, message: "Booking confirmed" });
    } catch (err) {
        res.status(400).send("Error: " + err);
    }
};

module.exports = { startLead, completeLead };
