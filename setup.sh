#!/bin/bash

# CreatorKid Admin Panel Setup Script for Mac/Linux

echo ""
echo "======================================"
echo "CreatorKid Admin Panel Setup"
echo "======================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo ""
    echo "Please install Python 3 using:"
    echo "  macOS: brew install python3"
    echo "  Ubuntu/Debian: sudo apt-get install python3"
    echo ""
    exit 1
fi

echo "[✓] Python 3 is installed"
python3 --version
echo ""

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "ERROR: Git is not installed"
    echo ""
    echo "Please install Git using:"
    echo "  macOS: brew install git"
    echo "  Ubuntu/Debian: sudo apt-get install git"
    echo ""
    exit 1
fi

echo "[✓] Git is installed"
git --version
echo ""

# Create necessary directories
echo "Creating directories..."
mkdir -p assets/images
echo "[✓] Directories created"
echo ""

# Initialize Git if not already done
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
    echo "[✓] Git initialized"
    echo ""
    echo "Please configure Git with your name and email:"
    echo ""
    read -p "Enter your name: " git_name
    read -p "Enter your email: " git_email
    git config user.name "$git_name"
    git config user.email "$git_email"
    echo "[✓] Git configured"
else
    echo "[✓] Git repository already initialized"
fi
echo ""

# Start the admin panel
echo ""
echo "======================================"
echo "Starting Admin Panel..."
echo "======================================"
echo ""

cd admin
python3 main.py

read -p "Press Enter to exit..."
