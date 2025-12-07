USE budgeter;

CREATE TABLE dbo.MonthlyBudget -- Will probably get rid of this in favor of doing "BudgetedAmount" in MonthlyBalance, wait to confirm
(
    ID INT PRIMARY KEY CLUSTERED,
    MonthID INT NOT NULL FOREIGN KEY REFERENCES [Month](ID),
    SubcategoryID INT NOT NULL FOREIGN KEY REFERENCES Subcategory(ID),
    Amount decimal(9,2) NOT NULL
);