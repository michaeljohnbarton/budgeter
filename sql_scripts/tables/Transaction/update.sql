USE budgeter;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'BankAccount')
BEGIN
    CREATE TABLE dbo.[Transaction]
    (
        ID INT PRIMARY KEY CLUSTERED,
        [Description] VARCHAR(255) NOT NULL,
        IsCredit BIT NOT NULL,
        Amount DECIMAL(9, 2) NOT NULL,
        EnteredDateUtc DATETIME2 NOT NULL,
        MonthID INT NOT NULL FOREIGN KEY REFERENCES [Month](ID),
        SubcategoryID INT NOT NULL FOREIGN KEY REFERENCES Subcategory(ID)
    );
END;