Manufacturing Cost Variance & Inventory Compliance Audit Model
Executive Summary
This project demonstrates an end-to-end financial data engineering and variance analysis workflow designed for a manufacturing environment (specifically aerospace/defense hardware). The objective of this model is twofold:

Strategic Forecasting: To quantify the financial impact of macroeconomic supply chain inflation (2019–2023) on standard manufacturing costs.

Operational Compliance: To perform an automated audit of internal inventory logs, identifying capital tied up in system errors (negative quantities, zero-cost anomalies) and obsolete stock.

The final output is a secure, interactive web dashboard deployed via Google Apps Script, providing leadership with real-time visibility into inventory risk and trailing cost variances.

Part 1: Data Sourcing & Generation
To create a highly accurate variance model, external macroeconomic indicators were joined with internal manufacturing inventory logs.

External Macroeconomic Data (FRED)
Historical index data was sourced directly from the Federal Reserve Economic Data (FRED) database to track the core components of servo-motor manufacturing:

Steel: Producer Price Index: Metals and Metal Products: Steel Wire, Stainless Steel

Electronics: Producer Price Index: Machinery and Equipment: Electronic Components

Aluminum: Producer Price Index: Alumina and Aluminum Production and Processing

Labor: Unit Labor Costs for Manufacturing: Aerospace Product and Parts

Internal Inventory Data Generation
To simulate a realistic enterprise resource planning (ERP) system export, a Python script was utilized to generate 5 years of monthly inventory data. This dataset was intentionally engineered to include standard manufacturing variances, alongside specific compliance anomalies (negative quantities and zero-cost items) for auditing purposes.

[Insert Screenshot 1: Execution of the Python script in Google Colab]

[Insert Screenshot 2: Preview of the generated Internal_Data tab]

<details>
<summary>Click to view Python Generation Script (Script 1)</summary>

Python
[Paste Script 1 Here]
</details>

Part 2: Data Engineering & Transformation (Excel)
(Note: The complete, formatted Excel workbook is included in this repository).

The raw CSV files were imported into a master workbook. To allow for cross-referencing, the disjointed monthly and annual FRED datasets were standardized into a continuous timeline on a master Macro_Trends table.

[Insert Screenshot 3: The Macro_Trends table]

Custom VLOOKUP and error-handling formulas were utilized to accurately map the disparate external indices to the continuous timeline:

Column B (Steel_Macro): =IFERROR(VLOOKUP($A2, PPI_Metals!$A:$B, 2, FALSE), "Not Found")

Column C (Electronics_Macro): =IFERROR(VLOOKUP($A2, PPI_Electronic_Components!$A:$B, 2, FALSE), "Not Found")

Column D (Aluminum_Macro): =IFERROR(VLOOKUP($A2, PPI_Aluminum!$A:$B, 2, FALSE), "Not Found")

Column E (Labor_Macro): =VLOOKUP($A2, PPI_Aerospace_Products!$A:$B, 2, TRUE) (Note: TRUE is used here to allow the annual labor data to cascade down through the individual months).

Part 3: Financial Auditing & Variance Summaries
With the internal and external datasets joined, advanced Pivot Tables were constructed to extract actionable business intelligence.

1. Inventory Compliance Audit
An automated audit column was created using nested IF statements to flag rows violating inventory governance (e.g., < 0 quantities, $0.00 actual costs, or last-used dates exceeding 365 days). The Audit_Summary pivot table aggregates these findings to show the total financial risk associated with system errors.

[Insert Screenshot 4: Creation of the Audit_Summary Pivot Table with Fields visible]

2. Macroeconomic Variance Analysis
To illustrate the impact of the 2021-2022 supply chain disruptions, the Macro_Summary pivot table tracks the Average Cost Variance by material category over a 5-year period.

[Insert Screenshot 5: Creation of the Macro_Summary Pivot Table with Value Field Settings set to Average]

[Insert Screenshot 6: Preview of the finalized Macro_Summary data output]

Part 4: Cloud Deployment & Interactive Dashboard
To optimize the reporting workflow and move beyond static spreadsheets, the aggregated data was migrated to a cloud environment to power a custom-coded HTML/JS dashboard.

[Insert Screenshot 7: Google Sheets Data tab containing the Macro_Summary export]
[Insert Screenshot 8: Google Sheets Audit tab containing the Audit_Summary export]

Using Google Apps Script, a backend server function (Code.gs) was written to securely fetch the spreadsheet data and pass it to a frontend interface (Index.html) powered by the Google Charts API.

<details>
<summary>Click to view Backend Google Apps Script (Script 2)</summary>

JavaScript
[Paste Script 2: Code.gs Here]
</details>

<details>
<summary>Click to view Frontend HTML/JS Payload (Script 3)</summary>

HTML
[Paste Script 3: Index.html Here]
</details>

Dashboard Interface & Key Findings
The final deployed application provides a highly scannable visual representation of the financial data.

[Insert Screenshot 9: Dashboard Part 1 - Inventory Compliance Risk & 5-Year Macroeconomic Cost Variance]

Key Finding (Variance): The dashboard clearly visualizes the massive inflationary spike in 2021, showing Electronics variance spiking heavily alongside Aluminum, directly correlating with the FRED macroeconomic data.

[Insert Screenshot 10: Dashboard Part 2 - 2024 Predictive Variance Forecast]

Key Finding (Compliance): The audit chart reveals that while "Zero Cost" items represent a negligible financial impact, over 20% of the flagged capital risk is tied to "Negative Quantity" system errors, highlighting an immediate need for an operational workflow audit on the manufacturing floor.
