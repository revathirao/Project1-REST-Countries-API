const themeTogglebtn: HTMLButtonElement = document.getElementById("theme-toggle") as HTMLButtonElement
const body = document.body;

// themeTogglebtn.addEventListener("click",function(){
// body.classList.toggle("dark-mode");
// body.classList.toggle("light-mode");

// if(body.classList.contains("dark-mode")){
//     themeTogglebtn.textContent="Switch to Light Mode";
// }else{
//     themeTogglebtn.textContent="Switch to Dark Mode"
// }

// })



// themeTogglebtn.addEventListener("click",function(){
//     document.body.classList.toggle("dark");
//     localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
// });

// if (localStorage.getItem("theme") === "dark") {
//     document.body.classList.add("dark");
// }

export function setupDarkMode() {
const saved = localStorage.getItem("theme");
    if (saved === "dark") body.classList.add("dark");

themeTogglebtn.addEventListener("click", () => {
        body.classList.toggle("dark");
        const mode = body.classList.contains("dark") ? "dark" : "light";
        localStorage.setItem("theme", mode);
    });
}
