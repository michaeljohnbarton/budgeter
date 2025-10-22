USE budgeter;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'WeatherForecast')
BEGIN
    CREATE TABLE dbo.WeatherForecast
    (
        ID INT PRIMARY KEY CLUSTERED,
        [Date] DATETIME2,
        Summary VARCHAR(100)
    );
END;