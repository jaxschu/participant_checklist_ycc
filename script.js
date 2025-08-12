// 获取所有复选框
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

// 初始化进度
let totalItems = checkboxes.length;
let completedItems = 0;

// 更新进度条
function updateProgress() {
    completedItems = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    const percentage = Math.round((completedItems / totalItems) * 100);
    
    progressFill.style.width = percentage + '%';
    progressText.textContent = percentage + '%';
    
    // 保存进度到本地存储
    saveToLocalStorage();
}

// 为每个复选框添加事件监听器
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateProgress);
});

// 全选功能
function checkAll() {
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
    updateProgress();
    
    // 显示成功消息
    showNotification('所有项目已选中！', 'success');
}

// 取消全选功能
function uncheckAll() {
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    updateProgress();
    
    // 显示成功消息
    showNotification('所有项目已取消选中！', 'info');
}

// 保存进度功能
function saveProgress() {
    const progress = {
        completedItems: completedItems,
        totalItems: totalItems,
        percentage: Math.round((completedItems / totalItems) * 100),
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('checklistProgress', JSON.stringify(progress));
    showNotification('进度已保存到本地存储！', 'success');
}

// 从本地存储加载进度
function loadFromLocalStorage() {
    const saved = localStorage.getItem('checklistProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        console.log('加载保存的进度:', progress);
    }
}

// 保存到本地存储
function saveToLocalStorage() {
    const progress = {
        completedItems: completedItems,
        totalItems: totalItems,
        percentage: Math.round((completedItems / totalItems) * 100),
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('checklistProgress', JSON.stringify(progress));
}

// 打印清单功能
function printChecklist() {
    // 创建打印友好的内容
    const printWindow = window.open('', '_blank');
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>参与者导向检查清单</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .section { margin-bottom: 25px; page-break-inside: avoid; }
                .section h2 { color: #333; border-bottom: 2px solid #667eea; padding-bottom: 5px; }
                .item { margin: 8px 0; }
                .checkbox { display: inline-block; width: 20px; height: 20px; border: 2px solid #333; margin-right: 10px; }
                .progress { text-align: center; margin: 20px 0; font-size: 18px; font-weight: bold; }
                @media print { body { margin: 0; } }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>参与者导向检查清单</h1>
                <p>确保所有参与者都准备好参与活动</p>
            </div>
            
            <div class="progress">
                完成进度: ${Math.round((completedItems / totalItems) * 100)}%
            </div>
            
            ${generatePrintContent()}
            
            <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #666;">
                打印时间: ${new Date().toLocaleString('zh-CN')}
            </div>
        </body>
        </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
}

// 生成打印内容
function generatePrintContent() {
    const sections = document.querySelectorAll('.checklist-section');
    let content = '';
    
    sections.forEach(section => {
        const title = section.querySelector('h2').textContent;
        const items = section.querySelectorAll('.checklist-item');
        
        content += `<div class="section">
            <h2>${title}</h2>`;
        
        items.forEach(item => {
            const label = item.querySelector('label').textContent;
            const isChecked = item.querySelector('input').checked;
            content += `
                <div class="item">
                    <span class="checkbox">${isChecked ? '✓' : ''}</span>
                    <span style="${isChecked ? 'text-decoration: line-through; color: #667eea;' : ''}">${label}</span>
                </div>
            `;
        });
        
        content += '</div>';
    });
    
    return content;
}

// 显示通知消息
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4299e1'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 键盘快捷键支持
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + A: 全选
    if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
        event.preventDefault();
        checkAll();
    }
    
    // Ctrl/Cmd + D: 取消全选
    if ((event.ctrlKey || event.metaKey) && event.key === 'd') {
        event.preventDefault();
        uncheckAll();
    }
    
    // Ctrl/Cmd + S: 保存进度
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        saveProgress();
    }
    
    // Ctrl/Cmd + P: 打印
    if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
        event.preventDefault();
        printChecklist();
    }
});

// 添加键盘快捷键提示
function addKeyboardShortcuts() {
    const shortcuts = [
        { key: 'Ctrl/Cmd + A', action: '全选' },
        { key: 'Ctrl/Cmd + D', action: '取消全选' },
        { key: 'Ctrl/Cmd + S', action: '保存进度' },
        { key: 'Ctrl/Cmd + P', action: '打印清单' }
    ];
    
    const shortcutsContainer = document.createElement('div');
    shortcutsContainer.className = 'keyboard-shortcuts';
    shortcutsContainer.innerHTML = `
        <h4><i class="fas fa-keyboard"></i> 键盘快捷键</h4>
        <div class="shortcuts-list">
            ${shortcuts.map(shortcut => `
                <div class="shortcut-item">
                    <kbd>${shortcut.key}</kbd>
                    <span>${shortcut.action}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    shortcutsContainer.style.cssText = `
        background: #f8fafc;
        border-radius: 10px;
        padding: 15px;
        margin-top: 20px;
        border: 1px solid #e2e8f0;
    `;
    
    const shortcutsList = shortcutsContainer.querySelector('.shortcuts-list');
    shortcutsList.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 10px;
        margin-top: 10px;
    `;
    
    const shortcutItems = shortcutsContainer.querySelectorAll('.shortcut-item');
    shortcutItems.forEach(item => {
        item.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.9rem;
        `;
        
        const kbd = item.querySelector('kbd');
        kbd.style.cssText = `
            background: #e2e8f0;
            border: 1px solid #cbd5e0;
            border-radius: 4px;
            padding: 2px 6px;
            font-size: 0.8rem;
            font-family: monospace;
        `;
    });
    
    // 添加到进度区域
    const progressSection = document.querySelector('.progress-section');
    progressSection.appendChild(shortcutsContainer);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 加载保存的进度
    loadFromLocalStorage();
    
    // 更新初始进度
    updateProgress();
    
    // 添加键盘快捷键提示
    addKeyboardShortcuts();
    
    // 添加欢迎消息
    setTimeout(() => {
        showNotification('欢迎使用参与者导向检查清单！', 'info');
    }, 1000);
});

// 添加触摸支持（移动设备）
if ('ontouchstart' in window) {
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        checkbox.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// 添加数据导出功能
function exportData() {
    const data = {
        title: '参与者导向检查清单',
        timestamp: new Date().toISOString(),
        progress: {
            completed: completedItems,
            total: totalItems,
            percentage: Math.round((completedItems / totalItems) * 100)
        },
        sections: []
    };
    
    const sections = document.querySelectorAll('.checklist-section');
    sections.forEach(section => {
        const sectionData = {
            title: section.querySelector('h2').textContent,
            items: []
        };
        
        const items = section.querySelectorAll('.checklist-item');
        items.forEach(item => {
            const label = item.querySelector('label').textContent;
            const checked = item.querySelector('input').checked;
            sectionData.items.push({ label, checked });
        });
        
        data.sections.push(sectionData);
    });
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `checklist-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('数据已导出为JSON文件！', 'success');
}

// 将导出功能添加到全局作用域
window.exportData = exportData;
