# QUICK START GUIDE - CreatorKid Admin Panel

## What You Need

1. **Python 3.7 or higher** - [Download here](https://www.python.org/downloads/)
2. **Git** - [Download here](https://git-scm.com/download/win) (for Windows)
3. **GitHub Account** - [Sign up here](https://github.com/)

## Step 1: Initial Setup (One Time)

### Windows Users

1. Open Command Prompt (Win+R, type `cmd`)
2. Navigate to the admin folder:
   ```
   cd d:\antigravity\creator_kid\admin
   ```
3. Run the admin panel:
   ```
   python main.py
   ```

### Mac/Linux Users

1. Open Terminal
2. Navigate to the admin folder:
   ```
   cd /path/to/creator_kid/admin
   ```
3. Run the admin panel:
   ```
   python3 main.py
   ```

## Step 2: Configure Git (First Time Only)

When you open the admin panel:

1. Go to **Settings** tab
2. A dialog will ask "Initialize a git repository?" → Click **Yes**
3. Enter your GitHub repository URL (format: `https://github.com/yourusername/creator_kid.git`)
4. Click **Set Remote**

Configure Git in Command Prompt:
```
git config user.name "Your Name"
git config user.email "your.email@gmail.com"
```

## Step 3: Add Content

### Adding a Prompt

1. Click **Prompts** tab
2. Fill the form:
   - **Title**: "AI Email Generator"
   - **Category**: "Email Marketing"
   - **Description**: "Generate personalized emails with AI"
   - **Prompt Text**: Paste your full prompt here
   - **Likes**: 0 (or any number)
3. Click **Add New** button
4. ✅ Done! Item is saved and committed

### Adding a Resource

1. Click **Resources** tab
2. Fill the form with title, category, description
3. Click **Select Image** to upload a preset/template image
4. Click **Add New**
5. ✅ Image and data saved automatically

### Adding a Blog Post

1. Click **Blog Posts** tab
2. Fill in:
   - **Title**: "How to Use AI for Content"
   - **Excerpt**: Short summary (1-2 sentences)
   - **Content**: Full article (can include HTML)
   - **Date**: Current date (e.g., "Jan 15, 2024")
3. Upload a featured image
4. Click **Add New**
5. ✅ Post ready to read on your website

## Step 4: Sync with GitHub

After making changes:

1. Go to **Settings** tab
2. Click **Push to GitHub** button
3. Changes uploaded to your repository
4. Your website automatically has the latest data when it pulls from Git

## Common Tasks

### Edit an Item

1. Select item from the list (left side)
2. Click **Edit** button
3. Form will populate with current data
4. Make your changes
5. Click **Save Changes**
6. ✅ Updated and committed

### Delete an Item

1. Select item from list
2. Click **Delete** button
3. Confirm deletion
4. ✅ Item removed and committed

### View Git Status

1. Go to **Settings** tab
2. Click **Refresh Status**
3. See all uncommitted changes

### Undo Changes

Open Command Prompt in your project folder:
```
git log --oneline                    # View all commits
git revert <commit-id>               # Undo a specific commit
git reset --hard HEAD~1              # Undo last commit (use carefully!)
```

## File Structure

```
d:\antigravity\creator_kid\
├── index.html
├── blog.html
├── js/
│   └── data.js              ← All your data is here!
├── assets/
│   └── images/              ← Uploaded images go here
└── admin/                   ← This admin panel
    ├── main.py              ← Run this to start
    ├── admin_panel.py
    ├── data_manager.py
    ├── git_manager.py
    ├── config.py
    └── README.md
```

## The Workflow

```
1. Open Admin Panel (python main.py)
                ↓
2. Make changes (Add/Edit/Delete items)
                ↓
3. Changes auto-commit to Git
                ↓
4. Click "Push to GitHub"
                ↓
5. Your website pulls latest data.js
                ↓
6. Website updates instantly!
```

## Tips

- **Images**: Always use PNG or JPG format, under 2MB each
- **Titles**: Keep them descriptive but not too long (50 characters max)
- **Descriptions**: 1-2 sentences, engaging preview text
- **Content**: For blog posts, you can use basic HTML
- **Backup**: Git automatically saves all changes - you have full history!

## Troubleshooting

### "Git command not found"
→ Install Git from https://git-scm.com/download/win

### "Python not found"
→ Install Python from https://www.python.org/downloads/
→ Make sure to check "Add Python to PATH" during installation

### Images not uploading
→ Check that you have write permission to `assets/images/` folder

### Changes not syncing to website
→ Make sure your website is pulling from GitHub, not serving locally

## Support

- Read `README.md` in the admin folder for detailed documentation
- Check GitHub for any issues or guides
- Review `config.py` to understand settings

## Next Steps

1. ✅ Run the admin panel
2. ✅ Configure Git remote
3. ✅ Add your first prompt/resource
4. ✅ Push to GitHub
5. ✅ Deploy on your website

**You now have a full-stack system without any backend server!** 🚀
