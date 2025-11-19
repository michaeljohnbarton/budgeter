USE budgeter;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'BankAccount')
BEGIN
    CREATE TABLE dbo.BankAccount
    (
        ID INT PRIMARY KEY CLUSTERED,
        [Name] VARCHAR(100) NOT NULL,
        MonthlyBalancePropogationTypeID INT NOT NULL FOREIGN KEY REFERENCES MonthlyBalancePropogationType(ID),
        HasBudgetedAmounts BIT NOT NULL DEFAULT(0)
    );
END;