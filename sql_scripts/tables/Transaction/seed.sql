USE budgeter;

SET IDENTITY_INSERT [Transaction] ON;

INSERT INTO [Transaction]
    (ID, [Description], IsCredit, Amount, EnteredDateUtc, MonthID, SubcategoryID)
VALUES
    (1, 'Chang Thai', 0, 32.86, '2025-11-18 18:30:00', 11, 29),
    (2, 'Beans on Broad', 0, 7.44, '2025-11-18 18:30:00', 11, 29),
    (3, 'Home Depot - Blinds', 0, 36.02, '2025-11-18 18:30:00', 11, 31);

SET IDENTITY_INSERT [Transaction] OFF;