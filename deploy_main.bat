@echo off
echo Building project...
call npm run build

echo Preparing production files...
:: Rename the built dev.html to index.html for production
copy dist\dev.html dist\index.html
:: Copy index.html to root
copy dist\index.html .\index.html /Y
:: Copy assets to root
xcopy dist\assets .\assets /S /Y /I

echo Pushing to Main branch...
git add .
git commit -m "Deploy production build to main root"
git push origin main

echo Cleaning up...
git push origin --delete gh-pages
echo Done!
