USE budgeter;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'MonthlyBalance')
BEGIN
    CREATE TABLE dbo.MonthlyBalance
    (
        ID INT PRIMARY KEY CLUSTERED,
        MonthID INT NOT NULL FOREIGN KEY REFERENCES [Month](ID),
        SubcategoryID INT NOT NULL FOREIGN KEY REFERENCES Subcategory(ID),
        BudgetedAmount decimal(9,2) NULL,
        ActualAmount decimal(9,2) NOT NULL
    );
END;