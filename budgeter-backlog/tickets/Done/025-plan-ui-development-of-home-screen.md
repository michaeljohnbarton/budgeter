# 25 - Plan UI development of Home Screen

## Summary
* **ID** - 25
* **Name** - Plan UI development of Home Screen
* **Status** - Done

## Description
- Show all bank accounts/categories/subcategories for all months
- Where there should be transactions, just have default logic of no transactions yet message
- Mirror as close as possible to existing spreadsheet

‌

Plan

1. Bank account tiles
   1. 2 per “row”
   2. Order by doesn’t matter right now (rank in future)
   3. If Propagation type is bank account
2. Category sub-tiles
   1. Vertically stack
   2. No colors for now, will add **LATER** to Configuration
3. Sub-category sub-tiles
   1. If has transactions, show summary section then transactions section
   2. If not, then show as a single row
   3. If propagation type is sub-category, show previous month remaining
      1. Implement logic **LATER** - just show $0.00 for now
   4. Note: Current Balance is “Actual”
      1. For now, base this off Show Budgeted Amounts
      2. But maybe use label configuration option **LATER**
   5. Note: Total Spending is sum of transactions minus Monthly Deposit
      1. Skip and do **LATER**
   6. Note: Just going to do Monthly Deposit as a transaction for now, maybe change **LATER**
   7. As I’m working on this one, document all the things to do later and priority of next vs later
4. Show Summary tile for bank account if Show Budgeted Amounts
   1. See if we can do this right away or if need to do next items figured out in 3g
   2. Shows individual Budgeted vs Actual for all categories
   3. Then total for bank account
   4. Also Previous Month Remaining
      1. Implement logic **LATER** - just show $0.00 for now
5. Start on transactions story after all of this is done

## Comments
- (No comments yet)