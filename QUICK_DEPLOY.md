# 🚀 快速部署指南

## 最简单的部署方式：GitHub Pages

### 步骤1：创建GitHub仓库
1. 访问 [GitHub.com](https://github.com) 并登录
2. 点击右上角的 "+" 号，选择 "New repository"
3. 仓库名称：`participant-checklist`
4. 选择 "Public"
5. **不要**勾选 "Add a README file"
6. 点击 "Create repository"

### 步骤2：推送代码
在您的本地项目目录中运行以下命令：

```bash
# 添加远程仓库（替换为您的GitHub用户名）
git remote add origin https://github.com/您的用户名/participant-checklist.git

# 推送代码
git branch -M main
git push -u origin main
```

### 步骤3：启用GitHub Pages
1. 在GitHub仓库页面，点击 "Settings" 标签
2. 在左侧菜单中找到 "Pages"
3. 在 "Source" 部分，选择 "Deploy from a branch"
4. 在 "Branch" 下拉菜单中选择 "main"
5. 点击 "Save"

### 步骤4：访问您的网站
几分钟后，您的网站将在以下地址可用：
```
https://您的用户名.github.io/participant-checklist
```

## 🎯 一键部署脚本

如果您使用Windows，可以直接运行：
```bash
deploy.bat
```

## 📱 测试您的网站

部署完成后，请测试以下功能：
- [ ] 页面正常加载
- [ ] 复选框可以正常点击
- [ ] 进度条正常更新
- [ ] 全选/取消全选功能
- [ ] 保存进度功能
- [ ] 打印功能
- [ ] 导出数据功能
- [ ] 移动端响应式设计

## 🔧 自定义域名（可选）

如果您有自己的域名：
1. 在GitHub仓库的Settings > Pages中
2. 在 "Custom domain" 部分输入您的域名
3. 保存设置
4. 在您的域名提供商处添加CNAME记录

## 📊 网站分析

部署后，您可以：
1. 添加Google Analytics跟踪代码
2. 使用Google Search Console提交网站地图
3. 监控网站访问统计

## 🆘 常见问题

**Q: 网站显示404错误？**
A: 确保仓库是Public的，并且GitHub Pages已正确启用

**Q: 样式没有加载？**
A: 检查网络连接，确保CDN资源可以正常访问

**Q: 功能不正常？**
A: 确保所有文件都已正确上传，特别是script.js和styles.css

## 📞 需要帮助？

如果遇到问题，请检查：
1. GitHub仓库设置
2. 文件路径是否正确
3. 浏览器控制台是否有错误信息

---

**恭喜！您的网站现在已经可以在互联网上访问了！** 🌐
