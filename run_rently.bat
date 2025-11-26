@echo off
SETLOCAL

echo ============================================================
echo   Rently Frontend – Starting Dev Environment
echo ============================================================

REM Ensure we run from the script directory
cd /d "%~dp0"

echo.
echo === Running npm install ===
call npm install

echo.
echo === Starting Vite Dev Server (npm run dev) ===
echo Press CTRL + C to stop.
echo.

call npm run dev

ENDLOCAL
pause
