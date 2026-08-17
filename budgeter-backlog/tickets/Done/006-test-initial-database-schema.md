# 6 - Test initial database schema

## Summary
* **ID** - 6
* **Name** - Test initial database schema
* **Status** - Done

## Description
Scenarios to test

- ~~Get the monthly balance for all subcategories in the month~~
- ~~Insert a new transaction and update the monthly balance~~
  - And all future ones based on RecalculateFutureBalances (in SC)
  - Consider IsCredit (as selected for transaction)

## Comments
- Sort of tested, realized most of the more complicated operations will be multiple queries executed using C# logic to keep things more readable/debuggable