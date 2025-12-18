document.addEventListener("DOMContentLoaded", () => {
 const word = "MODERN TODO APP";         
const heading = document.querySelector(".text");
const container = document.querySelector(".container");
let index = 0;

function typeLetter() {
    if (index < word.length) {
        heading.textContent += word[index];
        index++;
        setTimeout(typeLetter, 200);        
    }
    else {
    setTimeout(() => {
        container.classList.add("slide-up");

        // REMOVE from DOM after animation
        setTimeout(() => {
            container.style.display = "none";
        }, 1000); // same as CSS transition
    }, 500);
}

}
typeLetter()

});
