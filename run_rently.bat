@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

REM ============================================================
REM  Rently Frontend – Dev Helper (Vite + React)
REM  1) Check if Node.js and npm are installed
REM  2) Verify that package.json exists
REM  3) Run "npm install" to ensure dependencies are ready
REM  4) Run "npm run dev" to start the Vite development server
REM ============================================================

REM --- Change directory to where this script is located (frontend root) ---
cd /d "%~dp0"

echo.
echo === Checking for Node.js installation ===
where node >nul 2>&1
IF ERRORLEVEL 1 (
    echo [ERROR] Node.js is not installed or not in PATH.
    echo Please install Node.js from: https://nodejs.org/
    echo After installation, reopen your terminal and run this script again.
    pause
    exit /b 1
)

echo.
echo === Checking for npm installation ===
where npm >nul 2>&1
IF ERRORLEVEL 1 (
    echo [ERROR] npm is not installed or not in PATH.
    echo npm should be included automatically with Node.js.
    echo If the issue persists, reinstall Node.js.
    pause
    exit /b 1
)

REM --- Verify that package.json exists ---
IF NOT EXIST package.json (
    echo [ERROR] package.json not found in:
    echo   %CD%
    echo Make sure this script is placed in the root folder of your Vite/React project.
    pause
    exit /b 1
)

echo.
echo === Ensuring frontend dependencies are installed (npm install) ===
REM If dependencies are already installed, npm will simply skip them.
npm install
IF ERRORLEVEL 1 (
    echo [ERROR] npm install failed.
    pause
    exit /b 1
)

echo.
echo === Starting Vite development server: npm run dev ===
echo (Press CTRL+C to stop the server)
echo.

npm run dev

ENDLOCAL
