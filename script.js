function hamburg() {
    const navbar = document.querySelector(".dropdown");
    if (navbar) {
        navbar.style.transform = "translateY(0)";
    }
}

function cancel() {
    const navbar = document.querySelector(".dropdown");
    if (navbar) {
        navbar.style.transform = "translateY(-500px)";
    }
}

const texts = ["Web Developer", "UI/UX Designer", "Cybersecurity Enthusiast"];
let speed = 100;
const textElements = document.querySelector(".typewriter-text");
let textIndex = 0;
let characterIndex = 0;

function typeWriter() {
    if (!textElements) return;

    if (characterIndex < texts[textIndex].length) {
        textElements.textContent += texts[textIndex].charAt(characterIndex);
        characterIndex++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(eraseText, 1200);
    }
}

function eraseText() {
    if (!textElements) return;

    if (textElements.textContent.length > 0) {
        textElements.textContent = textElements.textContent.slice(0, -1);
        setTimeout(eraseText, 50);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        characterIndex = 0;
        setTimeout(typeWriter, 500);
    }
}

window.addEventListener("load", typeWriter);
