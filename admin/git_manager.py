import subprocess
import os
from pathlib import Path
from datetime import datetime
from config import PROJECT_ROOT

class GitManager:
    """Manages git operations for version control"""
    
    def __init__(self):
        self.repo_path = PROJECT_ROOT
        
    def is_git_repo(self) -> bool:
        """Check if the project is a git repository"""
        git_dir = self.repo_path / '.git'
        return git_dir.exists()
    
    def init_repo(self) -> bool:
        """Initialize a git repository"""
        try:
            subprocess.run(
                ['git', 'init'],
                cwd=self.repo_path,
                capture_output=True,
                check=True
            )
            return True
        except Exception as e:
            print(f"Error initializing repo: {e}")
            return False
    
    def add_all(self) -> bool:
        """Stage all changes"""
        try:
            subprocess.run(
                ['git', 'add', '.'],
                cwd=self.repo_path,
                capture_output=True,
                check=True
            )
            return True
        except Exception as e:
            print(f"Error adding files: {e}")
            return False
    
    def commit(self, message: str) -> bool:
        """Commit changes with a message"""
        try:
            subprocess.run(
                ['git', 'commit', '-m', message],
                cwd=self.repo_path,
                capture_output=True,
                check=True
            )
            return True
        except subprocess.CalledProcessError as e:
            # Might fail if nothing to commit
            if "nothing to commit" not in str(e.stderr):
                print(f"Error committing: {e}")
            return False
        except Exception as e:
            print(f"Error committing: {e}")
            return False
    
    def push(self, branch: str = 'main') -> bool:
        """Push changes to remote repository"""
        try:
            subprocess.run(
                ['git', 'push', 'origin', branch],
                cwd=self.repo_path,
                capture_output=True,
                check=True
            )
            return True
        except Exception as e:
            print(f"Error pushing: {e}")
            return False
    
    def add_remote(self, repo_url: str) -> bool:
        """Add a remote repository"""
        try:
            subprocess.run(
                ['git', 'remote', 'add', 'origin', repo_url],
                cwd=self.repo_path,
                capture_output=True,
                check=True
            )
            return True
        except Exception as e:
            print(f"Error adding remote: {e}")
            return False
    
    def get_status(self) -> str:
        """Get git status"""
        try:
            result = subprocess.run(
                ['git', 'status', '--short'],
                cwd=self.repo_path,
                capture_output=True,
                text=True
            )
            return result.stdout
        except Exception as e:
            return f"Error: {e}"
    
    def auto_commit(self, action: str, item_id: str) -> bool:
        """Automatically commit changes"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        message = f"[{action}] {item_id} - {timestamp}"
        
        if self.add_all():
            return self.commit(message)
        return False
