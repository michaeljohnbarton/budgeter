---
applyTo: "budgeter-ui/src/contexts/**"
---

# UI Contexts

## Scope and architecture

- Each file defines one React context, its provider, and a named `useX` hook. Providers own client-side state and call the corresponding service in `src/services`; pages and shared components consume hooks rather than calling services directly.
- Keep the existing pattern: create the context, define the provider, expose the provider value, then export a hook that throws when used outside its provider.
- Contexts use JavaScript and React hooks; there is no reducer layer, TypeScript contract, or context index file.

## Provider order and dependencies

- `LoadingProvider` must be outermost because all data providers consume `LoadingContext` directly.
- The current `App.jsx` nesting is `LoadingProvider` -> `MonthsProvider` -> `BankAccountsProvider` -> `CategoriesProvider` -> `MonthlyBalancesProvider` -> `SubcategoriesProvider` -> `TransactionsProvider` -> `TransactionModalProvider`.
- `SubcategoriesProvider` consumes `useMonthlyBalances` and refreshes monthly balances after creating or updating a subcategory's default budgeted amount. `TransactionsProvider` also consumes `useMonthlyBalances` and refreshes balances after transaction create, update, or delete.
- Preserve dependency order when adding a provider dependency. A provider that calls another context's hook must be nested inside that provider.

## Shared data-provider behavior

- Months, bank accounts, categories, subcategories, monthly balances, and transactions fetch once on mount through a `useEffect` and a `useRef` `hasFetched` guard. Their fetch functions accept `{ force = false }`; forced fetches bypass the guard after mutations.
- Initial reads set `LoadingType.FULLSCREEN`; create, update, and delete operations set `LoadingType.OVERLAY`. Every async operation resets loading to `LoadingType.NONE` in `finally`.
- Fetch failures clear or set the provider's `error` state. The API sentinel `API_CONNECTION_FAILED_MESSAGE` is translated to the user-facing `API_CONNECTION_ERROR_MESSAGE`; other fetch errors retain their message. Mutations rethrow after handling connection errors so callers such as `DataTable` or form modals can display their own failure feedback.
- Successful mutations refresh the provider's list with `force: true` rather than locally editing the list. Preserve this source-of-truth behavior unless there is a demonstrated performance requirement to change it.
- Money fields remain integer cents in context state and service payloads. The contexts do not convert currency units; conversion belongs in the shared `CurrencyField`.

## Public hook contracts

- `useLoading()` returns `{ loading, setLoading, LoadingType }`, where `LoadingType` contains `NONE: 0`, `OVERLAY: 1`, and `FULLSCREEN: 2`. Consumers must be below `LoadingProvider`.
- `useMonths()` returns `{ months, error, monthMap, createMonth, updateMonth, deleteMonth, selectedMonthId, setSelectedMonthId }`. `selectedMonthId` starts as `''` and is initialized to the current year/month when available, otherwise the first month. `monthMap` is the static 1-12 month-name mapping.
- `useBankAccounts()` returns `{ bankAccounts, error, createBankAccount, updateBankAccount, deleteBankAccount, selectedBankAccountId, setSelectedBankAccountId }`. Fetched accounts are sorted with `sortByRankThenName`; the first account becomes selected when no selection exists.
- `useCategories()` returns `{ categories, error, createCategory, updateCategory, deleteCategory, selectedCategoryId, setSelectedCategoryId }`. Fetched categories are sorted with `sortByRankThenName`; the first category becomes selected when no selection exists.
- `useSubcategories()` returns `{ subcategories, error, createSubcategory, updateSubcategory, deleteSubcategory }`. Create and update accept default-budget arguments and coordinate the default monthly balance through `monthlyBalanceService`.
- `useMonthlyBalances()` returns `{ monthlyBalances, error, fetchMonthlyBalances, updateMonthlyBalance }`. `updateMonthlyBalance(id, payload, patch = false)` forwards the patch flag to the service.
- `useTransactions()` returns `{ transactions, error, createTransaction, updateTransaction, deleteTransaction }`. Update accepts `patch = false`; all transaction mutations refresh both transactions and monthly balances.
- `useTransactionModal()` returns `{ isOpen, setIsOpen, initialValues, openModal, openModalForNewTransactionInSubcategory, openModalForExistingTransaction, closeModal }`. Modal initial values include IDs, description, credit flag, amount in cents, and readonly flags for bank account/category/subcategory selection.

## Mutation and consistency rules

- Keep service calls inside the owning context. Add or change endpoint details in the corresponding service module, not in page components or providers.
- After a subcategory create/update, refresh both subcategories and monthly balances even when the default balance operation is skipped; this is the current `finally` behavior for the nested default-balance operation.
- After a transaction create/update/delete, refresh transactions and monthly balances so calculated balances stay synchronized.
- Preserve async error propagation from mutations. Callers rely on rejected promises to avoid closing forms or to show toast errors.
- When adding a list context, follow the established `{ items, error, create, fetch, update, delete }` shape where applicable, use the shared loading context, and normalize the network connection sentinel consistently.

## Transaction modal state

- `TransactionModalContext` is local UI state, not API state. `openModalForNewTransactionInSubcategory` preselects and locks the supplied bank account, category, and subcategory; `openModalForExistingTransaction` maps an existing transaction into the same template and locks those selectors.
- `closeModal` closes immediately and resets `initialValues` after 300 ms to match the modal animation. Preserve that delay or update it together with the modal animation duration.
- The initial transaction template uses `null` for `transactionId` and `amountCents`, `0` for related IDs, an empty description, and `false` for `isCredit`.

## Validation and known constraints

- Run `npm run build` from `budgeter-ui` after context changes to catch JSX, imports, and integration errors. The package also defines `npm test -- --watchAll=false`, but there are currently no `*.test.*` or `*.spec.*` files under `src`.
- Context effects intentionally use mount-style fetches with empty dependency arrays. Avoid adding unstable function dependencies without addressing the resulting refetch loop.
- Loading is a single global state. Concurrent requests can overwrite each other's loading mode; preserve this existing contract unless introducing coordinated request tracking deliberately.
- Context error state is primarily consumed by `Home` and `Configuration`; mutation callers generally handle rejected errors directly. Do not silently swallow mutation failures.
