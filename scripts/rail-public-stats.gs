/**
 * RAIL public stats endpoint for dillonmichlena.com
 *
 * Paste this into the FabOps RAIL's Apps Script project (Extensions → Apps Script),
 * as a new file, then deploy it as a web app:
 *   Deploy → New deployment → type "Web app"
 *   Execute as: Me    Who has access: Anyone
 * Copy the web app URL (ends in /exec) into docusaurus.config.js → customFields.railStatsUrl.
 *
 * What it shares: ONLY aggregate counts (totals, counts per status, done/total per subteam)
 * and a timestamp. No part names, member names, notes or any other cell contents leave the sheet.
 */

const RAIL_PUBLIC = {
  sheetName: 'All Parts',        // tab to read
  headerRow: 1,                  // row that holds the column headers
  statusHeader: 'Overall Status',
  subteamHeader: 'Subteam',
  partNameHeader: 'Part Name',   // rows with an empty part name are skipped
  doneStatus: 'done',            // status (case-insensitive) that counts as finished
  cacheSeconds: 300,             // recompute at most every 5 minutes
};

function doGet() {
  const cache = CacheService.getScriptCache();
  let json = cache.get('rail-public-stats');
  if (!json) {
    json = JSON.stringify(computeRailPublicStats_());
    cache.put('rail-public-stats', json, RAIL_PUBLIC.cacheSeconds);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

function computeRailPublicStats_() {
  const cfg = RAIL_PUBLIC;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(cfg.sheetName);
  if (!sheet) throw new Error('Tab not found: ' + cfg.sheetName);

  const values = sheet.getDataRange().getDisplayValues();
  const headers = values[cfg.headerRow - 1].map((h) => String(h).trim());
  const col = (name) => {
    const i = headers.indexOf(name);
    if (i === -1) throw new Error('Column not found: ' + name);
    return i;
  };
  const statusCol = col(cfg.statusHeader);
  const subteamCol = col(cfg.subteamHeader);
  const nameCol = col(cfg.partNameHeader);

  const byStatus = {};
  const bySubteam = {};
  let total = 0;
  let done = 0;

  for (let r = cfg.headerRow; r < values.length; r++) {
    const row = values[r];
    if (!String(row[nameCol]).trim()) continue;

    // "Needs status update (print should ...)" -> "Needs status update"
    const status = String(row[statusCol]).split('(')[0].trim() || 'No status';
    const subteam = String(row[subteamCol]).trim() || 'Unassigned';
    const isDone = status.toLowerCase() === cfg.doneStatus;

    total++;
    if (isDone) done++;
    byStatus[status] = (byStatus[status] || 0) + 1;
    bySubteam[subteam] = bySubteam[subteam] || {total: 0, done: 0};
    bySubteam[subteam].total++;
    if (isDone) bySubteam[subteam].done++;
  }

  return {total, done, byStatus, bySubteam, updated: new Date().toISOString()};
}

/** Run this from the Apps Script editor to check the output before deploying. */
function previewRailPublicStats() {
  Logger.log(JSON.stringify(computeRailPublicStats_(), null, 2));
}
