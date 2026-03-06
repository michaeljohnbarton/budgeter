USE budgeter;

SET IDENTITY_INSERT [Transaction] ON;

INSERT INTO [Transaction]
	(ID, [Description], IsCredit, AmountCents, EnteredDateUtc, MonthID, SubcategoryID)
VALUES
	(1, 'Chang Thai', 0, 3286, '2025-11-18 18:30:00', 11, 29),
	(2, 'Beans on Broad', 0, 744, '2025-11-18 18:30:00', 11, 29),
	(3, 'Home Depot - Blinds', 0, 3602, '2025-11-18 18:30:00', 11, 31);

SET IDENTITY_INSERT [Transaction] OFF;