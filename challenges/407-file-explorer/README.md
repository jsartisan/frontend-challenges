Create a **file explorer** like Google Drive in React that allows users to browse an arbitrarily nested folder/file hierarchy.

## Requirements

1. Define a suitable **data model** (in JSON) to represent folders and files.

   * Each folder can contain children (folders or files).
   * Files are leaf nodes.
2. Render the **current folder contents** as a grid of tiles.

   * Folders should be visually distinguishable from files.
   * Clicking a folder drills down into that folder.
   * Files are only displayed (no further action).
3. Display a **breadcrumb trail** at the top.

   * Clicking “Home” resets to the root folder.
   * Clicking an intermediate breadcrumb folder navigates back up to that level.
4. Support **unlimited nesting** based on the JSON data.
5. Use React state/hooks to manage navigation.
6. Prioritize **clean code and UX**.

## Bonus

* Add a **search bar** to filter visible files/folders in the current directory.
* Add a **“back” button** to return to the previously opened folder.
* Add basic **icons** for folders vs. files.
