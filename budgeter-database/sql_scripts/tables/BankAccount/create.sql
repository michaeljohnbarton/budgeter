USE budgeter;

CREATE TABLE BankAccount
(
	ID INT IDENTITY(1,1) CONSTRAINT PK_BankAccount_ID PRIMARY KEY,
	[Name] VARCHAR(100) NOT NULL,
	[Rank] INT NULL,
	MonthlyBalancePropagationType VARCHAR(11) NOT NULL
		CONSTRAINT CHK_BankAccount_MonthlyBalancePropagationType
		CHECK (MonthlyBalancePropagationType IN ('BankAccount', 'Subcategory')),
	ShowBudgetedAmounts BIT NOT NULL
);