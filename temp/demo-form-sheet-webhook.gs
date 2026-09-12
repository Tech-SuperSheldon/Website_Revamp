// Paste this into Extensions > Apps Script for the target Google Sheet.
// Deploy > New deployment > type: Web app
//   Execute as: Me
//   Who has access: Anyone
// Copy the deployment URL into Backend/.env as GOOGLE_SHEET_WEBHOOK_URL
//
// Tab routing, for both the "Learn [Subject]" form and the "Book a Demo"
// wizard:
//   market/country "uk"     -> "UK"
//   market/country "au"     -> "Aus"
//   market/country "global" -> "Demo Bookings"
// Every tab holds both form types side by side, which is why they all carry
// a "Form" column — see MARKET_HEADERS / DEMO_HEADERS. A "Source" column
// further says which page/flow within the Learn form sent the row (the
// standalone "Learn [Subject]" pages vs. an academy page's trial modal), with
// "Academy" filled in for the latter. Run addDemoColumnsToMarketTabs(),
// addFormColumnToDemoBookings() and addSourceColumnToAllTabs() once on an
// existing sheet (see the bottom of this file) before deploying this version.

const SHEET_NAME = "Demo Leads"; // legacy tab, kept for the old contact form

// Per-market tabs, shared by the learn form and the demo wizard.
const MARKET_SHEET_NAMES = { uk: "UK", au: "Aus" };

// Because the two forms now share these tabs, "Form" says which wizard a row
// came from, and it is part of the upsert key: a learn lead and a demo lead
// from the same parent for the same subject are two different bookings and
// must not overwrite each other. "Source" says which page/flow within that
// wizard the row came from (e.g. a Learn row's "Subject Page" vs "Academy
// Trial"). "Academy" is filled by the demo wizard, and by a Learn row whose
// Source is "Academy Trial".
const MARKET_HEADERS = [
  "Created At", "Updated At", "Form", "Status", "Source", "Academy", "Subject", "Grade", "Mobile",
  "Date", "Time", "Timezone",
  "UTM Source", "UTM Medium", "UTM Campaign", "UTM Content", "UTM Term",
];

const MARKET_COL = {
  form: MARKET_HEADERS.indexOf("Form"),
  status: MARKET_HEADERS.indexOf("Status"),
  subject: MARKET_HEADERS.indexOf("Subject"),
  mobile: MARKET_HEADERS.indexOf("Mobile"),
};

// Tab for bookings made on the global site — i.e. everything that is neither
// /uk nor /au. Shared by both the learn form and the demo wizard (hence the
// "Form" and "Source" columns, same idea as MARKET_HEADERS). Kept separate
// from the legacy SHEET_NAME ("Demo Leads") because that tab's header row
// still has the old fullName/email/country columns.
const GLOBAL_DEMO_SHEET_NAME = "Demo Bookings";
const DEMO_HEADERS = [
  "Created At", "Updated At", "Form", "Status", "Source", "Market", "Academy", "Subject", "Grade", "Mobile",
  "Date", "Time", "Timezone",
  "UTM Source", "UTM Medium", "UTM Campaign", "UTM Content", "UTM Term",
];

const DEMO_COL = {
  form: DEMO_HEADERS.indexOf("Form"),
  status: DEMO_HEADERS.indexOf("Status"),
  subject: DEMO_HEADERS.indexOf("Subject"),
  mobile: DEMO_HEADERS.indexOf("Mobile"),
};

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

    return ok();
  } catch (err) {
    return fail(err.message);
  }
}

function ok() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function fail(message) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "error", error: message }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Phone numbers arrive as "+447123456789". A leading "+" makes Sheets store
// the cell as the NUMBER 447123456789, so comparing the raw incoming string
// against the cell never matched and every visitor got a duplicate Partial row
// next to their Complete one. Both sides go through this, and it is also what
// gets written, so the stored value stays digits-only and stable.
function normalizeMobile(value) {
  return String(value === null || value === undefined ? "" : value).replace(/\D/g, "");
}

