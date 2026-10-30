# Budgeting Spreadsheet System Documentation

## Overview
This workbook is a zero-based budgeting and cash-flow planning system centered around two checking accounts:

- ONE Debit (daily spending and sinking funds)
- FNB (income, mortgage, investing, larger transfers)

The workbook tracks:
- Monthly budgeted vs actual income
- Monthly budgeted vs actual spending
- Monthly savings allocations
- Sinking fund balances (called Pockets/Funds)
- Mortgage amortization and extra principal strategy
- Special-purpose cash pools (Extra Money, trust money, windfalls)

---

# Core Budget Model

For each month:

## Income Categories
### ONE Debit Income
- Mindex paychecks
- Additional income
- Transfers from FNB
- Interest
- Misc reimbursements

### FNB Income
- AHN paychecks
- Interest
- Tax refunds
- Trust distributions
- Reimbursements
- Transfers from ONE

---

## Spending Categories
### ONE Fixed Expenses
- Internet
- Life Insurance
- LegalShield
- Guardian Protection
- Netflix
- Transfer to FNB

### FNB Mortgage Expenses
Mortgage has two components:
- Required Payment
- Extra Principal Payment

Formula:

```text
Actual Mortgage Spending = Required Payment + Extra Principal + Other Mortgage Transfers
```

Examples observed:
- Required payment ≈ $2,789 to $2,937
- Extra principal varies dramatically
- Some months include $10,000+ extra principal

---

# Savings Engine

The spreadsheet treats sinking-fund allocations as savings.

Typical monthly funding:

| Fund | Typical Deposit |
|--------|--------|
| Utilities | 600 |
| Groceries | 450 |
| Food | 375-400 |
| Gas | 125 |
| Necessities | 300 |
| Activities | 100 |
| Fitness | 25 |
| Emily Spending | 100 |
| MJ Spending | 100 |
| Travel | 200-350 |
| Baby | 0-450 |
| Dog | 200 |
| Renovation | 200-300 |
| House Maintenance | 50-100 |
| Car Maintenance | 50-150 |
| Lawn Care | 100 |
| HVAC | 150 |
| Roof | 150 |
| Gift | 100 |
| Medical | 50-150 |
| Tax | 100 |
| Emergency | 100 |
| Other Savings | 75-250 |
| Invest | 100-150 |

---

# Monthly Budget Calculations

## Budgeted Remaining

Formula:

```text
Budgeted Remaining = Budgeted Income
                     - Budgeted Spending
                     - Budgeted Savings
```

## Actual Remaining

Formula:

```text
Actual Remaining = Actual Income
                   - Actual Spending
                   - Actual Savings
```

## Cumulative Remaining

Formula:

```text
Cumulative Remaining
= Previous Month Remaining
+ Current Month Remaining
```

Workbook tracks:

- Previous Month Remaining
- Budgeted Cumulative Remaining
- Actual Cumulative Remaining

---

# Fund Architecture

Each sinking fund follows the same pattern.

## Generic Fund Formula

```text
Current Balance
= Previous Month Remaining
+ Monthly Deposit
+ Transfers In
- Total Spending
```

Displayed fields:

- Current Balance
- Previous Month Remaining
- Monthly Deposit
- Total Spending
- Transaction Ledger

---

# Sinking Funds

## Utilities Fund
Tracks:
- Electric
- Water
- Trash/Garbage

## Groceries Fund
Tracks grocery purchases.

Common merchants:
- Aldi
- Costco
- County Market
- Thrive

## Food Fund
Restaurant and dining fund.

## Gas Fund
Fuel purchases.

## Necessities Fund
Household purchases.

Examples:
- Amazon
- Walmart
- Costco
- Toiletries
- Parking
- Household supplies

## Activities Fund
Entertainment and discretionary activities.

## Fitness Fund
Separate fitness allocation.

## Emily Spending Fund
Personal discretionary spending.

## MJ Spending Fund
Personal discretionary spending.

## Travel Fund
Travel savings and travel expenses.

## Baby Fund
Baby-related savings and expenses.

## Dog Fund
Pet-related expenses.

Examples:
- Groomer
- Vet
- Dog food
- Chews

## Renovation Fund
Major home projects.

Examples:
- Flooring
- Bathrooms
- Paint
- Fixtures

