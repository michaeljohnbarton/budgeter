USE budgeter;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'BankAccount')
BEGIN
    CREATE TABLE BankAccount
    (
        ID INT IDENTITY(1,1) CONSTRAINT PK_BankAccount_ID PRIMARY KEY,
        [Name] VARCHAR(100) NOT NULL,
        MonthlyBalancePropagationType VARCHAR(11) NOT NULL
            CONSTRAINT CHK_BankAccount_MonthlyBalancePropagationType
            CHECK (MonthlyBalancePrapogationType IN ('BankAccount', 'Subcategory')),
        HasBudgetedAmounts BIT NOT NULL
    );
END;