const themeTogglebtn: HTMLButtonElement = document.getElementById("theme-toggle") as HTMLButtonElement
const body = document.body;

themeTogglebtn.addEventListener("click",function(){
body.classList.toggle("dark-mode");
body.classList.toggle("light-mode");

if(body.classList.contains("dark-mode")){
    themeTogglebtn.textContent="Switch to Light Mode";
}else{
    themeTogglebtn.textContent="Switch to Dark Mode"
}

})

