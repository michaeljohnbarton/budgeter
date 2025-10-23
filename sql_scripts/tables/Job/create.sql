USE budgeter;

CREATE TABLE dbo.Job
(
    ID INT PRIMARY KEY CLUSTERED,
    [Name] VARCHAR(50),
    AnotherColumn BIT NOT NULL DEFAULT(0)
);