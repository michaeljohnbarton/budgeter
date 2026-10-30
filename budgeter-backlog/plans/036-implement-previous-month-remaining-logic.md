# Implementation Plan: Implement previous month remaining logic

## Story
[Ticket: 36 - Implement previous month remaining logic](../tickets/036-implement-previous-month-remaining-logic.md)

## Current behavior and architecture

The Home screen in [budgeter-ui/src/pages/home/Home.jsx](../budgeter-ui/src/pages/home/Home.jsx) fetches months, bank accounts, categories, subcategories, and monthly balances via the providers and renders one [budgeter-ui/src/pages/home/components/BankAccount/BankAccount.jsx](../budgeter-ui/src/pages/home/components/BankAccount/BankAccount.jsx) card per bank account. Each bank account passes the selected month and propagation type into [budgeter-ui/src/pages/home/components/Category/Category.jsx](../budgeter-ui/src/pages/home/components/Category/Category.jsx), which filters categories and renders subcategories using the data from [budgeter-ui/src/contexts/MonthlyBalancesContext.jsx](../budgeter-ui/src/contexts/MonthlyBalancesContext.jsx), [budgeter-ui/src/contexts/SubcategoriesContext.jsx](../budgeter-ui/src/contexts/SubcategoriesContext.jsx), and [budgeter-ui/src/contexts/TransactionsContext.jsx](../budgeter-ui/src/contexts/TransactionsContext.jsx).

The bank-account summary rows are currently implemented in [budgeter-ui/src/pages/home/components/BankAccount/BankAccountSummary.jsx](../budgeter-ui/src/pages/home/components/BankAccount/BankAccountSummary.jsx). They render hard-coded "$100.00" values for the category totals, previous-month remaining values, and cumulative-remaining values, rather than calculating from the monthly-balance graph. The UI already uses the `MONTHLY_BALANCE_PROPAGATION_TYPE` enum in [budgeter-ui/src/utils/constants.js](../budgeter-ui/src/utils/constants.js) to switch between `BankAccount` and `Subcategory` summary behavior, and the actual database model field names are already aligned in [budgeter-api/Budgeter.Repository/Models/MonthlyBalance.cs](../budgeter-api/Budgeter.Repository/Models/MonthlyBalance.cs): `MonthId`, `SubcategoryId`, `BudgetedAmountCents`, and `ActualAmountCents`.

The selected month is provided by `useMonths()` and the summary logic must preserve the source-of-truth flow already used elsewhere in the Home page: monthly balances are fetched once through the provider and the page does not persist new display-only values.

## Scope
### In scope
- Replace the hard-coded summary values in the bank-account summary table with calculations based on existing monthly-balance records.
- Compute category totals, remaining totals, previous-month values, and cumulative values per the acceptance criteria for both propagation modes.
- Preserve existing data flow and formatting conventions for selected month, account/category/subcategory filtering, and currency rendering.
- Leave persistence logic and future-balance recalculation unchanged.

### Out of scope
- Any database schema or migration updates.
- New persistence models or API endpoints.
- RecalculateFutureBalances or other future-month recalculation logic.
- Broad refactors outside the bank-account summary and its adjacent data consumers.

## Proposed behavior

For BankAccount propagation mode:
- Build totals by category using the selected month’s `MonthlyBalance` records for that bank account’s subcategories. A missing monthly balance for a subcategory counts as `0` for both budgeted and actual sums.
- `Budgeted Remaining` equals the sum of category budgeted totals; `Actual Remaining` equals the sum of category actual totals.
- `Previous Month Remaining` equals the sum of the previous month’s actual amounts for the same set of subcategories. When a subcategory or the parent bank account has no prior-month actual value, use `$0.00` for that part of the sum.
- `Budgeted Cumulative Remaining` equals `Previous Month Remaining + Budgeted Remaining`.
- `Actual Cumulative Remaining` equals `Previous Month Remaining + Actual Remaining`.

For Subcategory propagation mode:
- Each subcategory row should show its own prior-month actual as `Previous Month Remaining` when that prior-month record exists; otherwise, `$0.00`.
- The account-level `Total Balance` row should be the sum of selected-month actual amounts for the bank account’s subcategories only; it must not include previous-month remaining.

All displayed values should use the existing `CURRENCY_FORMATTER` formatting in [budgeter-ui/src/utils/constants.js](../budgeter-ui/src/utils/constants.js) so the summary rows always render as USD currency with two decimal places.

## Files and components

