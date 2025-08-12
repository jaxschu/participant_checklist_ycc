@echo off
echo ========================================
echo Participant Orientation Checklist - Deployment Script
echo ========================================
echo.

echo Checking Git status...
git status

echo.
echo Adding all changes...
git add .

echo.
echo Please enter commit message (or press Enter for default message):
set /p commit_msg=
if "%commit_msg%"=="" set commit_msg=Update website content and functionality

echo.
echo Committing changes...
git commit -m "%commit_msg%"

echo.
echo Pushing to remote repository...
git push origin main

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo If using GitHub Pages, please ensure:
echo 1. Repository is set to Public
echo 2. GitHub Pages is enabled in Settings > Pages
echo 3. Source is set to "Deploy from a branch"
echo 4. Branch is set to "main"
echo.
echo Your website will be available in a few minutes at:
echo https://your-username.github.io/repository-name
echo.
pause