function sheetWithHeaders(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
  }
  return sheet;
}

/**
 * Update the visitor's existing not-yet-complete row in place, or append a new
 * one. `matchIndexes` are the 0-based columns that identify the same booking
 * (mobile + subject, plus the form type on the shared market tabs).
 * rowValues[0] (Created At) is filled in here: kept on update, set on insert.
 */
function upsertLeadRow(sheet, headers, rowValues, matchIndexes, statusIndex, mobileIndex, createdAt) {
  const lastRow = sheet.getLastRow();
  let targetRow = -1;

  if (lastRow > 1) {
    const values = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
    for (let i = values.length - 1; i >= 0; i--) {
      const row = values[i];
      if (row[statusIndex] === "Complete") continue;
      const matches = matchIndexes.every(function (idx) {
        const a = idx === mobileIndex ? normalizeMobile(row[idx]) : String(row[idx] || "");
        const b = idx === mobileIndex ? normalizeMobile(rowValues[idx]) : String(rowValues[idx] || "");
        return a === b;
      });
      if (matches) {
        targetRow = i + 2; // account for header row + 0-index
        break;
      }
    }
  }

  if (targetRow > 0) {
    // Keep the original Created At, update everything else.
    rowValues[0] = sheet.getRange(targetRow, 1).getValue();
    sheet.getRange(targetRow, 1, 1, headers.length).setValues([rowValues]);
  } else {
    rowValues[0] = createdAt;
    sheet.appendRow(rowValues);
  }
}

// Handles "Learn [Subject]" lead submissions.
//   country "uk" -> "UK" tab, "au" -> "Aus" tab (shared with the demo wizard),
//   anything else (the global site) -> "Demo Bookings" (shared with global
//   demo leads, distinguished there by the "Form" column too).
function handleLearnLead(data) {
  const tabName = MARKET_SHEET_NAMES[String(data.country || "").toLowerCase()];
  const now = new Date();
  const createdAt = data.createdAt ? new Date(data.createdAt) : now;
  const status = data.stage === "complete" ? "Complete" : "Partial";

  if (tabName) {
    const sheet = sheetWithHeaders(tabName, MARKET_HEADERS);
    const rowValues = [
      null, // Created At — filled by upsertLeadRow
      now, // Updated At
      "Learn",
      status,
      data.source || "Subject Page",
      data.academy || "",
      data.subject || "",
      data.grade || "",
      normalizeMobile(data.mobile),
      data.date || "",
      data.time || "",
      data.timezone || "",
      data.utm_source || "",
      data.utm_medium || "",
      data.utm_campaign || "",
      data.utm_content || "",
      data.utm_term || "",
    ];

    upsertLeadRow(
      sheet,
      MARKET_HEADERS,
      rowValues,
      [MARKET_COL.form, MARKET_COL.mobile, MARKET_COL.subject],
      MARKET_COL.status,
      MARKET_COL.mobile,
      createdAt
    );

    return ok();
  }

  const sheet = sheetWithHeaders(GLOBAL_DEMO_SHEET_NAME, DEMO_HEADERS);
  const rowValues = [
    null, // Created At — filled by upsertLeadRow
    now, // Updated At
    "Learn",
    status,
    data.source || "Subject Page",
    data.country || "global",
    data.academy || "",
    data.subject || "",
    data.grade || "",
    normalizeMobile(data.mobile),
    data.date || "",
    data.time || "",
    data.timezone || "",
    data.utm_source || "",
    data.utm_medium || "",
    data.utm_campaign || "",
    data.utm_content || "",
    data.utm_term || "",
  ];

  upsertLeadRow(
    sheet,
    DEMO_HEADERS,
    rowValues,
    [DEMO_COL.form, DEMO_COL.mobile, DEMO_COL.subject],
    DEMO_COL.status,
    DEMO_COL.mobile,
    createdAt
  );

  return ok();
}

