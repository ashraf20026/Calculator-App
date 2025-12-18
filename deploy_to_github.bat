@echo off
echo Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo npm install failed
    pause
    exit /b %ERRORLEVEL%
)

echo Building the project...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo npm run build failed
    pause
    exit /b %ERRORLEVEL%
)

if not exist dist (
    echo Build failed! 'dist' folder not found.
    pause
    exit /b 1
)

echo Pushing to GitHub...
git add .
git commit -m "Deploy build for GitHub Pages"
git push origin main

echo ===================================================
echo Deployment script finished.
echo Now go to GitHub -> Settings -> Pages.
echo Select 'main' branch and '/dist' folder.
echo ===================================================
pause
