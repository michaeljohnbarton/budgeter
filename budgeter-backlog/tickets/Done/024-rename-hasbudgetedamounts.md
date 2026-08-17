# 24 - Rename HasBudgetedAmounts

## Summary
* **ID** - 24
* **Name** - Rename HasBudgetedAmounts
* **Status** - Done

## Description
- ~~Doing this so it’s more granular and because MonthlyBalance (which contains BudgetedAmount) points to subcategory not bank account~~
  - See comments for thought process
- Rename to ShowBudgetedAmount because we’ll just use it to show/hide the budgeted amount in the UI
- Also clean up other unused database tables, can bring them back later if needed

## Comments
- Do we maybe actually wanna keep it on BankAccount and just rename it there because we want to be able to show cumulative budgeted/actual values for entire bank account?
  - Another thought was just keep it granular and if any are missing, then show error in cumulative budgeted section. Cumulative budgeted section would show if any had show budgeted amount, so it would hide if they all didn’t. But would we rather make it easier and toggle at bank account level?
  - But does this affect show/hide of actual Budgeted value in subcat modal? It would but it would still be easy because we have access to bank account right?
  - So right now, I’m pretty 50/50. Keep thinking.
- I’m now thinking that it’ll just be easier to keep it on bank account. It’ll make showing cumulative section easier and a higher level (less areas) to toggle.
- Yep, I’m gonna keep it on bank account. Will just be easier in general I think