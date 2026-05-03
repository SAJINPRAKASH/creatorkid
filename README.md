# CreatorKid

![CreatorKid Logo](assets/logo/logo_creator_kid.png)

**CreatorKid** is a premium, high-performance platform for modern creators to browse, manage, and download digital resources, AI prompts, presets, and tools. Built with a sleek, dark-themed UI and backed by a lightweight Python CMS.

## 🚀 Features

- **Dynamic Frontend**: A highly responsive, frontend-only architecture powered by Vanilla JS arrays, allowing for ultra-fast rendering and easy deployments.
- **Python Admin Panel**: A dedicated Tkinter-based CMS (`admin_panel.py`) allowing non-technical users to effortlessly add, edit, and manage Prompts, Resources, AI Tools, and Blog Posts.
- **Real-Time Search & Filtering**: Client-side, instant search and category filtering for all resources and prompts.
- **File Management Engine**: Fully integrated asset handling that automatically copies uploaded images and downloadable files (like `.dng`, `.zip`, `.psd`) to the correct asset directories.
- **100% Mobile Responsive**: Carefully crafted CSS grid system that looks flawless on Desktop, Tablet, and Mobile devices.

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3 (Vanilla + Custom Properties), JavaScript (Vanilla)
- **Backend / CMS**: Python 3.x, Tkinter, Pillow
- **Data Store**: Centralized `data.js` Javascript JSON-like arrays.

## 📁 Project Structure

```
├── admin/                  # Python CMS Admin Panel
│   ├── admin_panel.py      # Main GUI entry point
│   ├── data_manager.py     # JS data parsing engine
│   ├── git_manager.py      # Git integration for CMS
│   └── config.py           # Admin configuration
├── assets/                 # Static files
│   ├── images/             # Uploaded image thumbnails
│   └── downloads/          # Downloadable resource files
├── css/                    # Global stylesheets
├── js/                     # Frontend logic
│   ├── app.js              # Global interactions & rendering
│   ├── data.js             # Central data store
│   └── search.js           # Search algorithms
├── index.html              # Landing Page
├── resources.html          # Resources Directory
├── prompts.html            # AI Prompts Library
└── ai-tools.html           # AI Tools Directory
```

## 💻 Getting Started

### Running the Web Application
Because the entire frontend is built with static files and vanilla JS, you do not need a web server or build process to run the app.
1. Simply double-click `index.html` to open it in your default web browser.
2. (Optional) For the best experience, use a local live server extension (like VS Code Live Server).

### Running the Admin Panel (CMS)
To manage the data on the website, use the included Python Admin Panel.

**Prerequisites:**
- Python 3.8+
- Pillow library

**Installation & Execution:**
```bash
# 1. Install required dependencies
pip install -r requirements.txt

# 2. Run the Admin Panel
python admin/admin_panel.py
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
