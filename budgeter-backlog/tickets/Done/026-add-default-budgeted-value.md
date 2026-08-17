# 26 - Add default Budgeted value

## Summary
* **ID** - 26
* **Name** - Add default Budgeted value
* **Status** - Done

## Description
Summary

- Add Default Budgeted Amount to Config screen for Subcategories
  - Will just need POST, GET and PUT for now
- Will create/edit record in MonthlyBalance for SubcatID and Month ID
  - MonthID should be 0 (for defaults) and if Month with ID 0 does not exist, create it
- When deleting subcategory, make sure we delete default monthly balance first
  - Maybe we don’t need to though if there’s other monthly balances?
  - So probably just leave this alone and prevent deletion for now via error handling of FK violation error
- Other considerations
  - Another screen that’s better for editing Default Budgeted Amount for all Subcats in one grid

Steps

1. Create controller/services/etc for MonthlyBalance starting with creation and add to UI for Subcategories
   1. only for new subcat (create mode)
   2. only show if ShowBudgetedAmounts
      1. but don’t worry about clearing out Default Budgeted Amount, we will let it persist to database and to other monthly balances if they decide to change it later and show/hide it
   3. Will require unique UI logic to separately call POST MonthlyBalance if a value was entered for default
   4. Will require updating POST Subcategory endpoint to return created ID - DO THIS FIRST
   5. Make sure POST MonthlyBalance handles scenario where month ID 0 doesn’t exist
2. Then do GET MonthlyBalance to populate modal during edit
3. Then implement edit mode of subcategory - two fold
   1. Edit mode - didn’t already have it - POST monthlybalance
   2. Edit mode - already had it - PUT monthlybalance
   3. This will work because when creating new monthly balance, if there’s no default (no monthid 0 matching subcat), it will just set budgeted for new monthly balance to null

## Comments
- Done with POST subcategory changes, next step is to add Default Budgeted Value to UI for subcat creation and entire backend for monthly balance to starting with just POST endpoint
- Used AI to generate backend for monthly balance. Go through and review it more thoroughly then move onto UI
- Finished Step 1 for monthly balance creation. Now move onto step 2 with GET and UI population of field
- Finished Step 2, onto Step 3
- Finished