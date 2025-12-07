USE budgeter;

CREATE TABLE dbo.MonthlyBalancePropogationType -- Will probably get rid of this in favor of doing enum like values in BankAccount instead
(
    ID INT PRIMARY KEY CLUSTERED,
    [Name] VARCHAR(100) NOT NULL
);