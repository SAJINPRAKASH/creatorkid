// Global UI and Utility Functions

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    setupEmailCapture();
});

// Navbar Scroll Effect and Mobile Menu
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(11, 15, 25, 0.95)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
            } else {
                navbar.style.background = 'rgba(11, 15, 25, 0.8)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
}

// Toast Notification System
function showToast(message) {
    // Remove existing toast if present
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--highlight-cta);"></i> ${message}`;
    
    document.body.appendChild(toast);
    
    // Trigger reflow
    void toast.offsetWidth;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Email Capture Mock
function setupEmailCapture() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('.newsletter-input');
            if (emailInput.value) {
                // Mock storing email
                const emails = getSavedItems('captured_emails');
                emails.push(emailInput.value);
                localStorage.setItem('captured_emails', JSON.stringify(emails));
                
                emailInput.value = '';
                showToast('Thanks for joining!');
            }
        });
    }
}

// Generic Render Functions
function renderResourcesCard(item) {
    return `
        <div class="card fade-in" data-id="${item.id}" data-category="${item.category.toLowerCase()}">
            <div class="card-img-wrapper">
                <span class="card-badge">${item.category}</span>
                <img src="${item.image || 'https://via.placeholder.com/600x400/121826/A3E635?text=CreatorKid'}" alt="${item.title}" loading="lazy">
            </div>
            <div class="card-content">
                <div class="card-id">${item.id}</div>
                <h3 class="card-title">${item.title}</h3>
                <div class="card-stats">
                    <span title="Downloads"><i class="fas fa-download"></i> <span class="download-count">${(item.downloads || 0).toLocaleString()}</span></span>
                    <span><i class="fas fa-star" style="color: #FBBF24;"></i> 4.9</span>
                    <div class="card-actions">
                        <a href="${item.main_file || '#'}" download class="btn-icon" title="Download">
                            <i class="fas fa-cloud-download-alt"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderBlogCard(item) {
    return `
        <div class="card fade-in">
            <div class="card-img-wrapper">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="card-content">
                <div class="card-id">${item.date}</div>
                <h3 class="card-title" style="font-size: 1.1rem;">${item.title}</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    ${item.excerpt}
                </p>
                <a href="blog-post.html?id=${item.id}" class="text-highlight" style="margin-top: auto; font-size: 0.9rem; font-weight: 600;">Read More <i class="fas fa-arrow-right" style="margin-left: 0.5rem;"></i></a>
            </div>
        </div>
    `;
}

function renderAIToolCard(item) {
    return `
        <div class="card ai-tool-card fade-in" data-category="${item.category.toLowerCase()}">
            <div class="card-img-wrapper">
                <span class="card-badge">${item.category}</span>
                <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="card-content">
                <div class="card-id">${item.id}</div>
                <h3 class="card-title">${item.title}</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">${item.description}</p>
                <a href="${item.link}" target="_blank" class="btn btn-outline" style="width: 100%; justify-content: center; margin-top: auto;">
                    Visit Tool <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </div>
    `;
}
