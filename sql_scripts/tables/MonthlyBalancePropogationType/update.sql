USE budgeter;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'MonthlyBalancePropogationType')
BEGIN
    CREATE TABLE dbo.MonthlyBalancePropogationType
    (
        ID INT PRIMARY KEY CLUSTERED,
        [Name] VARCHAR(100) NOT NULL
    );
END;