// Handles "Book a Demo" wizard submissions (formType: "demo").
//   market "uk" -> "UK" tab, "au" -> "Aus" tab (shared with the learn form),
//   anything else (the global site) -> "Demo Bookings".
// Upserts by mobile + subject so the partial row created when the visitor
// enters their phone number is updated in place once they pick a date/time,
// instead of being duplicated. Subject is part of the key so one parent
// booking two different subjects gets two rows.
function handleDemoLead(data) {
  const market = String(data.market || "").toLowerCase();
  const tabName = MARKET_SHEET_NAMES[market];
  const now = new Date();
  const createdAt = data.createdAt ? new Date(data.createdAt) : now;
  const status = data.stage === "complete" ? "Complete" : "Partial";

  if (tabName) {
    const sheet = sheetWithHeaders(tabName, MARKET_HEADERS);
    // No Market column here — the tab is the market.
    const rowValues = [
      null, // Created At — filled by upsertLeadRow
      now, // Updated At
      "Demo",
      status,
      data.source || "Demo Wizard",
      data.academy || "",
      data.subject || "",
      data.grade || "",
      normalizeMobile(data.mobile),
      data.date || "",
      data.time || "",
      data.timezone || "",
      data.utm_source || "",
      data.utm_medium || "",
      data.utm_campaign || "",
      data.utm_content || "",
      data.utm_term || "",
    ];

    upsertLeadRow(
      sheet,
      MARKET_HEADERS,
      rowValues,
      [MARKET_COL.form, MARKET_COL.mobile, MARKET_COL.subject],
      MARKET_COL.status,
      MARKET_COL.mobile,
      createdAt
    );

    return ok();
  }

  const sheet = sheetWithHeaders(GLOBAL_DEMO_SHEET_NAME, DEMO_HEADERS);
  const rowValues = [
    null, // Created At — filled by upsertLeadRow
    now, // Updated At
    "Demo",
    status,
    data.source || "Demo Wizard",
    market || "global",
    data.academy || "",
    data.subject || "",
    data.grade || "",
    normalizeMobile(data.mobile),
    data.date || "",
    data.time || "",
    data.timezone || "",
    data.utm_source || "",
    data.utm_medium || "",
    data.utm_campaign || "",
    data.utm_content || "",
    data.utm_term || "",
  ];

  upsertLeadRow(
    sheet,
    DEMO_HEADERS,
    rowValues,
    [DEMO_COL.form, DEMO_COL.mobile, DEMO_COL.subject],
    DEMO_COL.status,
    DEMO_COL.mobile,
    createdAt
  );

  return ok();
}

// --- one-off migration: run this ONCE from the Apps Script editor (select
// "addDemoColumnsToMarketTabs" in the function dropdown, then click Run)
// BEFORE deploying this version.
//
// The "UK" and "Aus" tabs were built for the learn form only, so they have no
// "Form" or "Academy" column. This INSERTS them in place (rather than
// appending at the end), so every existing row's data shifts right with it and
// stays under the right header, then backfills "Form" = "Learn" for the rows
// that are already there. Safe to run more than once.
function addDemoColumnsToMarketTabs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  Object.keys(MARKET_SHEET_NAMES).forEach(function (market) {
    const name = MARKET_SHEET_NAMES[market];
    const sheet = ss.getSheetByName(name);
    if (!sheet) {
      Logger.log('Sheet "' + name + '" not found — skipping.');
      return;
    }

    let headers = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0];

    if (headers.indexOf("Form") === -1) {
      const updatedCol = headers.indexOf("Updated At") + 1; // 1-indexed
      if (updatedCol === 0) {
        Logger.log('"' + name + '": no "Updated At" column — migrate this tab by hand.');
        return;
      }
      sheet.insertColumnsAfter(updatedCol, 1);
      sheet.getRange(1, updatedCol + 1).setValue("Form");
      // Everything already in these tabs came from the learn form.
      const rows = sheet.getLastRow() - 1;
      if (rows > 0) {
        const backfill = [];
        for (let i = 0; i < rows; i++) backfill.push(["Learn"]);
        sheet.getRange(2, updatedCol + 1, rows, 1).setValues(backfill);
      }
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      Logger.log('"' + name + '": inserted Form after column ' + updatedCol + '.');
    }

    if (headers.indexOf("Academy") === -1) {
      const statusCol = headers.indexOf("Status") + 1; // 1-indexed
      if (statusCol === 0) {
        Logger.log('"' + name + '": no "Status" column — migrate this tab by hand.');
        return;
      }
      sheet.insertColumnsAfter(statusCol, 1);
      sheet.getRange(1, statusCol + 1).setValue("Academy");
      Logger.log('"' + name + '": inserted Academy after column ' + statusCol + '.');
    }
  });
}

