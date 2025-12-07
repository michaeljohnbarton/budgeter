DECLARE @month INT = 11;
DECLARE @year INT = 2025;

SELECT mb.* FROM MonthlyBalance mb
INNER JOIN [Month] m ON mb.MonthID = m.ID
WHERE m.[Month] = @month AND m.[Year] = @year;