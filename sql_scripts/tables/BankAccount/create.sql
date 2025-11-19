USE budgeter;

CREATE TABLE dbo.BankAccount
(
    ID INT PRIMARY KEY CLUSTERED,
    [Name] VARCHAR(100) NOT NULL,
    MonthlyBalancePropogationTypeID INT NOT NULL FOREIGN KEY REFERENCES MonthlyBalancePropogationType(ID),
    HasBudgetedAmounts BIT NOT NULL DEFAULT(0)
);