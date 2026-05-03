// Prompts Specific Logic

function renderPromptCard(item) {
    const imageSection = item.image ? `
        <div class="prompt-image-preview">
            <div class="prompt-image-label">
                <i class="fas fa-image"></i> Preview Output
            </div>
            <img src="${item.image}" alt="Preview of ${item.title} output" loading="lazy" onclick="openPromptImageModal('${item.image}', '${item.title.replace(/'/g, "\\'")}')">
        </div>` : '';

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
            
            ${imageSection}

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

function openPromptImageModal(src, title) {
    // Remove existing modal if present
    const existing = document.getElementById('prompt-img-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'prompt-img-modal';
    modal.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 9999;
        display: flex; align-items: center; justify-content: center;
        backdrop-filter: blur(6px); cursor: zoom-out; animation: fadeIn 0.2s ease;
    `;
    modal.innerHTML = `
        <div style="max-width: 90vw; max-height: 90vh; position: relative;" onclick="event.stopPropagation()">
            <button onclick="document.getElementById('prompt-img-modal').remove()" style="
                position: absolute; top: -14px; right: -14px; background: #7C3AED;
                border: none; color: #fff; width: 32px; height: 32px; border-radius: 50%;
                cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center;
                box-shadow: 0 4px 12px rgba(124,58,237,0.5);
            "><i class="fas fa-times"></i></button>
            <img src="${src}" alt="${title}" style="
                max-width: 90vw; max-height: 85vh; border-radius: 12px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.8); display: block;
            ">
            <p style="text-align:center; color: #94A3B8; font-size: 0.85rem; margin-top: 0.75rem;">${title} — Preview Output</p>
        </div>
    `;
    modal.addEventListener('click', () => modal.remove());
    document.body.appendChild(modal);
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