// --- one-off migration: run this ONCE from the Apps Script editor (select
// "addFormColumnToDemoBookings" in the function dropdown, then click Run)
// BEFORE deploying this version.
//
// "Demo Bookings" was built for the demo wizard only, so it has no "Form"
// column. This INSERTS it in place (rather than appending at the end), so
// every existing row's data shifts right with it and stays under the right
// header, then backfills "Form" = "Demo" for the rows that are already there
// — everything in this tab so far came from the demo wizard. Safe to run
// more than once.
function addFormColumnToDemoBookings() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(GLOBAL_DEMO_SHEET_NAME);
  if (!sheet) {
    Logger.log('Sheet "' + GLOBAL_DEMO_SHEET_NAME + '" not found — nothing to migrate.');
    return;
  }

  const headers = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0];
  if (headers.indexOf("Form") !== -1) {
    Logger.log('"Form" column already present, nothing to do.');
    return;
  }

  const updatedCol = headers.indexOf("Updated At") + 1; // 1-indexed
  if (updatedCol === 0) {
    Logger.log('No "Updated At" column found — migrate this tab by hand.');
    return;
  }

  sheet.insertColumnsAfter(updatedCol, 1);
  sheet.getRange(1, updatedCol + 1).setValue("Form");
  const rows = sheet.getLastRow() - 1;
  if (rows > 0) {
    const backfill = [];
    for (let i = 0; i < rows; i++) backfill.push(["Demo"]);
    sheet.getRange(2, updatedCol + 1, rows, 1).setValues(backfill);
  }
  Logger.log('Inserted "Form" after column ' + updatedCol + ' and backfilled ' + rows + ' row(s) as "Demo".');
}

// --- one-off migration: run this ONCE from the Apps Script editor (select
// "addSourceColumnToAllTabs" in the function dropdown, then click Run) BEFORE
// deploying this version.
//
// None of the three tabs ("UK", "Aus", "Demo Bookings") have a "Source"
// column yet. This INSERTS it right after "Status" on each, so existing data
// shifts right with it and stays under the right header. Existing rows are
// left blank in that column — which specific page/flow they came from isn't
// recoverable after the fact, unlike "Form"/"Academy" which had one knowable
// value for everything already in a given tab. Safe to run more than once.
function addSourceColumnToAllTabs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tabNames = Object.keys(MARKET_SHEET_NAMES)
    .map(function (market) { return MARKET_SHEET_NAMES[market]; })
    .concat([GLOBAL_DEMO_SHEET_NAME]);

  tabNames.forEach(function (name) {
    const sheet = ss.getSheetByName(name);
    if (!sheet) {
      Logger.log('Sheet "' + name + '" not found — skipping.');
      return;
    }

    const headers = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0];
    if (headers.indexOf("Source") !== -1) {
      Logger.log('"' + name + '": "Source" column already present, nothing to do.');
      return;
    }

    const statusCol = headers.indexOf("Status") + 1; // 1-indexed
    if (statusCol === 0) {
      Logger.log('"' + name + '": no "Status" column — migrate this tab by hand.');
      return;
    }

    sheet.insertColumnsAfter(statusCol, 1);
    sheet.getRange(1, statusCol + 1).setValue("Source");
    Logger.log('"' + name + '": inserted "Source" after column ' + statusCol + '.');
  });
}

