# 36 - Implement previous month remaining logic

## Summary
* **ID** - 36
* **Name** - Implement previous month remaining logic
* **Status** - In Progress

## User Story
As a Budgeter user, I want to see monthly category totals, remaining amounts, and prior-month balances in the bank account summaries, so that I can understand each account's budgeted and actual position for the selected month.

## Acceptance Criteria
- In BankAccount propagation mode, each category's Budgeted and Actual summary amounts are the sums of the selected month's corresponding amounts for that category's subcategories.
- A subcategory without a monthly balance for the selected month contributes $0.00 to its category's Budgeted and Actual totals.
- In BankAccount propagation mode, Budgeted Remaining is the sum of the category Budgeted amounts, and Actual Remaining is the sum of the category Actual amounts.
- In BankAccount propagation mode, Budgeted Cumulative Remaining is Previous Month Remaining plus Budgeted Remaining. Actual Cumulative Remaining is Previous Month Remaining plus Actual Remaining.
- In Subcategory propagation mode, each applicable subcategory's Previous Month Remaining amount is its actual amount from the previous month.
- In BankAccount propagation mode, Previous Month Remaining is the sum of the previous month's actual amounts for the bank account's subcategories.
- If no previous-month actual balance is available for the applicable subcategory or bank account, Previous Month Remaining displays $0.00.
- In Subcategory propagation mode, Total Balance is the sum of the selected month's stored actual amounts for the bank account's subcategories. Do not add Previous Month Remaining to this total.
- Format all amounts in these summary rows as currency with two decimal places.

## Comments
- This story covers the UI display and aggregation of existing monthly balance data for the bank account summary rows: category Budgeted and Actual totals, Budgeted Remaining, Actual Remaining, Previous Month Remaining, Budgeted Cumulative Remaining, Actual Cumulative Remaining, and Subcategory-mode Total Balance.
- Previous Month Remaining is a display value, not a separately stored balance. For Subcategory propagation it uses the corresponding subcategory's prior-month actual; for BankAccount propagation it uses the sum of the prior-month actuals for the account's subcategories. When no applicable prior-month value exists, display $0.00.
- Do not add persistence or future-month balance recalculation, including RecalculateFutureBalances; those are outside this story.

### Old comments
- Implemented update of monthly balance when transaction is created, need to do the update and delete as well, then move onto the updates of future monthly balances if there are any. This is what the previous month remaining logic should be but keep figuring it out as we go
- Finished update and delete, keep going after this. Figure out how to do previous month remaining logic next
- Going to pause this to do other things like add edit functionality to subcategories without transactions, etc.