@echo off
git add .
git commit -m "Upload project"
git branch -M main
git remote remove origin
git remote add origin https://github.com/ashraf20026/Calculator-App.git
git push -u origin main
