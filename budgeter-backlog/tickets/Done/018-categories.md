# 18 - Categories

## Summary
* **ID** - 18
* **Name** - Categories
* **Status** - Done

## Description
- Should be in context of a bank account
- Show explanation if no banks accounts to go create one
- Dropdown of bank accounts needs to be selected
  - default to first if any
- Once selected, shows table and New button just like Months / Bank Accounts
- Modal should be the same but include readonly field of bank account for clarity

## Comments
- Initial display of bank account dropdown is done. Next need to add creation functionality in context of a bank account
- Got readonly view of bank account in creation modal and name field pretty much set up. Need to add Is Credit checkbox then endpoint implementation and wiring up
- Should have UI and endpoint pretty much done for creation. Need to actually test and figure out how to handle foreign key exception
- Create functionality done, move onto read next
- Read endpoint should be done, fixed some UI context stuff with the error handling if API is not running, need to do UI display of read endpoint results
- Finished read functionality and fixed some other bugs including resetting of selected bank account when creating new category, next up is update functionality
- Finished everything!