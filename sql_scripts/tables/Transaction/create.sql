USE budgeter;

CREATE TABLE [Transaction]
(
    ID INT IDENTITY(1,1) CONSTRAINT PK_Transaction_ID PRIMARY KEY,
    [Description] VARCHAR(255) NOT NULL,
    IsCredit BIT NOT NULL,
    Amount DECIMAL(9, 2) NOT NULL,
    EnteredDateUtc DATETIME2 NOT NULL,
    MonthID INT NOT NULL FOREIGN KEY REFERENCES [Month](ID),
    SubcategoryID INT NOT NULL FOREIGN KEY REFERENCES Subcategory(ID)
);