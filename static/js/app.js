let currentPage = '';

function getPageFromHash() {
    const hash = window.location.hash.substring(1);
    return (hash === 'projects' || hash === 'home') ? hash : 'home';
}

// Kezdőoldal betöltése
document.addEventListener("DOMContentLoaded", () => {
    const initialPage = getPageFromHash();
    // Ha nem volt hash az URL-ben, beállítjuk alapértelmezettnek
    if (!window.location.hash) {
        window.location.hash = initialPage;
    }
    loadContent(initialPage);
});

// Oldalváltás figyelése hash változáskor
window.addEventListener('hashchange', () => {
    const page = getPageFromHash();
    if (page !== currentPage) {
        loadContent(page);
    }
});

async function loadContent(pageName) {
    currentPage = pageName;

    const contentArea = document.getElementById('content-area');
    const styleLink = document.getElementById('dynamic-style');

    contentArea.style.opacity = '0';

    setTimeout(async () => {
        try {
            const response = await fetch(`content/${pageName}.html`);
            if (!response.ok) throw new Error('Page not found');

            const html = await response.text();

            // Versenyhelyzet védelme: csak akkor renderelünk, ha még mindig ez az aktív oldal
            if (currentPage === pageName) {
                contentArea.innerHTML = html;
                styleLink.href = `static/css/${pageName}/style.css`;
                contentArea.style.opacity = '1';
            }
        } catch (error) {
            console.error(error);
            if (currentPage === pageName) {
                contentArea.innerHTML = `<h2>Error loading content.</h2>`;
                contentArea.style.opacity = '1';
            }
        }
    }, 200);
}
