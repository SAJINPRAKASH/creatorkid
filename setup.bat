@echo off
REM CreatorKid Admin Panel Setup Script for Windows

echo.
echo ======================================
echo CreatorKid Admin Panel Setup
echo ======================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo.
    echo Please download Python from: https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation
    echo.
    pause
    exit /b 1
)

echo [✓] Python is installed
python --version
echo.

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed or not in PATH
    echo.
    echo Please download Git from: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo [✓] Git is installed
git --version
echo.

REM Create necessary directories
echo Creating directories...
if not exist "assets\images" mkdir assets\images
echo [✓] Directories created
echo.

REM Initialize Git if not already done
if not exist ".git" (
    echo Initializing Git repository...
    git init
    echo [✓] Git initialized
    echo.
    echo Please configure Git with your name and email:
    echo.
    set /p git_name="Enter your name: "
    set /p git_email="Enter your email: "
    git config user.name "%git_name%"
    git config user.email "%git_email%"
    echo [✓] Git configured
) else (
    echo [✓] Git repository already initialized
)
echo.

REM Start the admin panel
echo.
echo ======================================
echo Starting Admin Panel...
echo ======================================
echo.

cd admin
python main.py

pause
