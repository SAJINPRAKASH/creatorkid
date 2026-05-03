// Category Filter System Logic

function setupFilters(filterSelector, itemSelector, containerSelector) {
    const filterBtns = document.querySelectorAll(filterSelector);
    const container = document.querySelector(containerSelector);
    
    if (!filterBtns.length || !container) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter').toLowerCase();
            const items = document.querySelectorAll(itemSelector);
            
            let hasVisible = false;

            items.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                    // Retrigger fade-in animation
                    item.classList.remove('fade-in');
                    void item.offsetWidth; // trigger reflow
                    item.classList.add('fade-in');
                    hasVisible = true;
                } else {
                    item.classList.add('hidden');
                }
            });

            // Handle empty state
            let emptyState = container.querySelector('.empty-state');
            if (!hasVisible) {
                if (!emptyState) {
                    emptyState = document.createElement('div');
                    emptyState.className = 'empty-state';
                    emptyState.style.gridColumn = '1 / -1';
                    emptyState.style.textAlign = 'center';
                    emptyState.style.padding = '4rem 0';
                    emptyState.innerHTML = `
                        <i class="fas fa-folder-open" style="font-size: 3rem; color: var(--border-color); margin-bottom: 1rem;"></i>
                        <h3 style="color: var(--text-muted);">No items found in this category</h3>
                    `;
                    container.appendChild(emptyState);
                }
            } else if (emptyState) {
                emptyState.remove();
            }
        });
    });
}
