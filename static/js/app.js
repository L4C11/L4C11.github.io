let currentPage = 'home';

document.addEventListener("DOMContentLoaded", () => {
    // Hash ellenőrzése az URL-ben (pl. #projects vagy #home)
    const hash = window.location.hash.substring(1);
    currentPage = (hash === 'projects' || hash === 'home') ? hash : 'home';

    // Tartalom betöltése
    loadContent(currentPage);
});

// A böngésző vissza/előre gombjainak támogatása
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    const page = (hash === 'projects' || hash === 'home') ? hash : 'home';
    if (page !== currentPage) {
        loadContent(page);
    }
});

async function loadContent(pageName) {
    currentPage = pageName;

    // URL hash frissítése
    if (window.location.hash.substring(1) !== pageName) {
        window.location.hash = pageName;
    }

    const contentArea = document.getElementById('content-area');
    const styleLink = document.getElementById('dynamic-style');

    // Átmeneti animáció (kifakulás)
    contentArea.style.opacity = '0';

    setTimeout(async () => {
        try {
            // Közvetlen betöltés a content/ mappából
            const response = await fetch(`content/${pageName}.html`);

            if (!response.ok) throw new Error('Page not found');

            const html = await response.text();
            contentArea.innerHTML = html;

            // Dinamikus CSS cseréje
            styleLink.href = `static/css/${pageName}/style.css`;

            // Megjelenítés
            contentArea.style.opacity = '1';

        } catch (error) {
            console.error(error);
            contentArea.innerHTML = `<h2>Error loading content.</h2>`;
            contentArea.style.opacity = '1';
        }
    }, 200);
}