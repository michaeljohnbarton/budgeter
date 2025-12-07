USE budgeter;

SET IDENTITY_INSERT [Month] ON;

INSERT INTO [Month]
    (ID, [Month], [Year], [Name])
VALUES
    (0, 0, 0, 'Default'),
    (1, 1, 2025, 'January'),
    (2, 2, 2025, 'February'),
    (3, 3, 2025, 'March'),
    (4, 4, 2025, 'April'),
    (5, 5, 2025, 'May'),
    (6, 6, 2025, 'June'),
    (7, 7, 2025, 'July'),
    (8, 8, 2025, 'August'),
    (9, 9, 2025, 'September'),
    (10, 10, 2025, 'October'),
    (11, 11, 2025, 'November'),
    (12, 12, 2025, 'December'),
    (13, 1, 2026, 'January'),
    (14, 2, 2026, 'February'),
    (15, 3, 2026, 'March'),
    (16, 4, 2026, 'April'),
    (17, 5, 2026, 'May'),
    (18, 6, 2026, 'June'),
    (19, 7, 2026, 'July'),
    (20, 8, 2026, 'August'),
    (21, 9, 2026, 'September'),
    (22, 10, 2026, 'October'),
    (23, 11, 2026, 'November'),
    (24, 12, 2026, 'December');

SET IDENTITY_INSERT [Month] OFF;