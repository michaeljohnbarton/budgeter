USE budgeter;

CREATE TABLE dbo.[Month]
(
    ID INT PRIMARY KEY CLUSTERED,
    [Month] INT NOT NULL,
    [Year] INT NOT NULL,
    [Name] VARCHAR(9) NOT NULL
);