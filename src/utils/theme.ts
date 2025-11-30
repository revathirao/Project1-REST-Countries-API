//Selects the main HTML <body> element and stores it in a constant variable.
const body = document.body;


// Defines an exported function `setupDarkMode` that handles theme switching logic.
export function setupDarkMode() {
    
    // Checks the browser's local storage for a previously saved theme preference ("dark" or "light").
    const saved = localStorage.getItem("theme");
    
    // Apply saved theme
    if (saved === "dark") body.classList.add("dark");

    // Get toggle button (may not exist on all pages)
    const themeTogglebtn = document.getElementById("theme-toggle") as HTMLButtonElement| null;
    
    // Only add listener if button exists
    if (themeTogglebtn) { 
    
    // If the button exists, adds a click event listener to it.
    themeTogglebtn.addEventListener("click", () => {
        
       // Toggles the presence of the 'dark' class on the body element (switches theme).  
        body.classList.toggle("dark");
        
        // Determines the *new* current mode after the toggle action.
        const mode = body.classList.contains("dark") ? "dark" : "light";
        
        // Saves the new theme preference ("dark" or "light") back into local storage for future visits.
        localStorage.setItem("theme", mode);
    });
    }
}
