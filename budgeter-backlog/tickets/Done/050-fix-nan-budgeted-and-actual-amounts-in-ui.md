# 50 - Fix NaN budgeted and actual amounts in UI

## Summary
* **ID** - 50
* **Name** - Fix NaN budgeted and actual amounts in UI
* **Status** - Done

## Description
Budgeted and actual amount cells on the home screen can render as `$NaN`. This occurs when a monthly balance lookup returns no record and falls back to an empty object, and when `BudgetedAmountCents` is `null` for subcategories that do not have a budgeted amount. Both `SubcategoryWithoutTransactions` and `SubcategoryWithTransactions` divide these values by 100 without normalizing them first.

The database and API intentionally allow `BudgetedAmountCents` to be null, while `ActualAmountCents` is required. The fix should prevent invalid currency output without changing that domain meaning or silently changing stored data.

## Suggested Implementation
1. Add a small UI-side amount normalization/formatting helper, or an equivalent shared presentation pattern, that converts a nullable or missing cents value to a finite display value before dividing by 100. Use an explicit `$0.00` display for a null budgeted amount or missing monthly balance, while preserving null when sending or storing budgeted values.
2. Apply the same handling to both subcategory home components so the budgeted, actual, and current-balance cells cannot pass `undefined`, `null`, or another non-finite value to `CURRENCY_FORMATTER`.
3. Treat a missing monthly-balance record separately from a record whose budgeted amount is null. Actual amounts should display as zero when no record is available. Editing should not issue an update with an undefined monthly-balance ID; a clean, handled error is acceptable until missing-record creation is addressed in a follow-up story.
4. Keep the API and database contracts unchanged unless investigation proves that records are incorrectly missing. Do not replace nullable budgeted values with database zeroes as a rendering workaround.
5. Verify the behavior with a normal numeric balance, a null budgeted amount, a missing monthly-balance record, and both subcategory components. Automated test coverage is out of scope.

## Acceptance Criteria
- No home-screen budgeted, actual, or current-balance amount renders as `$NaN`, `NaN`, or an invalid currency value.
- Null budgeted amounts render as `$0.00` without changing their persisted/API null semantics.
- Missing monthly-balance records render safe zero values and cannot trigger an update with an undefined ID; the edit failure is surfaced as a handled error.
- Existing positive, zero, and negative cent values continue to format correctly.
- Automated test coverage is explicitly out of scope.

## Comments
- Missing monthly-balance edits return a clear error from the monthly-balance context and the subcategory components surface it through their existing error toast. Creating missing balances is deferred to a follow-up story.
- Source review and editor diagnostics found no errors. The production build and live UI verification were not run during ticket closure.