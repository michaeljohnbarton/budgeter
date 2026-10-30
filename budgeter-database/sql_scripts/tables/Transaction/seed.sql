USE budgeter;

SET IDENTITY_INSERT [Transaction] ON;

INSERT INTO [Transaction]
	(ID, [Description], IsCredit, AmountCents, EnteredDateUtc, MonthID, SubcategoryID)
VALUES
	(1, 'Chang Thai', 0, 3286, '2026-10-10 18:30:00', 22, 29),
	(2, 'Beans on Broad', 0, 744, '2026-10-10 18:30:00', 22, 29),
	(3, 'Home Depot - Blinds', 0, 3602, '2026-10-10 18:30:00', 22, 31);

SET IDENTITY_INSERT [Transaction] OFF;