// Paste this into Extensions > Apps Script for the target Google Sheet.
// Deploy > New deployment > type: Web app
//   Execute as: Me
//   Who has access: Anyone
// Copy the deployment URL into Backend/.env as GOOGLE_SHEET_WEBHOOK_URL

const SHEET_NAME = "Demo Leads"; // change if your tab is named differently

// Tabs used by the "Learn [Subject]" multi-step lead form (formType: "learn").
const LEARN_SHEET_NAMES = { uk: "UK", au: "Aus" };
const LEARN_HEADERS = [
  "Created At", "Updated At", "Status", "Subject", "Grade", "Mobile",
  "Date", "Time", "Timezone",
  "UTM Source", "UTM Medium", "UTM Campaign", "UTM Content", "UTM Term",
];

// Tab used by the new "Book a Demo" wizard (formType: "demo"). Kept separate
// from the legacy SHEET_NAME ("Demo Leads") below because that tab's header
// row still has the old fullName/email/country/subject columns — mixing the
// new grade/mobile/date/time/timezone shape into it would misalign columns.
const DEMO_SHEET_NAME = "Demo Bookings";
const DEMO_HEADERS = [
  "Created At", "Updated At", "Status", "Market", "Grade", "Mobile",
  "Date", "Time", "Timezone",
  "UTM Source", "UTM Medium", "UTM Campaign", "UTM Content", "UTM Term",
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.formType === "learn") {
      return handleLearnLead(data);
    }

    if (data.formType === "demo") {
      return handleDemoLead(data);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        "Created At",
        "Full Name",
        "Email",
        "Mobile",
        "Country",
        "Grade",
        "Subject",
        "UTM Source",
        "UTM Medium",
        "UTM Campaign",
        "UTM Content",
        "UTM Term",
      ]);
    }

    sheet.appendRow([
      data.createdAt ? new Date(data.createdAt) : new Date(),
      data.fullName || "",
      data.email || "",
      data.mobile || "",
      data.country || "",
      data.grade || "",
      data.subject || "",
      data.utm_source || "",
      data.utm_medium || "",
      data.utm_campaign || "",
      data.utm_content || "",
      data.utm_term || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handles "Learn [Subject]" lead submissions. Routes into the "UK"/"Aus" tab
// based on data.country, and upserts by Mobile+Subject so that the partial
// row created when the visitor enters their phone number gets updated in
// place (instead of duplicated) once they finish the form.
function handleLearnLead(data) {
  const tabName = LEARN_SHEET_NAMES[String(data.country || "").toLowerCase()];
  if (!tabName) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", error: "Unknown country: " + data.country }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(tabName);
  if (!sheet) {
    sheet = ss.insertSheet(tabName);
    sheet.appendRow(LEARN_HEADERS);
  }

  const now = new Date();
  const mobile = data.mobile || "";
  const subject = data.subject || "";
  const status = data.stage === "complete" ? "Complete" : "Partial";

  // Look for an existing, not-yet-complete row for this Mobile+Subject to
  // update in place rather than appending a duplicate.
  const lastRow = sheet.getLastRow();
  let targetRow = -1;
  if (lastRow > 1) {
    const values = sheet.getRange(2, 1, lastRow - 1, LEARN_HEADERS.length).getValues();
    for (let i = values.length - 1; i >= 0; i--) {
      const row = values[i];
      const rowMobile = row[5];
      const rowSubject = row[3];
      const rowStatus = row[2];
      if (rowMobile === mobile && rowSubject === subject && rowStatus !== "Complete") {
        targetRow = i + 2; // account for header row + 0-index
        break;
      }
    }
  }

  const rowValues = [
    null, // Created At — filled below, either kept or set on insert
    now, // Updated At
    status,
    subject,
    data.grade || "",
    mobile,
    data.date || "",
    data.time || "",
    data.timezone || "",
    data.utm_source || "",
    data.utm_medium || "",
    data.utm_campaign || "",
    data.utm_content || "",
    data.utm_term || "",
  ];

  if (targetRow > 0) {
    // Keep the original Created At, update everything else.
    const createdAt = sheet.getRange(targetRow, 1).getValue();
    rowValues[0] = createdAt;
    sheet.getRange(targetRow, 1, 1, LEARN_HEADERS.length).setValues([rowValues]);
  } else {
    rowValues[0] = data.createdAt ? new Date(data.createdAt) : now;
    sheet.appendRow(rowValues);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Handles "Book a Demo" wizard submissions (formType: "demo") into the
// "Demo Bookings" tab. Upserts by Mobile so the partial row created when the
// visitor enters their phone number gets updated in place (instead of
// duplicated) once they finish picking a date/time/timezone.
function handleDemoLead(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(DEMO_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(DEMO_SHEET_NAME);
    sheet.appendRow(DEMO_HEADERS);
  }

  const now = new Date();
  const mobile = data.mobile || "";
  const status = data.stage === "complete" ? "Complete" : "Partial";

  // Look for an existing, not-yet-complete row for this Mobile to update in
  // place rather than appending a duplicate.
  const lastRow = sheet.getLastRow();
  let targetRow = -1;
  if (lastRow > 1) {
    const values = sheet.getRange(2, 1, lastRow - 1, DEMO_HEADERS.length).getValues();
    for (let i = values.length - 1; i >= 0; i--) {
      const row = values[i];
      const rowMobile = row[5];
      const rowStatus = row[2];
      if (rowMobile === mobile && rowStatus !== "Complete") {
        targetRow = i + 2; // account for header row + 0-index
        break;
      }
    }
  }

  const rowValues = [
    null, // Created At — filled below, either kept or set on insert
    now, // Updated At
    status,
    data.market || "",
    data.grade || "",
    mobile,
    data.date || "",
    data.time || "",
    data.timezone || "",
    data.utm_source || "",
    data.utm_medium || "",
    data.utm_campaign || "",
    data.utm_content || "",
    data.utm_term || "",
  ];

  if (targetRow > 0) {
    // Keep the original Created At, update everything else.
    const createdAt = sheet.getRange(targetRow, 1).getValue();
    rowValues[0] = createdAt;
    sheet.getRange(targetRow, 1, 1, DEMO_HEADERS.length).setValues([rowValues]);
  } else {
    rowValues[0] = data.createdAt ? new Date(data.createdAt) : now;
    sheet.appendRow(rowValues);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// --- one-off helper: run this once from the Apps Script editor (select
// "addUtmColumns" in the function dropdown, then click Run) to add the 5
// UTM header columns to an EXISTING "Demo Leads" sheet that predates them.
// Safe to run more than once — it skips any header that's already there.
function addUtmColumns() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    Logger.log('Sheet "' + SHEET_NAME + '" not found.');
    return;
  }

  const lastCol = sheet.getLastColumn();
  const headerRange = sheet.getRange(1, 1, 1, Math.max(lastCol, 1));
  const headers = lastCol > 0 ? headerRange.getValues()[0] : [];

  const utmHeaders = [
    "UTM Source",
    "UTM Medium",
    "UTM Campaign",
    "UTM Content",
    "UTM Term",
  ];

  const missing = utmHeaders.filter((h) => headers.indexOf(h) === -1);
  if (missing.length === 0) {
    Logger.log("All UTM columns already present, nothing to do.");
    return;
  }

  sheet.getRange(1, lastCol + 1, 1, missing.length).setValues([missing]);
  Logger.log("Added columns: " + missing.join(", "));
}

// --- temporary test helper, delete after debugging ---
function testDoPost() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        fullName: "Test User",
        email: "test@example.com",
        mobile: "911234567890",
        country: "India",
        grade: "5",
        subject: "Math",
        utm_source: "google",
        utm_medium: "cpc",
        utm_campaign: "summer_sale",
        utm_content: "blue_button",
        utm_term: "online tutoring",
        createdAt: new Date().toISOString()
      })
    }
  };
  var result = doPost(fakeEvent);
  Logger.log(result.getContent());
}

// --- temporary test helper for the new "Book a Demo" wizard, delete after debugging ---
function testDoPostDemo() {
  var partialEvent = {
    postData: {
      contents: JSON.stringify({
        formType: "demo",
        stage: "partial",
        market: "uk",
        grade: "Grade 5",
        mobile: "+447123456789",
        utm_source: "google",
        utm_medium: "cpc",
        createdAt: new Date().toISOString()
      })
    }
  };
  Logger.log(doPost(partialEvent).getContent());

  var completeEvent = {
    postData: {
      contents: JSON.stringify({
        formType: "demo",
        stage: "complete",
        market: "uk",
        grade: "Grade 5",
        mobile: "+447123456789",
        date: "2026-09-10",
        time: "3:00 PM",
        timezone: "Europe/London",
        utm_source: "google",
        utm_medium: "cpc",
        createdAt: new Date().toISOString()
      })
    }
  };
  Logger.log(doPost(completeEvent).getContent());
}
