const body = document.body;


export function setupDarkMode() {
const saved = localStorage.getItem("theme");
    // Apply saved theme
    if (saved === "dark") body.classList.add("dark");

       // Get toggle button (may not exist on all pages)
    const themeTogglebtn = document.getElementById("theme-toggle") as HTMLButtonElement| null;
    // Only add listener if button exists
    if (themeTogglebtn) {
    themeTogglebtn.addEventListener("click", () => {
        body.classList.toggle("dark");
        const mode = body.classList.contains("dark") ? "dark" : "light";
        localStorage.setItem("theme", mode);
    });
}
}
