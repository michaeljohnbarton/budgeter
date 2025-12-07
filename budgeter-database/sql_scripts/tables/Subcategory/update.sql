USE budgeter;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'Subcategory')
BEGIN
    CREATE TABLE Subcategory
    (
        ID INT IDENTITY(1,1) CONSTRAINT PK_Subcategory_ID PRIMARY KEY,
        [Name] VARCHAR(100) NOT NULL,
        CategoryID INT NOT NULL FOREIGN KEY REFERENCES Category(ID),
        RecalculateFutureBalances BIT NOT NULL,
        HasTransactions BIT NOT NULL
    );
END;