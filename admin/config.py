# Configuration for Admin Panel
import os
from pathlib import Path

# Project root
PROJECT_ROOT = Path(__file__).parent.parent
DATA_FILE = PROJECT_ROOT / "js" / "data.js"
ASSETS_DIR = PROJECT_ROOT / "assets"
IMAGES_DIR = ASSETS_DIR / "images"
DOWNLOADS_DIR = ASSETS_DIR / "downloads"

# Ensure directories exist
ASSETS_DIR.mkdir(exist_ok=True)
IMAGES_DIR.mkdir(exist_ok=True)
DOWNLOADS_DIR.mkdir(exist_ok=True)

# Git configuration
GIT_REPO_URL = "your_github_repo_url_here"  # Update this with your GitHub repo

# App Version
APP_VERSION = "1.0.0"

# Supported image formats
SUPPORTED_FORMATS = ('.png', '.jpg', '.jpeg', '.gif', '.webp')

# Category options for dropdowns
CATEGORY_OPTIONS = {
    'prompts': ['Marketing', 'Freelance', 'Content', 'Video', 'Sales', 'Growth'],
    'resources': ['Presets', 'Fonts', 'Templates', 'Filters', 'Tools', 'Brushes', 'Gradients', 'Mockups'],
    'aiTools': ['Text Generation', 'Image Generation', 'Workflow', 'Marketing', 'Analytics'],
    'blogPosts': ['Strategy', 'AI', 'Tools', 'Creator Economy', 'Growth']
}

# Data sections
SECTIONS = {
    'prompts': 'Prompts',
    'resources': 'Resources',
    'aiTools': 'AI Tools',
    'blogPosts': 'Blog Posts'
}