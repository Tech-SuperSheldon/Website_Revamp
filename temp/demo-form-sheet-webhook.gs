// Paste this into Extensions > Apps Script for the target Google Sheet.
// Deploy > New deployment > type: Web app
//   Execute as: Me
//   Who has access: Anyone
// Copy the deployment URL into Backend/.env as GOOGLE_SHEET_WEBHOOK_URL

const SHEET_NAME = "Demo Leads"; // change if your tab is named differently

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

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
