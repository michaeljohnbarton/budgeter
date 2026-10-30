---
applyTo: "budgeter-ui/src/commonComponents/**"
---

# Common UI Components

## Scope and organization

- This directory contains reusable React components grouped by component name. Each component keeps its JSX and CSS Module together, for example `modal/Modal.jsx` with `modal/Modal.module.css`.
- Preserve the existing default-export pattern and relative imports. There is no shared component index or TypeScript layer.
- Styling is local through CSS Modules. Add or update the colocated `*.module.css` file rather than introducing global selectors for a component.

## Component contracts

- `Modal` renders nothing when `isOpen` is false. When open, it renders `children`, a Cancel action, and a Save action. Required props are `isOpen`, `onClose`, `onSave`, `isSaveEnabled`, `title`, `children`, and `hasUnsavedChanges`.
- `Modal` uses `window.confirm` before closing when `hasUnsavedChanges` is true. The backdrop also invokes the same close path, so keep backdrop and Cancel behavior aligned. Save is disabled when `isSaveEnabled` is false; the component does not itself validate or await the save callback.
- `CurrencyField` is the shared money input. Pass the value upward as integer cents with `centsValue` and `onChangeCents`; it displays dollar-formatted input and converts entered dollars to cents. Empty input reports `null`. It supports optional `required`, `setTouched`, `onBlur`, `onKeyDown`, `allowNegativeValue`, `className`, `textAlign`, and `autoFocus` props.
- `DataTable` expects records with `id`, plus `name` or `displayName`; `isCurrent` optionally marks and refs the current row. `setDataRecord` and `setIsModalOpen` form the edit flow. `deleteDataRecord(id)` must be async-compatible because the component confirms with `window.confirm` and reports success/failure through `react-toastify`.
- `TitleDropdown` expects items shaped as `{ key, value, display }`. It converts the native select value to a number before calling `setSelectedValue`. `onNewButtonClick` is optional; when supplied, a `New` button is rendered.
- `LoadingIndicator` must remain below `LoadingProvider` in the app tree and reads `loading` and `LoadingType` through `useLoading`. It currently renders for every loading state except `LoadingType.NONE`; changes to loading-state presentation belong with the context contract.
- `Navbar` owns the shared links for `/` and `/configuration`. `ScrollPage` is a layout wrapper for page content and only forwards `children` into its styled container.

## Integration patterns

- App-wide components are mounted in `src/App.jsx`: `Navbar`, `LoadingIndicator`, and the routed `ScrollPage`. Feature pages import `Modal`, `CurrencyField`, `DataTable`, and `TitleDropdown` directly from this directory.
- Form components own validation, touched state, persistence, and modal open/close state. Keep reusable components presentational and callback-driven; do not move feature-specific API or context logic into this directory.
- Keep money values in cents across state, context, and API-facing code. Only `CurrencyField` should translate between the displayed dollar value and integer cents.
- Keep user-facing delete failures and successes consistent with the existing `DataTable` toast behavior unless a caller has a specific error contract.

## Validation

- The UI package defines `npm start`, `npm run build`, and `npm test -- --watchAll=false` (the last command uses the configured Create React App test runner). There are currently no `*.test.*` or `*.spec.*` files under `src`.
- For a component-only change, run the production build from `budgeter-ui` to catch JSX, import, and CSS-module errors. Automated tests are out of scope unless the user explicitly requests test work; manually verify isolated behavior when it is not covered by the build.

## Known constraints

- Components use browser APIs directly (`window.confirm`) and do not expose dialog or confirmation injection points.
- The modal does not currently add focus trapping, Escape-key handling, or ARIA dialog attributes; preserve existing behavior unless an accessibility change is intentional and validated across callers.
- `TitleDropdown` uses the fixed DOM id `title-dropdown`; avoid rendering multiple instances in the same document without addressing that identity constraint.