## House Maintenance Fund
Home repairs and annual maintenance.

## Car Maintenance Fund
Vehicle repairs, registration, deductible.

## Lawn Care Fund
Landscaping and lawn projects.

## HVAC Fund
Goal-based reserve.

Observed target:

```text
Target: $10,000 by September 2028
```

## Roof Fund
Goal-based reserve.

Observed target:

```text
Target: $10,000 by May 2030
```

## Gift Fund
Gift purchases.

## Medical Fund
Healthcare costs.

## Tax Fund
Quarterly tax payments.

## Other Savings Fund
General-purpose savings.

---

# Account Rollups

## ONE Debit Totals

Formula:

```text
ONE Income
- ONE Spending
- ONE Savings
= ONE Remaining
```

## FNB Totals

Formula:

```text
FNB Income
- FNB Spending
- FNB Savings
= FNB Remaining
```

## Banking Total

Formula:

```text
Banking Total Income
= ONE Income + FNB Income

Banking Total Spending
= ONE Spending + FNB Spending

Banking Total Savings
= ONE Savings + FNB Savings

Banking Total Remaining
= Total Income - Total Spending - Total Savings
```

---

# Balance Tracking

Workbook maintains three layers:

## ONE Banking Total

Tracks:

```text
Total Current Balance
```

## ONE Savings Total

Tracks:

```text
Total Balance
```

## Combined Total

Formula:

```text
Combined Net Cash
= Banking Total
+ Savings Total
```

---

# Extra Money Bucket

A special reserve used for:

- Bonuses
- Windfalls
- Tax refunds
- Trust money
- Large one-off allocations

Examples observed:

- Bike purchase
- Lawn project
- Bed frame
- Costco
- Mortgage principal prepayment
- Robovac

Formula:

```text
Current Remaining
= Total Windfalls
- Allocated Amounts
```

---

# 65k Windfall Allocation Rules

Observed allocations:

| Purpose | Allocation |
|----------|----------:|
| Baby | 10000 |
| HVAC | 5000 |
| Roof | 5000 |
| Mortgage Paydown | 10000 |
| Bathrooms | 4000 |
| Floor Deposit | 16000 |
| Renovation Fund | 11000 |

Source fund size:

```text
65000
```

---

# Mortgage Strategy

Mortgage sheet contains:

- Beginning Balance
- Payment
- Principal
- Interest
- Extra Principal
- Cumulative Principal
- Cumulative Interest
- Ending Balance

Loan parameters:

```text
Original Loan: 265,000
Interest Rate: 6.125%
Term: 240 months
```

Monthly actual payment:

```text
Payment = Base Payment + Escrow
```

Observed adjustments:

- Escrow changes over time
- Additional principal often added manually
- Extra principal significantly accelerates payoff

Formula:

```text
Ending Balance
= Beginning Balance
- Principal
- Extra Principal
```

---

# Trend Sheet

Tracks monthly spending patterns for:

- Utilities
- Groceries
- Food
- Gas
- Necessities

Used for:

- Average spending calculations
- Budget planning adjustments
- Forecasting monthly allocations

---

# Important Web App Concepts

The web app should model these entities:

## Accounts
- ONE Debit
- FNB

## Income Sources
- Salary
- Interest
- Reimbursement
- Transfer
- Windfall

## Expense Categories
- Fixed bills
- Mortgage
- Savings transfers

## Funds (Sinking Funds)
Each fund should support:

```typescript
Fund {
  id
  name
  currentBalance
  monthlyDeposit
  targetAmount?
  targetDate?
  transactions[]
}
```

## Monthly Budget

```typescript
MonthlyBudget {
  month
  budgetedIncome
  actualIncome
  budgetedExpenses
  actualExpenses
  budgetedSavings
  actualSavings
  remaining
}
```

## Transactions

```typescript
Transaction {
  id
  date
  fundId
  amount
  merchant
  type
  notes
}
```

## Rules Engine

Core formulas:

```text
FundBalance = PreviousBalance + Deposits - Spending

Remaining = Income - Spending - Savings

CumulativeRemaining = PreviousCumulative + Remaining

BankTotal = Sum(All Accounts)

SavingsTotal = Sum(All Funds)
```

This document captures the functional behavior and budgeting rules present in the workbook and can be used as the basis for domain modeling, database design, API design, and UI planning.
