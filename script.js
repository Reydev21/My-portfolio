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

function closeMobileMenu() {
    const navbar = document.querySelector(".dropdown");
    if (navbar) {
        navbar.style.transform = "translateY(-500px)";
    }
}

document.querySelectorAll(".links a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

const texts = ["Web Developer", "Cybersecurity Enthusiast"];
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

const THEME_KEY = "portfolio-theme";

function currentTheme() {
    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function syncThemeButton() {
    const btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    const dark = currentTheme() === "dark";
    btn.setAttribute("aria-pressed", String(dark));
    btn.setAttribute("aria-label", dark ? "Switch to light background" : "Switch to dark background");
}

function toggleTheme() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
        localStorage.setItem(THEME_KEY, next);
    } catch (e) {
        // private browsing can block storage; the toggle still works for this visit
    }
    syncThemeButton();
}

syncThemeButton();

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

const scrollButton = document.querySelector(".scroll-button");

function updateScrollButton() {
    if (!scrollButton) return;
    scrollButton.hidden = window.scrollY < 400;
}

window.addEventListener("scroll", updateScrollButton, { passive: true });
updateScrollButton();
