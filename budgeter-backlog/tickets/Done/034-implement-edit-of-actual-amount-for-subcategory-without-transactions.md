# 34 - Implement edit of actual amount for subcategory without transactions

## Summary
* **ID** - 34
* **Name** - Implement edit of actual amount for subcategory without transactions
* **Status** - Done

## Description
(No description)

## Comments
- Got this done and working well for any subcategory that’s in a category where no subcategory allows transactions
  - However, funky resizing occurring in category that has a subcategory that allows transactions, was because of table-layout: auto. I think this was for edit/delete icon in actual cell. go back and check that and see if i can get rid of it.
  - also check why the one category says it has transactions and is allowing col for delete icon when it doesn’t look like it does
- Figured out funky resizing and one category allowing for transactions. However, now subcategory names are going onto 2 lines in some instances. Will handle this in a separate ticket
  - Move onto implementing backend for monthly balance actual amount
- Finished