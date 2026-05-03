// Prompts Specific Logic

function renderPromptCard(item) {

    return `
        <div class="card prompt-card fade-in" data-id="${item.id}" data-category="${item.category.toLowerCase()}">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                    <span class="card-badge" style="position: static; display: inline-block; margin-bottom: 0.5rem;">${item.category}</span>
                    <div class="card-id">${item.id}</div>
                    <h3 class="card-title">${item.title}</h3>
                </div>
            </div>
            
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.5rem;">${item.description}</p>
            
            <div class="prompt-text-container">
                <div class="prompt-text" id="prompt-text-${item.id}">${item.promptText}</div>
                <button class="btn-icon" onclick="toggleExpandPrompt(this)" style="position: absolute; bottom: 0.5rem; right: 0.5rem; background: var(--card-bg); border: 1px solid var(--border-color); transform: scale(0.8);" title="Expand">
                    <i class="fas fa-expand-alt"></i>
                </button>
            </div>
            
            <div style="display: flex; justify-content: flex-end; align-items: center; margin-top: auto;">
                <button class="btn btn-outline" onclick="copyPrompt('${item.id}')" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                    <i class="far fa-copy"></i> Copy Prompt
                </button>
            </div>
        </div>
    `;
}

function copyPrompt(id) {
    const textElement = document.getElementById(`prompt-text-${id}`);
    if (textElement) {
        const textToCopy = textElement.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast('Copied Successfully');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            showToast('Failed to copy');
        });
    }
}

function toggleExpandPrompt(btn) {
    const card = btn.closest('.prompt-card');
    const icon = btn.querySelector('i');
    
    card.classList.toggle('expanded');
    
    if (card.classList.contains('expanded')) {
        icon.classList.remove('fa-expand-alt');
        icon.classList.add('fa-compress-alt');
    } else {
        icon.classList.remove('fa-compress-alt');
        icon.classList.add('fa-expand-alt');
    }
}
