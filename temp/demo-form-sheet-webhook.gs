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
        createdAt: new Date().toISOString()
      })
    }
  };
  var result = doPost(fakeEvent);
  Logger.log(result.getContent());
}
