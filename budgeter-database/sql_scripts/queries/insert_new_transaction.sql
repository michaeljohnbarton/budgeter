-- THIS IS UNTESTED
DECLARE @ID INT = 4 -- should replace this with a SEQUENCE or IDENTITY in future
DECLARE @Description VARCHAR(255) = 'Aldi'
DECLARE @IsCredit BIT = 0
DECLARE @Amount DECIMAL(9, 2) = 54.23
DECLARE @EnteredDateUtc DATETIME2 = '2024-06-15T12:00:00Z'
DECLARE @MonthID INT = 11
DECLARE @SubcategoryID INT = 28

INSERT INTO [Transaction] (ID, [Description], IsCredit, Amount, EnteredDateUtc, MonthID, SubcategoryID)
VALUES (@ID, @Description, @IsCredit, @Amount, @EnteredDateUtc, @MonthID, @SubcategoryID);

UPDATE MonthlyBalance
SET Balance = Balance + CASE WHEN @IsCredit = 1 THEN @Amount ELSE -@Amount END
WHERE MonthID = @MonthID AND SubcategoryID = @SubcategoryID;

DECLARE @RecalculateFutureBalances BIT;
SELECT @RecalculateFutureBalances = RecalculateFutureBalances
FROM Subcategory WHERE ID = @SubcategoryID;

IF @RecalculateFutureBalances = 1 -- would do this over all future months
BEGIN
    UPDATE MonthlyBalance
    SET Balance = Balance + CASE WHEN @IsCredit = 1 THEN @Amount ELSE -@Amount END
    WHERE MonthID = @MonthID + 1 AND SubcategoryID = @SubcategoryID
END;