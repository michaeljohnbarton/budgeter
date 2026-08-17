# 17 - Bank Accounts

## Summary
* **ID** - 17
* **Name** - Bank Accounts
* **Status** - Done

## Description
Just implement the same UI grid and API endpoints as Month.

Do it in the order of CRUD this time to try it out.

## Comments
- Started implementing create bank account form and have Modal with a single input field for name which is console.logged when clicking Save. Nothing further to do with that.
  - Need to go back and handle CSS module styling to make sure nothing conflicts.
- Looks like I handled CSS module styling on Jan 21
- Updated CSS module styling for Bank Accounts as well and got create functionality connected all the way through API and DB with just Name input.
  - Now need to add the other two inputs through entire stack (predefined dropdown list and checkbox)
- Got Monthly Balance Propagation Type mostly working, need to convert enum back to string for DB
- Creation is done, onto GET/read and display
- Working on GET endpoint, last thing is to deal with the enum and making the map a little cleaner
- GET endpoint is done, clean up UI and test empty case with actual endpoint
- GET functionality is done in general, move onto Update next
- Finished update and delete