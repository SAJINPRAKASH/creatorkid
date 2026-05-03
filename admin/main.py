#!/usr/bin/env python3
"""
CreatorKid Admin Panel
A Python-based admin panel for managing website content without a backend server
"""

import sys
from pathlib import Path

# Add parent directory to path so we can import modules
admin_dir = Path(__file__).parent
sys.path.insert(0, str(admin_dir))

from admin_panel import main

if __name__ == "__main__":
    main()
