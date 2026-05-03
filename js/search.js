// Search System Logic

function setupSearch(inputSelector, renderFunction, dataArray, containerSelector) {
    const searchInput = document.querySelector(inputSelector);
    const container = document.querySelector(containerSelector);
    
    if (!searchInput || !container) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query === '') {
            renderItems(dataArray, container, renderFunction);
            return;
        }

        // Exact ID match check
        const idMatch = dataArray.filter(item => item.id.toLowerCase() === query);
        
        if (idMatch.length > 0) {
            renderItems(idMatch, container, renderFunction);
            return;
        }

        // Keyword match check (title, category, or description/promptText)
        const keywordMatches = dataArray.filter(item => {
            const titleMatch = item.title && item.title.toLowerCase().includes(query);
            const catMatch = item.category && item.category.toLowerCase().includes(query);
            const descMatch = item.description && item.description.toLowerCase().includes(query);
            const textMatch = item.promptText && item.promptText.toLowerCase().includes(query);
            
            return titleMatch || catMatch || descMatch || textMatch;
        });

        if (keywordMatches.length > 0) {
            renderItems(keywordMatches, container, renderFunction);
        } else {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0;">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--border-color); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--text-muted);">No results found for "${query}"</h3>
                    <p>Try searching for a different keyword or ID (e.g., CK001)</p>
                </div>
            `;
        }
    });
}

function renderItems(items, container, renderFunction) {
    container.innerHTML = items.map(item => renderFunction(item)).join('');
}
