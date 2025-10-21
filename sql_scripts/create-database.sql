USE master;
GO

IF DB_ID(N'budgeter') IS NOT NULL
    DROP DATABASE budgeter;
GO

CREATE DATABASE budgeter;
GO