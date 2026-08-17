# 23 - Refactor API connectivity error handling

## Summary
* **ID** - 23
* **Name** - Refactor API connectivity error handling
* **Status** - Done

## Description
Started working on UI for update functionality then ran into another API connectivity issue. Think I came up with a good solution where anytime we get an error message of Failed to fetch, we set the error so then Configuration page displays it. See screenshots attached

## Comments
- ![image.webp](https://trello.com/1/cards/69a210b54ea246178a8498e1/attachments/69a211020d46a5864b4d0271/previews/69a211020d46a5864b4d027f/download/image.webp)
- ![image.webp](https://trello.com/1/cards/69a210b54ea246178a8498e1/attachments/69a2113c165b7f9fe5686f2c/previews/69a2113d165b7f9fe5686f48/download/image.webp)
- Started this in months with a string constants file, continue it and finish months then other context files
- Also ended up extracting to common apiService with individual ones for each service calling it