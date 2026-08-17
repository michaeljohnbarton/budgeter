# 21 - Subcategories

## Summary
* **ID** - 21
* **Name** - Subcategories
* **Status** - Done

## Description
- Should be in context of a bank account and category
- Show explanation if no banks accounts or categories to go create one
- Dropdown of bank accounts and category needs to be selected
  - default to first if any
- Once selected, shows table and New button just like Months / Bank Accounts / Categories
- Modal should be the same but include readonly fields of bank account and category for clarity

## Comments
- Completed implementation of bank account and categories dropdowns with new button logic. Next step is to actually implement the creation logic and update the modal UI to contain the fields it needs
- Finished full implementation of creation functionality. Next step is read/display functionality
- Finished full implementation of read/display functionality. Next step is update functionality.
- Finished endpoint for update functionality. Need to do UI and link/test.
- Started working on UI for update functionality then ran into another API connectivity issue. Think I came up with a good solution where anytime we get an error message of Failed to fetch, we set the error so then Configuration page displays it. See SubcategoriesContext for an example of this. However, do this in a separate ticket (already created) after finishing update functionality.
- Finished update functionality. Last bit is delete
- Finished