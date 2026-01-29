// Alapértelmezett állapot
let currentPage = 'home';

document.addEventListener("DOMContentLoaded", () => {
    loadContent('home'); // Induláskor betöltjük a home-ot
});

function setLanguage(lang) {
    // 1. Nyelv beállítása a BODY osztályán keresztül (ez az új módszer)
    if (lang === 'en') {
        document.body.classList.add('en-mode');
        // Opcionális: böngészőfül címének cseréje
        document.title = "László Adrián Madár Portfolio";
    } else {
        document.body.classList.remove('en-mode');
        document.title = "Madár László Adrián Portfólió";
    }

    // 2. Gombok stílusának frissítése
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${lang}`).classList.add('active');

    // 3. Jelenlegi tartalom újratöltése az új nyelven
    // (A keret szövegei automatikusan váltanak a CSS miatt, nem kell updateShellText)
    loadContent(currentPage);
}

// Tartalom betöltése (Megtartva a régi animációt!)
async function loadContent(pageName) {
    currentPage = pageName;
    const contentArea = document.getElementById('content-area');
    const styleLink = document.getElementById('dynamic-style');

    // Jelenlegi nyelv meghatározása a class alapján
    const currentLang = document.body.classList.contains('en-mode') ? 'en' : 'hu';

    // Átmeneti animáció (kifakulás) - EZT MEGTARTOTTUK!
    contentArea.style.opacity = '0';

    setTimeout(async () => {
        try {
            // Betöltés a megfelelő nyelvi mappából
            const response = await fetch(`content/${currentLang}/${pageName}.html`);

            if (!response.ok) throw new Error('Az oldal nem található');

            const html = await response.text();
            contentArea.innerHTML = html;

            // Stílus cseréje
            styleLink.href = `static/css/${pageName}/style.css`;

            // Visszaúsztatás (megjelenés)
            contentArea.style.opacity = '1';

        } catch (error) {
            console.error(error);
            contentArea.innerHTML = `<h2>Hiba történt a betöltéskor / Error loading content.</h2>`;
            contentArea.style.opacity = '1';
        }
    }, 200); // 200ms késleltetés az animációhoz
}