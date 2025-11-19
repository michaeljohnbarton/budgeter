USE budgeter;

CREATE TABLE dbo.Subcategory
(
    ID INT PRIMARY KEY CLUSTERED,
    [Name] VARCHAR(100) NOT NULL,
    CategoryID INT NOT NULL FOREIGN KEY REFERENCES Category(ID),
    RecalculateFutureBalances BIT NOT NULL DEFAULT(0),
    HasTransactions BIT NOT NULL DEFAULT(0)
);