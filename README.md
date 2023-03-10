# Pokemon Picker by CWF

🚀 Project build with React, Tailwind CSS and TypeScript ⚡️
### Features

- Save user information immediately upon input
- Allow only 10-digit Canadian phone numbers
- Search for Pokémon by name and apply filters with autocomplete.
- Make header clickable to navigate to the previous page.
- Allow users to review and edit input
- Enable dark mode
- Make the website mobile-responsive and mobile-friendly by using a drawer for their records and refining their search
- Manage user records by deleting them
- Keep track of user input as they progress through the flow
- Enable deep linking to a specific step in the flow (using "/?page=1")
---

### Progress Log
<details>
  <summary>3 Mar</summary>
  
  - Integrating Tailwind CSS into the project to ensure visually appealing user interfaces.
  - Utilizing the "useForm" function from the "react-hook-form" plugin to effectively handle form validation, improving the overall user experience.
  - Implementing the "useDebounce" hook to store form data in local storage, resulting in a better performing application.
  - Creating a custom hook (useFormData) to load and save form data from local storage when there is a change in the form data, improving data management.
  - Calling an API to retrieve a Pokemon by name or ID using a search bar, providing users with more options for finding their desired Pokemon.
  - Displaying the Pokemon item on the application, ensuring that users can easily view the Pokemon's attributes.
  - Adding a click handler to the Pokemon item to enable users to favorite the Pokemon, improving user engagement and satisfaction.
  - Creating a custom hook (useSelectPokemon) to to load and save data of user's selected Pokemon from local storage when there is a change in the form data, improving data management.And allowing users to save multiple favorites pokemon without losing data.
</details>

---
<details>
  <summary>6 Mar</summary>
  
  - Create review page with submission capability using custom hooks.
  - Add useIsMobile for responsive UI.
 
</details>

---
<details>
  <summary>7 Mar</summary>
  
  - Expand search functionality to include other categories.
  - Introduce dark mode using useDarkMode.
  - Incorporate Material UI icons into the design.
 
</details>

---
<details>
  <summary>8 Mar</summary>
  
  - Allow searching for multiple Pokemon by name and pinning the results.
  - Implement useSearchPokemon custom hook to enable search functionality.

 
</details>

---

<details>
  <summary>9 Mar</summary>
  
  - Introduce drawer for mobile user record and mobile refine search using useDrawer.
  - Add count number for selected query type and display the number of Pokemon results returned under the query
  - Implement usePageHandler custom hook to handle deeplinks in the format of /?page (e.g. /?page=1).

 
</details>

---
<details>
  <summary>10 Mar</summary>
  
  - Utilizing ESLint to identify mistakes and enforce coding standards.
  - Including comments to enhance code comprehension
 
</details>

---
