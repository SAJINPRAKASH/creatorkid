import tkinter as tk
from tkinter import ttk, messagebox, filedialog, scrolledtext
import threading
from datetime import datetime
from pathlib import Path
from data_manager import DataManager
from git_manager import GitManager
from PIL import Image, ImageTk
from config import IMAGES_DIR, DOWNLOADS_DIR, SUPPORTED_FORMATS, CATEGORY_OPTIONS, PROJECT_ROOT

class AdminPanel:
    """Main Admin Panel for CreatorKid"""
    
    def __init__(self, root):
        self.root = root
        self.root.title("CreatorKid - Admin Panel")
        self.root.geometry("1000x700")
        self.root.configure(bg="#0B0F19")
        
        self.data_manager = DataManager()
        self.git_manager = GitManager()
        self.last_selected = {}
        
        # Style configuration
        self.bg_color = "#0B0F19"
        self.card_bg = "#121826"
        self.primary_color = "#7C3AED"
        self.text_color = "#F8FAFC"
        self.muted_color = "#94A3B8"
        
        # Configure ttk styles
        style = ttk.Style()
        style.theme_use('clam')
        style.configure('TFrame', background=self.bg_color)
        style.configure('TLabel', background=self.bg_color, foreground=self.text_color)
        style.configure('TButton', background=self.primary_color, foreground=self.text_color)
        style.configure('TNotebook', background=self.bg_color)
        style.configure('TNotebook.Tab', padding=[20, 10])
        
        self.setup_ui()
        self.check_git_setup()
        
    def setup_ui(self):
        """Setup the main UI"""
        # Top bar with git status
        self.top_frame = ttk.Frame(self.root)
        self.top_frame.pack(fill=tk.X, padx=10, pady=10)
        
        title_label = ttk.Label(self.top_frame, text="CreatorKid Admin Panel", font=("Arial", 16, "bold"))
        title_label.pack(side=tk.LEFT)
        
        self.git_status_label = ttk.Label(self.top_frame, text="Git Status: Checking...", font=("Arial", 10))
        self.git_status_label.pack(side=tk.RIGHT)
        
        # Notebook (tabs)
        self.notebook = ttk.Notebook(self.root)
        self.notebook.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Create tabs
        self.create_prompts_tab()
        self.create_resources_tab()
        self.create_ai_tools_tab()
        self.create_blog_tab()
        self.create_settings_tab()
        
    def create_prompts_tab(self):
        """Create Prompts management tab"""
        tab = ttk.Frame(self.notebook)
        self.notebook.add(tab, text="Prompts")
        
        self._create_section_tab(tab, 'prompts', 'Prompts', [
            ('id', 'ID', 'entry'),
            ('title', 'Title', 'entry'),
            ('category', 'Category', 'dropdown'),
            ('description', 'Description', 'text'),
            ('promptText', 'Prompt Text', 'text'),
            ('image', 'Preview Image (shows how output looks)', 'image'),
        ])
    
    def create_resources_tab(self):
        """Create Resources management tab"""
        tab = ttk.Frame(self.notebook)
        self.notebook.add(tab, text="Resources")
        
        self._create_section_tab(tab, 'resources', 'Resources', [
            ('id', 'ID', 'entry'),
            ('title', 'Title', 'entry'),
            ('category', 'Category', 'dropdown'),
            ('description', 'Description', 'text'),
            ('main_file', 'Main File', 'file'),
            ('image', 'Image', 'image'),
            ('downloads', 'Downloads', 'entry'),
        ])
    
    def create_ai_tools_tab(self):
        """Create AI Tools management tab"""
        tab = ttk.Frame(self.notebook)
        self.notebook.add(tab, text="AI Tools")
        
        self._create_section_tab(tab, 'aiTools', 'AI Tools', [
            ('id', 'ID', 'entry'),
            ('title', 'Title', 'entry'),
            ('category', 'Category', 'dropdown'),
            ('description', 'Description', 'text'),
            ('image', 'Image', 'image'),
            ('link', 'Link', 'entry'),
        ])
    
    def create_blog_tab(self):
        """Create Blog Posts management tab"""
        tab = ttk.Frame(self.notebook)
        self.notebook.add(tab, text="Blog Posts")
        
        self._create_section_tab(tab, 'blogPosts', 'Blog Posts', [
            ('id', 'ID', 'entry'),
            ('title', 'Title', 'entry'),
            ('excerpt', 'Excerpt', 'text'),
            ('image', 'Image', 'image'),
            ('date', 'Date', 'entry'),
            ('content', 'Content', 'text'),
        ])
    
    def create_settings_tab(self):
        """Create Settings tab"""
        tab = ttk.Frame(self.notebook)
        self.notebook.add(tab, text="Settings")
        
        # Git settings
        git_frame = ttk.LabelFrame(tab, text="Git Configuration", padding=10)
        git_frame.pack(fill=tk.X, padx=10, pady=10)
        
        ttk.Label(git_frame, text="Repository URL:").pack(anchor=tk.W)
        self.git_url_entry = ttk.Entry(git_frame, width=60)
        self.git_url_entry.pack(fill=tk.X, pady=5)
        
        ttk.Button(git_frame, text="Set Remote", command=self.set_git_remote).pack(side=tk.LEFT, padx=5)
        ttk.Button(git_frame, text="Push to GitHub", command=self.push_to_github).pack(side=tk.LEFT, padx=5)
        
        # Status
        status_frame = ttk.LabelFrame(tab, text="Git Status", padding=10)
        status_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        self.status_text = scrolledtext.ScrolledText(status_frame, height=15, width=80)
        self.status_text.pack(fill=tk.BOTH, expand=True)
        
        ttk.Button(tab, text="Refresh Status", command=self.refresh_git_status).pack(pady=10)
    
    def _create_section_tab(self, tab, section, section_name, fields):
        """Create a generic CRUD tab for a section"""
        
        # Left panel - List
        left_frame = ttk.Frame(tab)
        left_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        ttk.Label(left_frame, text=f"{section_name} List", font=("Arial", 12, "bold")).pack()
        
        # Search Box
        search_frame = ttk.Frame(left_frame)
        search_frame.pack(fill=tk.X, pady=(0, 5))
        ttk.Label(search_frame, text="Search:").pack(side=tk.LEFT)
        
        if not hasattr(self, 'search_vars'):
            self.search_vars = {}
        search_var = tk.StringVar()
        self.search_vars[section] = search_var
        
        search_entry = ttk.Entry(search_frame, textvariable=search_var)
        search_entry.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=5)
        search_var.trace("w", lambda name, index, mode, s=section: self.refresh_list(s))
        
        # Treeview table with scrollbar
        scrollbar = ttk.Scrollbar(left_frame)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        self.listboxes = getattr(self, 'listboxes', {})
        tree = ttk.Treeview(left_frame, columns=("id", "category", "name"), show="headings", selectmode="browse", height=18)
        tree.heading("id", text="ID")
        tree.heading("category", text="Category")
        tree.heading("name", text="Name")
        tree.column("id", width=100, anchor="w")
        tree.column("category", width=120, anchor="w")
        tree.column("name", width=260, anchor="w")
        tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        tree.bind("<<TreeviewSelect>>", lambda event, s=section, f=fields: self.on_item_select(s, f, event))
        scrollbar.config(command=tree.yview)
        self.listboxes[section] = tree
        
        # Load items
        self.last_selected[section] = None
        self.refresh_list(section)
        
        # Buttons for list
        btn_frame = ttk.Frame(left_frame)
        btn_frame.pack(fill=tk.X, pady=5)
        
        ttk.Button(btn_frame, text="View", command=lambda: self.view_item(section)).pack(side=tk.LEFT, padx=2)
        ttk.Button(btn_frame, text="Edit", command=lambda: self.edit_item(section, fields)).pack(side=tk.LEFT, padx=2)
        ttk.Button(btn_frame, text="Delete", command=lambda: self.delete_item(section)).pack(side=tk.LEFT, padx=2)
        ttk.Button(btn_frame, text="Copy Link", command=lambda: self.copy_link(section)).pack(side=tk.LEFT, padx=2)
        
        # Right panel - Form
        right_frame = ttk.Frame(tab)
        right_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        ttk.Label(right_frame, text="Add/Edit Item", font=("Arial", 12, "bold")).pack()
        
        # Store field entries for this section
        if not hasattr(self, 'field_entries'):
            self.field_entries = {}
        self.field_entries[section] = {}
        
        # Create form fields
        for field_name, field_label, field_type in fields:
            frame = ttk.Frame(right_frame)
            frame.pack(fill=tk.X, pady=5)
            
            ttk.Label(frame, text=field_label).pack(anchor=tk.W)
            
            if field_type == 'entry':
                entry = ttk.Entry(frame, width=40)
                entry.pack(fill=tk.X)
                self.field_entries[section][field_name] = ('entry', entry)
            elif field_type == 'dropdown':
                options = CATEGORY_OPTIONS.get(section, [])
                combobox = ttk.Combobox(frame, values=options, state='readonly', width=38)
                combobox.pack(fill=tk.X)
                if options:
                    combobox.set(options[0])
                self.field_entries[section][field_name] = ('dropdown', combobox)
            elif field_type == 'text':
                text = scrolledtext.ScrolledText(frame, height=4, width=40)
                text.pack(fill=tk.X)
                self.field_entries[section][field_name] = ('text', text)
            elif field_type == 'image':
                image_frame = ttk.Frame(frame)
                image_frame.pack(fill=tk.X)
                
                controls_frame = ttk.Frame(image_frame)
                controls_frame.pack(side=tk.LEFT, fill=tk.Y)
                
                label = ttk.Label(controls_frame, text="No image selected")
                label.pack(anchor=tk.W)
                label.image_path = ""  # Initialize image_path attribute
                ttk.Button(controls_frame, text="Select Image", command=lambda f=field_name, s=section: self.select_image(s, f)).pack(anchor=tk.W, pady=5)
                
                preview_label = ttk.Label(image_frame)
                preview_label.pack(side=tk.RIGHT, padx=10)
                label.preview_label = preview_label
                
                self.field_entries[section][field_name] = ('image', label)
            elif field_type == 'file':
                file_frame = ttk.Frame(frame)
                file_frame.pack(fill=tk.X)
                
                label = ttk.Label(file_frame, text="No file selected")
                label.pack(side=tk.LEFT, padx=(0, 10))
                label.file_path = ""
                
                ttk.Button(file_frame, text="Select File", command=lambda f=field_name, s=section: self.select_file(s, f)).pack(side=tk.LEFT)
                
                self.field_entries[section][field_name] = ('file', label)
        
        # Buttons for form
        btn_frame2 = ttk.Frame(right_frame)
        btn_frame2.pack(fill=tk.X, pady=10)
        
        ttk.Button(btn_frame2, text="Add New", command=lambda: self.add_new_item(section, fields)).pack(side=tk.LEFT, padx=2)
        ttk.Button(btn_frame2, text="Save Changes", command=lambda: self.save_changes(section, fields)).pack(side=tk.LEFT, padx=2)
        ttk.Button(btn_frame2, text="Clear", command=lambda: self.clear_form(section)).pack(side=tk.LEFT, padx=2)
    
    def refresh_list(self, section):
        """Refresh the table view for a section"""
        try:
            data = self.data_manager.read_js_file()
            tree = self.listboxes.get(section)
            
            search_term = ""
            if hasattr(self, 'search_vars') and section in self.search_vars:
                search_term = self.search_vars[section].get().lower()
            
            if tree:
                for child in tree.get_children():
                    tree.delete(child)
                self.last_selected[section] = None
                if section in data:
                    for item in data[section]:
                        item_id = item.get('id', 'N/A')
                        item_category = item.get('category') or '-'
                        display_name = (item.get('title') or 
                                        item.get('name') or 
                                        item.get('excerpt') or 'N/A')
                        
                        # Apply search filter
                        if search_term:
                            if (search_term not in str(item_id).lower() and
                                search_term not in str(item_category).lower() and
                                search_term not in str(display_name).lower()):
                                continue
                        
                        # Use a safe iid that avoids tkinter conflicts
                        safe_iid = str(item_id)
                        tree.insert('', tk.END, iid=safe_iid, values=(item_id, item_category, display_name))
        except Exception as e:
            print(f"Error refreshing list: {e}")
            messagebox.showerror("Error", f"Error refreshing list: {e}")
    
    def add_new_item(self, section, fields):
        """Add a new item"""
        try:
            # Generate ID
            prefix = {'prompts': 'CK', 'resources': 'RS', 'aiTools': 'AT', 'blogPosts': 'BL'}.get(section, 'XX')
            new_id = self.data_manager.generate_id(section, prefix)
            
            # Get form data
            item_data = {'id': new_id}
            
            if section not in self.field_entries:
                messagebox.showerror("Error", "Form not initialized")
                return
            
            for field_name, _, field_type in fields:
                if field_name == 'id':
                    continue
                field_info = self.field_entries[section].get(field_name)
                if field_info:
                    field_type_actual, widget = field_info
                    try:
                        if field_type_actual in ('entry', 'dropdown'):
                            item_data[field_name] = widget.get()
                        elif field_type_actual == 'text':
                            item_data[field_name] = widget.get("1.0", tk.END).strip()
                        elif field_type_actual == 'image':
                            item_data[field_name] = getattr(widget, 'image_path', '')
                        elif field_type_actual == 'file':
                            item_data[field_name] = getattr(widget, 'file_path', '')
                    except Exception as e:
                        print(f"Error getting field {field_name}: {e}")
                        item_data[field_name] = ''
            
            if self.data_manager.add_item(section, item_data):
                messagebox.showinfo("Success", f"Item {new_id} added successfully!")
                self.refresh_list(section)
                self.clear_form(section)
                self.git_manager.auto_commit("ADD", new_id)
            else:
                messagebox.showerror("Error", "Failed to add item")
        except Exception as e:
            messagebox.showerror("Error", f"Error adding item: {e}")
            import traceback
            traceback.print_exc()
    
    def edit_item(self, section, fields):
        """Load selected item into the form for editing"""
        try:
            item_id = self._get_selected_item_id(section)
            if not item_id:
                messagebox.showwarning("Warning", "Please select an item to edit")
                return
            self.load_item_to_form(section, fields, item_id)
        except Exception as e:
            messagebox.showerror("Error", f"Error editing item: {e}")
            import traceback
            traceback.print_exc()
    
    def view_item(self, section):
        """View details for the selected item"""
        try:
            item_id = self._get_selected_item_id(section)
            if not item_id:
                messagebox.showwarning("Warning", "Please select an item to view")
                return
            item = self.data_manager.get_item(section, item_id)
            if not item:
                messagebox.showerror("Error", f"Item {item_id} not found")
                return
            details = "\n".join(f"{key}: {value}" for key, value in item.items())
            view_window = tk.Toplevel(self.root)
            view_window.title(f"View {section} - {item_id}")
            view_window.configure(bg=self.bg_color)
            text = scrolledtext.ScrolledText(view_window, width=80, height=20)
            text.pack(padx=10, pady=10)
            text.insert(tk.END, details)
            text.config(state=tk.DISABLED)
        except Exception as e:
            messagebox.showerror("Error", f"Error viewing item: {e}")
            import traceback
            traceback.print_exc()

    def save_changes(self, section, fields):
        """Save changes to edited item"""
        try:
            if not hasattr(self, 'current_editing_id'):
                messagebox.showwarning("Warning", "Please select an item to edit first")
                return
            
            item_id = self.current_editing_id
            
            if section not in self.field_entries:
                messagebox.showerror("Error", "Form not initialized")
                return
            
            # Get form data
            updated_data = {'id': item_id}
            for field_name, _, field_type in fields:
                if field_name == 'id':
                    continue
                field_info = self.field_entries[section].get(field_name)
                if field_info:
                    field_type_actual, widget = field_info
                    try:
                        if field_type_actual in ('entry', 'dropdown'):
                            updated_data[field_name] = widget.get()
                        elif field_type_actual == 'text':
                            updated_data[field_name] = widget.get("1.0", tk.END).strip()
                        elif field_type_actual == 'image':
                            updated_data[field_name] = getattr(widget, 'image_path', '')
                        elif field_type_actual == 'file':
                            updated_data[field_name] = getattr(widget, 'file_path', '')
                    except Exception as e:
                        print(f"Error getting field {field_name}: {e}")
                        updated_data[field_name] = ''
            
            if self.data_manager.update_item(section, item_id, updated_data):
                messagebox.showinfo("Success", f"Item {item_id} updated successfully!")
                self.refresh_list(section)
                self.clear_form(section)
                self.git_manager.auto_commit("UPDATE", item_id)
            else:
                messagebox.showerror("Error", "Failed to update item")
        
        except Exception as e:
            messagebox.showerror("Error", f"Error saving changes: {e}")
            import traceback
            traceback.print_exc()
    
    def delete_item(self, section):
        """Delete selected item"""
        try:
            item_id = self._get_selected_item_id(section)
            if not item_id:
                messagebox.showwarning("Warning", "Please select an item to delete")
                return
            
            if messagebox.askyesno("Confirm", f"Delete item {item_id}?"):
                if self.data_manager.delete_item(section, item_id):
                    messagebox.showinfo("Success", f"Item {item_id} deleted!")
                    self.refresh_list(section)
                    self.clear_form(section)
                    self.git_manager.auto_commit("DELETE", item_id)
                else:
                    messagebox.showerror("Error", "Failed to delete item")
        
        except Exception as e:
            messagebox.showerror("Error", f"Error deleting item: {e}")
            import traceback
            traceback.print_exc()
    
    def clear_form(self, section):
        """Clear all form fields"""
        if section not in self.field_entries:
            return
            
        for field_info in self.field_entries[section].values():
            _, widget = field_info
            if hasattr(widget, 'delete') and not isinstance(widget, scrolledtext.ScrolledText):
                # Entry or dropdown widget
                widget.delete(0, tk.END)
            elif isinstance(widget, scrolledtext.ScrolledText):
                # Text widget
                widget.delete("1.0", tk.END)
            elif isinstance(widget, ttk.Label):
                # Image label widget
                widget.config(text="No image selected")
                widget.image_path = ""
                if hasattr(widget, 'preview_label'):
                    widget.preview_label.config(image='')
                    widget.preview_label.image = None
            elif field_info[0] == 'file' and isinstance(widget, ttk.Label):
                # File label widget
                widget.config(text="No file selected")
                widget.file_path = ""

        tree = self.listboxes.get(section)
        if tree is not None:
            try:
                tree.selection_remove(tree.selection())
            except Exception:
                pass

        if hasattr(self, 'current_editing_id'):
            delattr(self, 'current_editing_id')
        self.last_selected[section] = None
    
    def select_image(self, section, field_name):
        """Select an image file"""
        file_path = filedialog.askopenfilename(
            title="Select an image",
            filetypes=[("Image files", " ".join([f"*{fmt}" for fmt in SUPPORTED_FORMATS]))],
            initialdir=str(IMAGES_DIR)
        )
        
        if file_path:
            # Copy image to assets/images
            filename = Path(file_path).name
            if self.data_manager.copy_image(file_path, filename):
                field_info = self.field_entries[section].get(field_name)
                if field_info:
                    _, widget = field_info
                    widget.config(text=filename)
                    widget.image_path = f"assets/images/{filename}"
                    self.update_image_preview(widget, widget.image_path)
                messagebox.showinfo("Success", f"Image uploaded: {filename}")
            else:
                messagebox.showerror("Error", "Failed to copy image")
                
    def select_file(self, section, field_name):
        """Select a main file (e.g., zip, dng)"""
        file_path = filedialog.askopenfilename(
            title="Select a file",
            filetypes=[("All files", "*.*")],
            initialdir=str(DOWNLOADS_DIR)
        )
        
        if file_path:
            filename = Path(file_path).name
            if self.data_manager.copy_file(file_path, filename):
                field_info = self.field_entries[section].get(field_name)
                if field_info:
                    _, widget = field_info
                    widget.config(text=filename)
                    widget.file_path = f"assets/downloads/{filename}"
                messagebox.showinfo("Success", f"File uploaded: {filename}")
            else:
                messagebox.showerror("Error", "Failed to copy file")
    
    def update_image_preview(self, label, image_path):
        """Update the image preview in the form"""
        if not hasattr(label, 'preview_label'):
            return
            
        if not image_path:
            label.preview_label.config(image='')
            label.preview_label.image = None
            return
            
        try:
            full_path = PROJECT_ROOT / image_path
            if full_path.exists():
                img = Image.open(full_path)
                img.thumbnail((100, 100))
                photo = ImageTk.PhotoImage(img)
                label.preview_label.config(image=photo)
                label.preview_label.image = photo  # keep a reference!
            else:
                label.preview_label.config(image='')
                label.preview_label.image = None
        except Exception as e:
            print(f"Error loading preview: {e}")
            label.preview_label.config(image='')
            label.preview_label.image = None

    def check_git_setup(self):
        """Check if git is properly configured"""
        if not self.git_manager.is_git_repo():
            if messagebox.askyesno("Git Setup", "Initialize a git repository?"):
                if self.git_manager.init_repo():
                    messagebox.showinfo("Success", "Git repository initialized!")
        
        self.refresh_git_status()
    
    def set_git_remote(self):
        """Set git remote"""
        repo_url = self.git_url_entry.get()
        if not repo_url:
            messagebox.showwarning("Warning", "Please enter a repository URL")
            return
        
        if self.git_manager.add_remote(repo_url):
            messagebox.showinfo("Success", "Remote added successfully!")
        else:
            messagebox.showerror("Error", "Failed to add remote")
    
    def push_to_github(self):
        """Push changes to GitHub"""
        def do_push():
            if self.git_manager.push():
                messagebox.showinfo("Success", "Changes pushed to GitHub!")
            else:
                messagebox.showerror("Error", "Failed to push changes")
            self.refresh_git_status()
        
        thread = threading.Thread(target=do_push)
        thread.start()
    
    def _get_selected_item_id(self, section):
        """Get the currently selected item ID from the table"""
        tree = self.listboxes.get(section)
        if not tree:
            return None
        selected = tree.selection()
        if not selected:
            return None
        values = tree.item(selected[0], 'values')
        return values[0] if values else None

    def on_item_select(self, section, fields, event=None):
        """Handle a single-click selection in the table"""
        item_id = self._get_selected_item_id(section)
        if not item_id:
            return
        if self.last_selected.get(section) == item_id:
            self.clear_form(section)
            tree = self.listboxes.get(section)
            if tree:
                tree.selection_remove(tree.selection())
            self.last_selected[section] = None
            return
        self.last_selected[section] = item_id
        self.load_item_to_form(section, fields, item_id)

    def load_item_to_form(self, section, fields, item_id):
        """Load an item's data into the right-side form"""
        item = self.data_manager.get_item(section, item_id)
        if not item:
            messagebox.showerror("Error", f"Item {item_id} not found")
            return

        for field_name, _, field_type in fields:
            if field_name not in item:
                continue
            field_info = self.field_entries[section].get(field_name)
            if not field_info:
                continue

            field_type_actual, widget = field_info
            value = item[field_name]
            if field_type_actual in ('entry', 'dropdown'):
                widget.delete(0, tk.END)
                widget.insert(0, str(value))
            elif field_type_actual == 'text':
                widget.delete("1.0", tk.END)
                widget.insert("1.0", str(value))
            elif field_type_actual == 'image':
                filename = Path(str(value)).name if value else "No image selected"
                widget.config(text=filename)
                widget.image_path = str(value) if value else ""
                self.update_image_preview(widget, widget.image_path)
            elif field_type_actual == 'file':
                filename = Path(str(value)).name if value else "No file selected"
                widget.config(text=filename)
                widget.file_path = str(value) if value else ""

        self.current_editing_id = item_id

    def copy_link(self, section):
        """Copy a direct link to the selected item"""
        item_id = self._get_selected_item_id(section)
        if not item_id:
            messagebox.showwarning("Warning", "Please select an item to copy its link")
            return
            
        pages = {
            'prompts': 'prompts.html',
            'resources': 'resources.html',
            'aiTools': 'ai-tools.html',
            'blogPosts': 'blog-post.html'
        }
        page = pages.get(section, 'index.html')
        
        # Build the URL
        url = f"https://creatorkid.online/{page}?id={item_id}"
        
        # Copy to clipboard
        self.root.clipboard_clear()
        self.root.clipboard_append(url)
        self.root.update() # Required for clipboard to update on some systems
        
        messagebox.showinfo("Copied!", f"Link copied to clipboard:\n\n{url}")

    def refresh_git_status(self):
        """Refresh git status display"""
        status = self.git_manager.get_status()
        self.status_text.config(state=tk.NORMAL)
        self.status_text.delete("1.0", tk.END)
        self.status_text.insert("1.0", status if status else "Working directory clean")
        self.status_text.config(state=tk.DISABLED)

def main():
    root = tk.Tk()
    app = AdminPanel(root)
    root.mainloop()

if __name__ == "__main__":
    main()
