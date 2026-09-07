---
applyTo: "budgeter-ui/src/pages/**"
---

# UI Pages

## Scope and routing

- This directory owns the two route-level screens mounted by `src/App.jsx`: `Home` at `/` and `Configuration` at `/configuration`. Routing, global providers, the navbar, loading indicator, and toast container remain owned by `App.jsx`.
- Organize page-specific components beneath their page: configuration CRUD components live under `configuration/components/{Month,BankAccount,Category,Subcategory}`, and home budget components live under `home/components/{BankAccount,Category,Subcategory,Transaction}`.
- Page and feature components use colocated CSS Modules. Shared controls and cross-page state belong in `src/commonComponents` and `src/contexts`, respectively; do not duplicate those abstractions in a page folder.

## Shared page state and loading

- Pages consume context hooks for data and mutations. They do not call service modules directly.
- `Home` consumes months, bank accounts, categories, subcategories, transactions, transaction-modal state, and loading state. `Configuration` consumes loading plus months, bank accounts, categories, and subcategories.
- Both route screens return `null` during `LoadingType.FULLSCREEN` and render the first provider error as a plain `Error: ...` paragraph. Preserve this early-return ordering when adding page-level loading or error behavior.
- Home requires at least one month before rendering its month selector. Configuration always starts on the Months panel and uses the shared `TitleDropdown` to switch panels.

## Configuration workflow

- `Configuration` keeps `selectedOption` locally and maps each option to a component plus props. Each configuration child receives `registerNewHandler`, registers its own open-new callback in an effect, and clears the callback on unmount.
- The active child owns modal open state, selected/edit record state, and the corresponding CRUD modal. `DataTable` owns edit/delete row actions; the child passes the selected record into its modal.
- Months mark the current year/month row and scroll that row into view after the list changes. Bank accounts render directly. Categories filter by the selected bank account. Subcategories filter by selected bank account, then selected category.
- Category and subcategory panels keep their parent selections in the relevant contexts. When subcategories have categories available but no selected category matches, they select the first filtered category.
- Preserve empty-state branches: each panel explains which prerequisite or record is missing and still renders its creation modal where appropriate.

## Configuration forms

- Configuration modals keep draft values and touched flags locally. They derive `isFormValid` and `hasUnsavedChanges`, pass both to the shared `Modal`, and reset draft state plus the selected record on close.
- Save handlers await context mutations, show success/info/error toasts, and close only after a successful operation. Do not swallow rejected mutation promises.
- Month validation requires a month and a year from 2000 through 3000 and rejects duplicate month/year pairs. Bank accounts, categories, and subcategories require a non-empty name; optional ranks must be between 1 and `MAX_RANK`.
- Category creation uses the selected bank account and subcategory creation uses the selected category. Subcategory default budgeted amounts are passed as integer cents and are coordinated by `SubcategoriesContext`.
- Keep form field IDs and labels coordinated. Existing configuration forms reuse the shared `styles/ModalForm.module.css` rather than defining separate form primitives.

## Home workflow

- `Home` maps months to `{ key, value, display }` dropdown items using `monthMap`, then renders one `BankAccount` per account and a page-level `TransactionModal`.
- `BankAccount` filters categories by `bankAccount.id`, passes account display settings into each `Category`, and renders `BankAccountSummary` beneath the category tables.
- `Category` filters subcategories by category ID and selects `SubcategoryWithTransactions` or `SubcategoryWithoutTransactions` based on `subcategory.hasTransactions`. It uses the selected month to determine whether transaction columns are shown.
- Subcategory rows filter monthly balances and transactions by selected month. Inline amount edits use `CurrencyField`, save on blur or Enter, and call monthly-balance or transaction context updates with patch semantics. Transaction rows use signed cents for display/editing: credits are positive and debits are negative.
- Transaction creation is opened through `TransactionModalContext`. The modal cascades bank account -> category -> transaction-enabled subcategory selection, preserves context-provided readonly selections, and submits the selected month ID with the subcategory and integer-cent amount.
- Transaction and balance edits/deletes show local success or error toasts. Confirm destructive transaction deletes with `window.confirm`, consistent with the shared table behavior.

## Styling and known constraints

- Preserve semantic table structure: category and subcategory components return table rows/cells and are rendered inside parent tables. Do not wrap row-producing components in arbitrary `div` elements.
- Preserve stable DOM IDs used by forms and selectors unless all associated labels and consumers are updated. Several configuration and transaction forms currently use simple IDs such as `name`, `rank`, `bankAccountDropdown`, and `categoryDropdown`.
- `BankAccountSummary` currently displays hard-coded `$100.00` values for summary rows and previous-month remaining values. Treat those values as unfinished behavior; do not use them as a source of calculated balance data.
- The page code currently uses inline edit spans with click handlers for table cells. Any accessibility improvement should preserve the existing blur/Enter save path and be applied consistently to both transaction and monthly-balance edits.

## Validation

- Run `npm run build` from `budgeter-ui` after page changes to catch JSX, import, and CSS-module integration errors. The package also defines `npm test -- --watchAll=false`, but no page test files currently exist under `src`.
- For changes to forms or inline editing, manually exercise create, edit, cancel with unsaved changes, validation-disabled save, blur save, Enter save, and failed mutation paths because those workflows are not covered by existing tests.
