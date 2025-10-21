USE budgeter;
GO

CREATE TABLE dbo.WeatherForecast
(
    ID INT PRIMARY KEY CLUSTERED,
    [Date] DATETIME2,
    Summary VARCHAR(100)
);
GO