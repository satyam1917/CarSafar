@echo off
title CarSafar local server
cd /d "%~dp0"
echo Starting CarSafar at http://localhost:8000  (close this window to stop)
set "PY="
where py >nul 2>nul && set "PY=py"
if not defined PY ( where python >nul 2>nul && set "PY=python" )
if defined PY (
  start "" cmd /c "timeout /t 2 >nul & start http://localhost:8000"
  %PY% -m http.server 8000
  if errorlevel 1 start "" "%~dp0index.html"
) else (
  echo Python not found - opening index.html directly instead.
  start "" "%~dp0index.html"
  pause
)
