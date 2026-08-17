# 15 - Add basic configuration of months

## Summary
* **ID** - 15
* **Name** - Add basic configuration of months
* **Status** - Done

## Description
On Configuration screen, add…

- The ability to view all months - DONE
  - Scrollable list
- The ability to add a month - DONE
  - Via a plus/new button
  - Dialog to do so
  - Dropdown of Jan-Dec
  - Custom input for year - must be between 2000-3000
  - Verify doesn’t already exist
- The ability to edit a month
  - Using the same dialog as adding
- The ability to delete a month
  - X button in each row when viewing
  - Make sure there’s a confirmation dialog
- Make sure this (and all other existing functionality) works with empty database

## Comments
- View of months is done
- Month modal to add is in progress. The modal and form itself look good visually, just need to finish following functionality:
  - - ~~Validation of year input~~
  - - Saving of data (with API call)
  - Then move onto edit functionality after a commit of above
- Finished validation of form. Now just need to finish…
  - - ~~saving of data~~
  - - ~~UI validation that month doesn’t already exist~~
  - - ~~handle errors calling endpoint~~
  - - ~~implementation of the endpoint~~
  - Also caught these while demoing to Emily
  - - ~~Only show browser confirm for closing during Add mode if anything is entered~~
  - - ~~Year input is going to 0 when backspacing all the way~~
- Finished implementation of endpoint and even added some error handling. Last bit I think is just to do some input validation on the endpoint with ModelState?
  - Once done, then just check over everything and see if there’s anything else I wanna do before moving on to removing the Name from database.
- Done with last comment and also Name removal. Next thing to work on is Edit functionality.
- Edit is pretty much done, just want to test some things with the API itself
  - - Input validation
  - - What happens when trying to edit something that doesn’t exist - 404?
  - Also considering whether I should put ID in path instead, more RESTful
  - Then after this, just review and clean up any code necessary before committing
- Finished everything! Including delete and verification of functionality with no months in database.