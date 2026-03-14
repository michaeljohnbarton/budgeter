USE budgeter;

SET IDENTITY_INSERT Category ON;

INSERT INTO Category
	(ID, [Name], [Rank], BankAccountID, IsCredit)
VALUES
	(1, 'Income', 1, 1, 1),
	(2, 'Spending', 2, 1, 0),
	(3, 'Savings', 3, 1, 0),
	(4, 'Savings Pocket', 1, 2, 1),
	(5, 'Pockets', 2, 2, 1),
	(6, 'Income', 1, 3, 1),
	(7, 'Spending', 2, 3, 0);

SET IDENTITY_INSERT Category OFF;