# 8 - Combine everything into one repo

## Summary
* **ID** - 8
* **Name** - Combine everything into one repo
* **Status** - Done

## Description
(No description)

## Comments
- budgeter-database is set up as the base repo and ready to go for the combination, pushed up to remote repo in GitHub
  - budgeter-api partially done, everything is renamed, just need to move folders into sub-folder then push up to remote repo for merge into the other one
- Moved budgeter-api into sub-folder and committed
  - Realized I only changed author date, not commiter date as well in database commits. I want to go fix this and also update all existing commits in all 3 repos to be more clear about DB vs API vs UI where necessary
  - Go back and fix DB commits first, then finish API and push that up then merge, then finally get to UI
- Tested committer date edit for most recent commit in database repo, looks like it worked! Just gotta go back and do the other ones too
- Finished committer date edit for all commits in database and API repos
  - Merged API repo into database one, tried to do linear histories but couldn’t and probably shouldn’t anyways and it looks fine the way I did it
  - Now need to go update repo and history for UI repo then merge it in
- Finally finished everything