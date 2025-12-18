@echo off
git remote remove origin
git remote add origin https://github.com/ashraf20026/Calculator-App.git
git branch -M main
git add .
git commit -m "Upload files"
git push -u origin main
