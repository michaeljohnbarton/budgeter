USE budgeter;

SET IDENTITY_INSERT BankAccount ON;

INSERT INTO BankAccount
    (ID, [Name], MonthlyBalancePropogationType, HasBudgetedAmounts)
VALUES
    (1, 'ONE Debit', 'BankAccount', 1),
    (2, 'ONE Savings', 'Subcategory', 0),
    (3, 'FNB', 'BankAccount', 1);

SET IDENTITY_INSERT BankAccount OFF;