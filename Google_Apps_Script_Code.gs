function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Financial Variance Dashboard')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getDashboardData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Fetch all data from the Audit tab
  const auditSheet = ss.getSheetByName('Audit');
  const auditData = auditSheet.getDataRange().getValues();
  
  // Fetch all data from the Data tab
  const dataSheet = ss.getSheetByName('Data');
  const macroData = dataSheet.getDataRange().getValues();
  
  // Send it securely to the frontend
  return {
    audit: auditData,
    macro: macroData
  };
}
