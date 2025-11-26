Challenges Faced and Solutions in the Project
1. Implementing Add and Edit Post Functionality

Problem: Initially, when adding a post, the form would show success alerts even if the content was empty. Editing a post also didn’t update the post correctly in the UI or localStorage.

Solution: Added proper input validation to check that both title and content are provided. Implemented event delegation and unique identifiers for posts to ensure the correct post is updated in localStorage and displayed correctly in the UI after editing.

2. Data Persistence with localStorage

Problem: Posts were not consistently saving or updating in localStorage. Sometimes, edited posts were overwritten, or deleted posts reappeared after refreshing the page.

Solution: Created modular functions for CRUD operations (Create, Read, Update, Delete) to manage posts reliably. Added proper retrieval and parsing of JSON data to ensure the UI always reflected the current state of localStorage.

3. Search, Filter, and Sort Functionality

Problem: Filtering posts by category or searching by keyword sometimes conflicted with each other, leading to incorrect results or duplicated posts.

Solution: Implemented a sequential filtering logic: first filter by category, then search by keyword, and finally sort results. Ensured that each operation worked on a copy of the current posts array to avoid modifying the original data.

4. UI and Layout Issues

Problem: The layout broke on different screen sizes, and some elements like edit/delete buttons were misaligned. Notifications and modals overlapped with content.

Solution: Used CSS Flexbox and Bootstrap classes for responsive layout, adjusted margins and padding, and ensured buttons and alerts had consistent positioning. Tested the interface on multiple screen sizes for consistency.

5. Handling User Input and Preventing Errors

Problem: Users could submit empty forms or invalid data, causing the app to behave unexpectedly.

Solution: Added front-end validation with alerts for empty fields, prevented default form submission when data was invalid, and ensured all input was sanitized before saving to localStorage.

6. Performance and Event Handling

Problem: Adding multiple event listeners caused duplicate triggers and slow performance when many posts were present.

Solution: Used event delegation by attaching a single listener to the parent container for edit and delete actions. This reduced memory usage and ensured smooth interactions.

1. Dark Mode

Challenges:

The dark mode toggle worked on the main page but not on the country details page.

The half moon icon for the toggle was not visible.

Theme changes did not persist when navigating between pages.

Some elements, like detail cards and buttons, did not reflect dark mode styles.

Solutions:

Ensured the toggle button exists on all pages and attached the event listener safely using TypeScript’s null checks.

Corrected the Font Awesome CDN link to display the half moon icon.

Stored the selected theme in localStorage and applied it on page load so dark mode persists across pages.

Updated CSS so all elements, including headers, detail cards, and buttons, inherit dark mode styles.

2. Back Button

Challenges:

Clicking the back button on the country page did not navigate correctly.

An empty page or broken layout appeared because the previous list of countries was not restored.

Solutions:

Used window.history.back() to reliably navigate to the previous page.

Optionally, added a list-section on the country page and re-rendered the country list when the back button was clicked.

✅ Result:

Dark mode toggle works on all pages with the half moon icon visible.

User-selected theme persists across pages.

Back button navigates correctly without showing empty content.