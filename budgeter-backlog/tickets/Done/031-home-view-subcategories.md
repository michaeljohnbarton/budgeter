# 31 - Home view - Subcategories

## Summary
* **ID** - 31
* **Name** - Home view - Subcategories
* **Status** - Done

## Description
- ~~If has transactions, show summary section then transactions section~~
- ~~If not, then show as a single row~~
- ~~If propagation type is sub-category, show previous month remaining~~
  - ~~Implement logic **LATER** - just show $0.00 for now~~
- ~~Note: Current Balance is “Actual”~~
  - ~~For now, base this off Show Budgeted Amounts~~
  - ~~But maybe use label configuration option **LATER**~~
- ~~Note: Total Spending is sum of transactions minus Monthly Deposit~~
  - ~~Skip and do **LATER**~~
- ~~Note: Just going to do Monthly Deposit as a transaction for now, maybe change **LATER**~~
- ~~As I’m working on this one, document all the things to do later and priority of next vs later~~
- ~~Test what happens if no subcats for cat~~

## Comments
- Finished initial tabular implementation/display of subcategories. Go back and do the ranking for bank account, category and subcategories to make it easier to line things up with the spreadsheet.
- Finished first two bullets based on HasTransactions and ShowBudgetedAmounts (after doing the ranking in separate card)
  - Figure out what to do next
- Did general display clean up
- Did “Actual” vs “Current Balance” based on show budgeted amounts, no need to worry about this later until it becomes an issue
- Finished bank account summary display, will implement more later as part of previous month remaining logic
- Now need to go add previous month remaining for subcategory setting
- Previous month remaining for subcategory done
- Created cards for all other necessary items here, done with this, move onto transactions now