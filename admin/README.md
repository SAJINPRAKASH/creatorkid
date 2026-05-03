# CreatorKid Admin Panel

A full-stack Python admin panel for managing CreatorKid website content locally without requiring a backend server.

## Features

- **CRUD Operations**: Create, Read, Update, Delete for all sections:
  - AI Prompts
  - Resources (Presets, Fonts, Templates)
  - AI Tools
  - Blog Posts

- **Image Management**: Upload, manage, and organize images directly from the admin panel

- **Data Persistence**: All changes are saved directly to your `data.js` file

- **Version Control**: Integrated Git functionality:
  - Auto-commit changes
  - Push to GitHub
  - Track changes over time

- **Local-First Workflow**: No backend server needed - everything runs locally

## Installation

### Prerequisites

- Python 3.7+
- Git installed and configured

### Setup

1. **Navigate to the admin folder:**
   ```bash
   cd d:\antigravity\creator_kid\admin
   ```

2. **Update configuration** (Optional):
   Edit `config.py` to configure:
   - GitHub repository URL
   - Data file location
   - Image directories

3. **Initialize Git** (if not already done):
   ```bash
   git init
   git config user.name "Your Name"
   git config user.email "your.email@gmail.com"
   ```

## Usage

### Starting the Admin Panel

```bash
python main.py
```

Or on Linux/Mac:
```bash
python3 main.py
```

### Workflow

1. **Open Admin Panel** - Start the application
2. **Select Section** - Choose from Prompts, Resources, AI Tools, or Blog Posts
3. **Manage Data**:
   - **View**: List shows all items in that section
   - **Add**: Fill form and click "Add New"
   - **Edit**: Select item from list, modify form, click "Save Changes"
   - **Delete**: Select item and click "Delete"
4. **Upload Images**: Click "Select Image" to upload images to `assets/images/`
5. **Sync with GitHub**:
   - Go to Settings tab
   - Enter your GitHub repository URL
   - Click "Set Remote"
   - Click "Push to GitHub" to upload changes

### File Structure

```
admin/
├── main.py              # Entry point
├── admin_panel.py       # GUI application
├── data_manager.py      # Data handling (read/write JS files)
├── git_manager.py       # Git operations
├── config.py            # Configuration
├── requirements.txt     # Python dependencies
└── README.md            # This file
```

## How It Works

### Data Management

The admin panel reads and writes directly to `js/data.js`:

1. **Reading**: Parses JavaScript object syntax and converts to Python dictionaries
2. **Writing**: Converts Python dictionaries back to JavaScript object notation
3. **Validation**: Generates unique IDs automatically

### Image Management

- Images are copied to `assets/images/`
- References in data are stored as relative paths
- Supported formats: PNG, JPG, JPEG, GIF, WEBP

### Git Integration

- **Auto-commit**: Every add/edit/delete automatically commits with a timestamp
- **Manual push**: Push all changes to GitHub when ready
- **Status tracking**: View uncommitted changes in Settings tab

## Workflow Example

### Adding a New Prompt

1. Open Admin Panel → Prompts tab
2. Fill in the form:
   - Title: "YouTube Hook Generator"
   - Category: "Video"
   - Description: "Create viral hooks for YouTube videos"
   - Prompt Text: "Create 5 viral hooks for..."
   - Likes: 0
3. Click "Add New"
4. Item automatically added and committed to Git

### Pushing to GitHub

1. Go to Settings tab
2. Enter your GitHub repo URL: `https://github.com/yourusername/creator_kid.git`
3. Click "Set Remote"
4. Click "Push to GitHub"
5. Changes now live in your repository

## Syncing with Website

Since your website reads from `js/data.js`:

1. **Local changes** → Update data.js via admin panel
2. **Auto-commit** → Changes committed to Git locally
3. **Push to GitHub** → Changes pushed to your repository
4. **Website deployment** → Pull latest changes to your web server or hosting platform

## Tips & Tricks

### Bulk Operations

To perform bulk operations, edit `data.js` directly and the admin panel will reflect changes on next refresh.

### Backup Data

Regular Git commits serve as automatic backups. View commit history:
```bash
git log --oneline
```

### Undo Changes

```bash
git revert <commit-id>
```

### Clone on Another Computer

```bash
git clone https://github.com/yourusername/creator_kid.git
cd creator_kid/admin
python main.py
```

## Troubleshooting

### Git Remote Not Set

```bash
git remote add origin https://github.com/yourusername/creator_kid.git
```

### Permission Denied for Images

Ensure `assets/images/` directory has write permissions.

### Data Not Saving

Check that `js/data.js` is not in use by another application.

## Future Enhancements

- [ ] Multi-user authentication
- [ ] Export/Import functionality
- [ ] Data validation rules
- [ ] Search and filter in lists
- [ ] Batch operations
- [ ] Preview mode for blog posts
- [ ] Custom field definitions

## Support

For issues or feature requests, please refer to the main project repository.

## License

Same as CreatorKid project
