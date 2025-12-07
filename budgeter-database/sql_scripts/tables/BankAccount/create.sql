USE budgeter;

CREATE TABLE BankAccount
(
    ID INT IDENTITY(1,1) CONSTRAINT PK_BankAccount_ID PRIMARY KEY,
    [Name] VARCHAR(100) NOT NULL,
    MonthlyBalancePropogationType VARCHAR(11) NOT NULL
        CONSTRAINT CHK_BankAccount_MonthlyBalancePropogationType
        CHECK (MonthlyBalancePropogationType IN ('BankAccount', 'Subcategory')),
    HasBudgetedAmounts BIT NOT NULL
);