// --- one-off helper: adds the "Academy" and "Subject" columns to an EXISTING
// "Demo Bookings" tab that predates them. Safe to run more than once.
function addAcademyColumns() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(GLOBAL_DEMO_SHEET_NAME);
  if (!sheet) {
    Logger.log('Sheet "' + GLOBAL_DEMO_SHEET_NAME + '" not found — nothing to migrate.');
    return;
  }

  const lastCol = sheet.getLastColumn();
  const headers = lastCol > 0 ? sheet.getRange(1, 1, 1, lastCol).getValues()[0] : [];

  if (headers.indexOf("Academy") !== -1 && headers.indexOf("Subject") !== -1) {
    Logger.log("Academy and Subject columns already present, nothing to do.");
    return;
  }

  const marketCol = headers.indexOf("Market") + 1; // 1-indexed
  if (marketCol === 0) {
    Logger.log('No "Market" column found — migrate this sheet by hand.');
    return;
  }

  sheet.insertColumnsAfter(marketCol, 2);
  sheet.getRange(1, marketCol + 1, 1, 2).setValues([["Academy", "Subject"]]);
  Logger.log("Inserted Academy + Subject after column " + marketCol + ".");
}

// --- one-off helper: adds the 5 UTM header columns to an EXISTING
// "Demo Leads" tab that predates them. Safe to run more than once.
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

  const missing = utmHeaders.filter(function (h) { return headers.indexOf(h) === -1; });
  if (missing.length === 0) {
    Logger.log("All UTM columns already present, nothing to do.");
    return;
  }

  sheet.getRange(1, lastCol + 1, 1, missing.length).setValues([missing]);
  Logger.log("Added columns: " + missing.join(", "));
}

// --- temporary test helper: one AU demo booking and one AU academy-trial
// learn lead (both land in "Aus", distinguished by Form/Source/Academy), one
// global demo booking and one global learn lead (both land in "Demo
// Bookings", distinguished the same way), each as partial then complete —
// four rows total, not eight. Delete after debugging.
function testDoPostDemo() {
  function post(payload) {
    Logger.log(doPost({ postData: { contents: JSON.stringify(payload) } }).getContent());
  }

  const au = {
    formType: "demo",
    market: "au",
    academy: "Exam Academy",
    subject: "A Level / A+ Level",
    grade: "Grade 9",
    mobile: "+610416976576",
    createdAt: new Date().toISOString(),
  };
  post(Object.assign({ stage: "partial" }, au));
  post(Object.assign({ stage: "complete" }, au, {
    date: "2026-09-09", time: "11:00 AM", timezone: "Australia/Adelaide",
  }));

  const global = {
    formType: "demo",
    market: "global",
    academy: "Tuition Academy",
    subject: "Maths",
    grade: "Grade 5",
    mobile: "+919999999999",
    createdAt: new Date().toISOString(),
  };
  post(Object.assign({ stage: "partial" }, global));
  post(Object.assign({ stage: "complete" }, global, {
    date: "2026-09-18", time: "1:00 PM", timezone: "Asia/Kolkata",
  }));

  const globalLearn = {
    formType: "learn",
    country: "global",
    subject: "English",
    grade: "Grade 6",
    mobile: "+919888888888",
    createdAt: new Date().toISOString(),
  };
  post(Object.assign({ stage: "partial" }, globalLearn));
  post(Object.assign({ stage: "complete" }, globalLearn, {
    date: "2026-09-19", time: "3:00 PM", timezone: "Asia/Kolkata",
  }));

  const auAcademyLearn = {
    formType: "learn",
    country: "au",
    source: "Academy Trial",
    academy: "Exam Academy",
    subject: "Maths",
    grade: "Grade 8",
    mobile: "+610499999999",
    createdAt: new Date().toISOString(),
  };
  post(Object.assign({ stage: "partial" }, auAcademyLearn));
  post(Object.assign({ stage: "complete" }, auAcademyLearn, {
    date: "2026-09-20", time: "10:00 AM", timezone: "Australia/Sydney",
  }));
}
