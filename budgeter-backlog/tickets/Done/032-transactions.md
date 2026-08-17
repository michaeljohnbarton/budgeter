# 32 - Transactions

## Summary
* **ID** - 32
* **Name** - Transactions
* **Status** - Done

## Description
- Full CRUD
- For creation, just have a global new button on Home page where you have to set which bank account/cat/subcat etc.
  - Taking into account which subcats can have transactions
  - Can improve this later to click on subcat and add directly
- Read - just display on Home page
- Edit/delete - maybe just similar logic as config screen for now?

## Comments
- Left off with all Amount field. Check if there’s anything else behavioral to do with that. Otherwise move onto save functionality (and creating transaction context, etc.)
- Finished all behavioral stuff on the UI with the form itself, now actually move onto UI save functionality
- Looks like we actually finished the save functionality entirely. Next step is to implement READ functionality and display those transactions on Home page.
  - Actually but first need to go back and filter out any subcategories that don’t include/allow transactions.
- Filtered out subcats not allowing txs, now can move onto Read
- Read was done, started working on adding + button to individual subcategories. Have initial AI implementation, need to do some testing/bug-fixing:
  - - New TX for subcat, don’t fill anything out, cancel, confirmation dialog is seen but don’t want that
  - - New TX general, readonly dropdown
- Got those bugs fixed and tested modals some more, don’t see any other bugs right now, move onto edit
- Working on edit button and getting the text description to get cut off by it cleanly, kinda iffy right now
- Got edit button done, now onto delete
- Delete is done