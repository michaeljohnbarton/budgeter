USE budgeter;

CREATE TABLE dbo.MonthlyBalance
(
    ID INT PRIMARY KEY CLUSTERED,
    MonthID INT NOT NULL FOREIGN KEY REFERENCES [Month](ID),
    SubcategoryID INT NOT NULL FOREIGN KEY REFERENCES Subcategory(ID),
    Amount decimal(9,2) NOT NULL
);