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
const scrollProgress = document.querySelector(".scroll-progress");

function updateScrollUi() {
    if (scrollButton) {
        scrollButton.hidden = window.scrollY < 400;
    }
    if (scrollProgress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
        scrollProgress.style.width = pct.toFixed(2) + "%";
    }
}

window.addEventListener("scroll", updateScrollUi, { passive: true });
window.addEventListener("resize", updateScrollUi);
updateScrollUi();

const hero = document.querySelector(".hero");
const heroPhoto = document.querySelector(".hero-photo");
const photoImg = heroPhoto ? heroPhoto.querySelector("img") : null;

// A pointer that can hover is the only case where a follow effect reads as
// intentional; on touch the same transform just looks like a stuck image.
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

let frame = null;
let pending = null;

function applyTilt() {
    frame = null;
    if (!pending || !heroPhoto) return;

    const rect = heroPhoto.getBoundingClientRect();
    const clamp = (v) => Math.max(-1, Math.min(1, v));
    const dx = clamp((pending.x - (rect.left + rect.width / 2)) / (window.innerWidth / 2));
    const dy = clamp((pending.y - (rect.top + rect.height / 2)) / (window.innerHeight / 2));

    heroPhoto.style.setProperty("--shift-x", (dx * 10).toFixed(2) + "px");
    heroPhoto.style.setProperty("--shift-y", (dy * 10).toFixed(2) + "px");
    heroPhoto.style.setProperty("--tilt-x", (dx * 7).toFixed(2) + "deg");
    heroPhoto.style.setProperty("--tilt-y", (dy * -7).toFixed(2) + "deg");

    if (photoImg) {
        photoImg.style.setProperty("--img-x", (dx * -14).toFixed(2) + "px");
        photoImg.style.setProperty("--img-y", (dy * -14).toFixed(2) + "px");
    }
    pending = null;
}

function resetTilt() {
    if (!heroPhoto) return;
    ["--shift-x", "--shift-y", "--tilt-x", "--tilt-y"].forEach((v) => heroPhoto.style.removeProperty(v));
    if (photoImg) {
        photoImg.style.removeProperty("--img-x");
        photoImg.style.removeProperty("--img-y");
    }
}

function onHeroMove(event) {
    pending = { x: event.clientX, y: event.clientY };
    if (frame === null) frame = requestAnimationFrame(applyTilt);
}

if (hero && heroPhoto && canHover.matches && !prefersReduced.matches) {
    hero.addEventListener("pointermove", onHeroMove);
    hero.addEventListener("pointerleave", () => {
        pending = null;
        if (frame !== null) {
            cancelAnimationFrame(frame);
            frame = null;
        }
        resetTilt();
    });
}
