const DemoLead = require("../model/demoLead");
const { sendDemoLeadToSheet } = require("../utils/sheetsService");

const REQUIRED_START_FIELDS = ["market", "grade", "mobile"];

const validateStart = (data) => {
    const isAllowed = REQUIRED_START_FIELDS.every((key) => Object.keys(data).includes(key) && data[key]);
    if (!isAllowed) throw new Error("Some field is missing");
    if (!["global", "uk", "au"].includes(data.market)) throw new Error("Invalid market");
};

// Step 1: grade + phone captured -> upsert a partial lead and notify the sheet
// immediately, even if the visitor never finishes the rest of the form.
const startLead = async (req, res) => {
    try {
        validateStart(req.body);

        const { market, academy, subject, grade, mobile, utm_source, utm_medium, utm_campaign, utm_content, utm_term } = req.body;

        // Keyed on subject as well as mobile (like the learn flow): the wizard
        // now asks which academy + subject first, so one parent booking two
        // different subjects is two leads, not one overwriting the other.
        const lead = await DemoLead.findOneAndUpdate(
            { mobile, market, subject: subject || "", status: "partial" },
            {
                market, academy, subject, grade, mobile,
                utm_source, utm_medium, utm_campaign, utm_content, utm_term,
                status: "partial",
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        sendDemoLeadToSheet({ stage: "partial", ...lead.toObject() }).catch((err) => {
            console.error("Failed to send demo lead (partial) to Google Sheet:", err);
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

        const { market, academy, subject, grade, mobile, date, time, timezone, utm_source, utm_medium, utm_campaign, utm_content, utm_term } = req.body;

        const lead = await DemoLead.findOneAndUpdate(
            { mobile, market, subject: subject || "" },
            {
                market, academy, subject, grade, mobile, date, time, timezone,
                utm_source, utm_medium, utm_campaign, utm_content, utm_term,
                status: "complete",
            },
            { new: true, upsert: true, setDefaultsOnInsert: true, sort: { createdAt: -1 } }
        );

        sendDemoLeadToSheet({ stage: "complete", ...lead.toObject() }).catch((err) => {
            console.error("Failed to send demo lead (complete) to Google Sheet:", err);
        });

        res.status(200).json({ status: 200, message: "Booking confirmed" });
    } catch (err) {
        res.status(400).send("Error: " + err);
    }
};

module.exports = { startLead, completeLead };
