@echo off
echo ========================================
echo 参与者导向检查清单 - 部署脚本
echo ========================================
echo.

echo 正在检查Git状态...
git status

echo.
echo 正在添加所有更改...
git add .

echo.
echo 请输入提交信息（或按回车使用默认信息）:
set /p commit_msg=
if "%commit_msg%"=="" set commit_msg=更新网站内容和功能

echo.
echo 正在提交更改...
git commit -m "%commit_msg%"

echo.
echo 正在推送到远程仓库...
git push origin main

echo.
echo ========================================
echo 部署完成！
echo ========================================
echo.
echo 如果使用GitHub Pages，请确保：
echo 1. 仓库设置为Public
echo 2. 在Settings > Pages中启用了GitHub Pages
echo 3. Source设置为"Deploy from a branch"
echo 4. Branch设置为"main"
echo.
echo 您的网站将在几分钟后可用：
echo https://您的用户名.github.io/仓库名称
echo.
pause
