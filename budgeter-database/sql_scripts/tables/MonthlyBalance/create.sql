USE budgeter;

CREATE TABLE MonthlyBalance
(
    ID INT IDENTITY(1,1) CONSTRAINT PK_MonthlyBalance_ID PRIMARY KEY,
    MonthID INT NOT NULL FOREIGN KEY REFERENCES [Month](ID),
    SubcategoryID INT NOT NULL FOREIGN KEY REFERENCES Subcategory(ID),
    BudgetedAmount decimal(9,2) NULL,
    ActualAmount decimal(9,2) NOT NULL
);