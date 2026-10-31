// Automatically update the copyright year
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Restore and toggle the saved color theme
const themeToggle = document.getElementById("theme-toggle");
const getSavedTheme = () => {
    try {
        return localStorage.getItem("portfolio-theme");
    } catch (error) {
        console.warn("Unable to read the saved portfolio theme.", error);
        return null;
    }
};
const saveTheme = (theme) => {
    try {
        localStorage.setItem("portfolio-theme", theme);
    } catch (error) {
        console.warn("Unable to save the portfolio theme.", error);
    }
};
const savedTheme = getSavedTheme();
const initialTheme = savedTheme === "light" ? "light" : "dark";

document.documentElement.dataset.theme = initialTheme;

if (themeToggle) {
    const updateThemeToggle = (theme) => {
        const isLight = theme === "light";
        themeToggle.textContent = isLight ? "☾ Dark" : "☼ Light";
        themeToggle.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} mode`);
        themeToggle.setAttribute("aria-pressed", String(isLight));
    };

    updateThemeToggle(initialTheme);

    themeToggle.addEventListener("click", () => {
        const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
        document.documentElement.dataset.theme = nextTheme;
        saveTheme(nextTheme);
        updateThemeToggle(nextTheme);
    });
}

// Reveal sections as they enter the viewport
const sections = document.querySelectorAll(".section");

if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
    document.documentElement.classList.add("has-intersection-observer");

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observerInstance.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });
}
