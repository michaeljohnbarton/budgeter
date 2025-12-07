USE budgeter;

SET IDENTITY_INSERT Category ON;

INSERT INTO Category
    (ID, [Name], BankAccountID, IsCredit)
VALUES
    (1, 'Income', 1, 1),
    (2, 'Spending', 1, 0),
    (3, 'Savings', 1, 0),
    (4, 'Savings Pocket', 2, 1),
    (5, 'Pockets', 2, 1),
    (6, 'Income', 3, 1),
    (7, 'Spending', 3, 0);

SET IDENTITY_INSERT Category OFF;