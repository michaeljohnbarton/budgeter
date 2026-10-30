---
applyTo: "budgeter-ui/**"
---

# Budgeter UI

## Project shape

- This is a Create React App project using JavaScript React components, CSS Modules, `react-router-dom`, `react-toastify`, and `react-icons`. There is no TypeScript, state-management library, test suite, or shared component index.
- The active browser entry point is `src/index.js`: it imports `src/global.css`, mounts `App` into the `#root` element with React `StrictMode`, and leaves the files under `src/oldFiles` inactive.
- `src/App.jsx` is the application composition root. It owns the router, global provider nesting, `Navbar`, `LoadingIndicator`, page routes, and `ToastContainer`; feature code should not recreate that composition.

## Delegated guidance

- For `src/commonComponents/**`, follow `budgeter-ui-common-components.instructions.md` for shared component contracts and CSS Module conventions.
- For `src/contexts/**`, follow `budgeter-ui-contexts.instructions.md` for provider order, hook contracts, loading/error behavior, and cross-context refreshes.
- For `src/pages/**`, follow `budgeter-ui-pages.instructions.md` for route screens, configuration workflows, home data flow, forms, and inline editing.
- For `src/services/**`, follow `budgeter-ui-services.instructions.md` for API transport, endpoint mappings, response parsing, and error semantics.
- Do not duplicate those directory-specific details in this project-level guidance. When a change crosses boundaries, apply each relevant scoped file together with this one.

## Application composition

- The provider nesting in `App.jsx` is dependency-sensitive: `LoadingProvider` is outermost, `MonthlyBalancesProvider` must surround consumers in subcategories and transactions, and `TransactionModalProvider` is inside the data providers. Preserve that order when adding context dependencies.
- Routes are currently `/` for `Home` and `/configuration` for `Configuration`. The app uses `ScrollPage` only around `Home`; configuration renders directly in the content region.
- The API is expected at `http://localhost:60060` and the UI development server at `http://localhost:3000`. The UI service layer currently hard-codes the `/api` base URL and the API config enables CORS for the UI origin.
- Domain data is fetched and mutated through contexts, which call service wrappers. Keep page and component code focused on presentation, local draft state, filtering, and user interaction rather than direct fetch calls.

## Data and domain conventions

- Amounts are represented as integer cents in context state and API payloads. Use the shared `CurrencyField` for dollar input/display conversion and `CURRENCY_FORMATTER` for ordinary display formatting.
- `src/utils/constants.js` contains constant values and enum-like objects only, such as `MAX_RANK`, `CURRENCY_FORMATTER`, and `MONTHLY_BALANCE_PROPAGATION_TYPE`. Keep functions and other behavior in dedicated utility modules under `src/utils`; do not add functions to `constants.js`.
- `sortByRankThenName` returns a sorted copy, treating a missing rank as `MAX_RANK` and using `name` as the tie-breaker. Preserve non-mutating behavior when reusing or extending it.
- Backend and client use singular, case-sensitive resource names such as `Month`, `BankAccount`, `Category`, `Subcategory`, `MonthlyBalance`, and `Transaction`. Keep this naming consistent across service paths and payload integration.

## Styling and static assets

- `src/global.css` is the active global stylesheet and owns the root layout constraints (`html`, `body`, `#root`, `#app-layout`, and `#app-content`). Feature styling is normally colocated CSS Modules.
- `src/styles/ModalForm.module.css` is the shared form style used by page modals. Avoid introducing global selectors for feature-specific styling.
- `src/styles.css` is legacy React tutorial styling and is not imported by the active entry point. Files under `src/oldFiles` are retained examples, not active application code; do not use them as implementation patterns unless explicitly restoring that example.
- The static shell is `public/index.html`, which provides `#root` and the document title. Public assets should be referenced according to Create React App conventions and should not be coupled to source module paths.

## Development and validation

- From `budgeter-ui`, install dependencies with `npm install`, start the UI with `npm start`, and build with `npm run build`.
- There are currently no `*.test.*` or `*.spec.*` files under `src`; do not add automated tests during ordinary UI work unless the user explicitly requests test work. The production build is the primary automated integration check, and UI behavior changes require manual exercise of the affected route and mutation/error workflow as described by the relevant scoped instruction file.
- The UI requires the API at its configured local URL for data-backed flows. A successful build does not verify API availability, CORS, database state, or endpoint payload compatibility.
- Preserve `package-lock.json` with dependency changes. Do not edit generated `build` output because this project has no checked-in build directory in the active source tree.

## Change boundaries and known constraints

- Keep transport, state orchestration, page workflows, and reusable controls in their existing layers: services -> contexts -> pages/common components. Move a responsibility only when the owning boundary is intentionally changing.
- React `StrictMode` is enabled in development, so effects and mount-time fetch logic must tolerate development effect replays according to the existing context guards.
- The UI currently has a single global loading state and browser-native confirmations in shared workflows. Do not introduce competing loading or confirmation mechanisms in an individual page without coordinating the shared behavior.
- The current HTML title is `Document`; changing document metadata requires an intentional update to `public/index.html`.
