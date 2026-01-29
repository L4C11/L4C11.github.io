// Alapértelmezett betöltés indításkor
document.addEventListener("DOMContentLoaded", () => {
    loadContent('home'); // Alapból a home töltődjön be
});

async function loadContent(pageName) {
    const contentArea = document.getElementById('content-area');
    const styleLink = document.getElementById('dynamic-style');

    try {
        // 1. HTML tartalom lekérése a 'content' mappából
        const response = await fetch(`content/${pageName}.html`);
        
        if (!response.ok) throw new Error('Az oldal nem található');
        
        const html = await response.text();
        
        // 2. Tartalom beillesztése a keretbe
        contentArea.innerHTML = html;

        // 3. CSS fájl cseréje a megadott szabályaid szerint
        styleLink.href = `static/css/${pageName}/style.css`;
        
    } catch (error) {
        contentArea.innerHTML = `<h2>Hiba történt a tartalom betöltésekor.</h2><p>${error.message}</p>`;
    }
}