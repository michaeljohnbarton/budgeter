# 4 - Create initial database project/plan

## Summary
* **ID** - 4
* **Name** - Create initial database project/plan
* **Status** - Done

## Description
- Determine how I want to have SQL scripts set up
- I want to be able to spin up a Docker container on the fly from a database schema
  - Should also be able to specify whether to seed data or not
  - Dockerfile? PowerShell or other script?
- Also want to make sure that SQL scripts can apply to an existing database without disruption
  - Yet still preserve edit/version history

## Comments
- Not going to do Docker file right now, at least just documented important values in README.md
  - Figured out initial idea of create, update and seed separate SQL scripts
  - Need to look into Python side of things, especially how to handle dependencies/foreign constraints most easily with respect to ordering script executions
- What if I have to add a foreign key constraint LATER?
  - I think I would just make sure it’s set up correctly in dependencies.json
- Done, README.md contains all necessary information