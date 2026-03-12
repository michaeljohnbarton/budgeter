USE budgeter;

SET IDENTITY_INSERT BankAccount ON;

INSERT INTO BankAccount
	(ID, [Name], [Rank], MonthlyBalancePropagationType, ShowBudgetedAmounts)
VALUES
	(1, 'ONE Debit', 1, 'BankAccount', 1),
	(2, 'ONE Savings', 3, 'Subcategory', 0),
	(3, 'FNB', 2, 'BankAccount', 1);

SET IDENTITY_INSERT BankAccount OFF;