| Area | File or symbol | Planned change |
| --- | --- | --- |
| UI flow | [budgeter-ui/src/pages/home/Home.jsx](../budgeter-ui/src/pages/home/Home.jsx) | Confirm the selected month and bank-account context remains the source of truth for summary rows; no route-level behavior change expected. |
| Bank account summary | [budgeter-ui/src/pages/home/components/BankAccount/BankAccountSummary.jsx](../budgeter-ui/src/pages/home/components/BankAccount/BankAccountSummary.jsx) | Replace `"$100.00"` placeholders with computed category totals, remaining amounts, previous-month values, and cumulative totals. |
| Category/subcategory display | [budgeter-ui/src/pages/home/components/Category/Category.jsx](../budgeter-ui/src/pages/home/components/Category/Category.jsx), [budgeter-ui/src/pages/home/components/Subcategory/SubcategoryWithTransactions.jsx](../budgeter-ui/src/pages/home/components/Subcategory/SubcategoryWithTransactions.jsx) | Confirm the propagation-type branches and per-subcategory previous-month display lines use the same month/balance data contract already exposed by the contexts. |
| Data contract | [budgeter-ui/src/contexts/MonthlyBalancesContext.jsx](../budgeter-ui/src/contexts/MonthlyBalancesContext.jsx), [budgeter-ui/src/contexts/MonthsContext.jsx](../budgeter-ui/src/contexts/MonthsContext.jsx) | Verify the selected month and sequence of month IDs are available without introducing new persistence or API behavior. |
| Domain model | [budgeter-api/Budgeter.Repository/Models/MonthlyBalance.cs](../budgeter-api/Budgeter.Repository/Models/MonthlyBalance.cs) | Reuse the existing `MonthId`, `SubcategoryId`, `BudgetedAmountCents`, and `ActualAmountCents` fields; no model extension expected. |

## Implementation steps
1. Confirm the summary data contract from the existing Home flow and monthly-balance contexts. Outcome: the summary rows will be calculated from `monthlyBalances`, `selectedMonthId`, and bank-account/subcategory filtering already in the UI data flow; no persistence change is required.
2. Update the bank-account summary in [budgeter-ui/src/pages/home/components/BankAccount/BankAccountSummary.jsx](../budgeter-ui/src/pages/home/components/BankAccount/BankAccountSummary.jsx) to compute the selected-month category totals. For each category, sum each subcategory’s `budgetedAmountCents` and `actualAmountCents` for the chosen month, defaulting missing rows to `0` and using `CURRENCY_FORMATTER` for display.
3. Add the BankAccount propagation calculations for `Budgeted Remaining`, `Actual Remaining`, `Previous Month Remaining`, `Budgeted Cumulative Remaining`, and `Actual Cumulative Remaining` in the same component. Compute `Previous Month Remaining` from the prior month’s actual amounts for that account’s subcategories and use a zero fallback when no prior-month value exists.
4. Preserve Subcategory propagation behavior by reusing the same month lookup in the subcategory rows and ensuring its `Previous Month Remaining` value is the prior month’s actual amount per subcategory, while the account-level `Total Balance` remains the selected month’s actual amounts only.
5. Verify that the rendered rows use the existing `MONTHLY_BALANCE_PROPAGATION_TYPE` branch and final currency formatting contract, and confirm no extra writes or recalculation logic are triggered.

## Acceptance checks
- BankAccount propagation: the category rows show selected-month budgeted and actual sums across all of the account’s subcategories, with missing monthly-balance entries treated as $0.00.
- BankAccount propagation: `Budgeted Remaining` equals the sum of the category budgeted totals; `Actual Remaining` equals the sum of the category actual totals.aining` equals the sum of the category actual totals.- BankAccount propagation: `Previous Month Remaining` reflects the preceding month’s actual totals for the account’s subcategories; when no prior-month actual exists, the cell shows $0.00.
- BankAccount propagation: `Budgeted Cumulative Remaining` and `Actual Cumulative Remaining` equal the expected sums with previous-month remaining included.
- Subcategory propagation: each subcategory’s previous-month row uses the prior month’s actual amount, and the account-level `Total Balance` excludes prior-month remaining.
- All summary rows render with two decimal places via `CURRENCY_FORMATTER`.

## Validation
- `cd budgeter-ui && npm run build` — validates the React component tree, imports, JSX, and CSS-module integration for the summary calculations.
- Manual checks: open the Home screen, switch between months, toggle the bank-account propagation type, and verify the expected values for category totals and remaining rows; confirm missing balance rows show $0.00 and prior-month sums are correct for both propagation modes.

## Risks and edge cases
- Missing selected-month balances: some subcategories may not have a `MonthlyBalance` row at all; the implementation must treat them as zero instead of skipping the category or throwing.
- Missing prior-month balances: there may be no prior month for the selected month, or a subcategory may not have a row for the previous month; the summary must display `$0.00` rather than a NaN or null value.
- Propagation mode differences: the BankAccount and Subcategory branches rely on the same month data but should not mix their aggregation rules; the logic must keep the row-level calculations mode-specific.
- Currency formatting: integer-cent values must be divided by 100 at the render boundary and formatted consistently, without mutating source data or introducing a new display layer.

## Assumptions and open questions
- None. The story and acceptance criteria define the required visible behavior, and the existing data model already exposes the necessary month/balance fields without requiring persistence changes.
