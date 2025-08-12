// Get all checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

// Initialize progress
let totalItems = checkboxes.length;
let completedItems = 0;

// Update progress bar
function updateProgress() {
    completedItems = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    const percentage = Math.round((completedItems / totalItems) * 100);
    
    progressFill.style.width = percentage + '%';
    progressText.textContent = percentage + '%';
    
    // Save progress to local storage
    saveToLocalStorage();
}

// Add event listener for each checkbox
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateProgress);
});

// Select all functionality
function checkAll() {
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
    updateProgress();
    
    // Show success message
    showNotification('All items have been selected!', 'success');
}

// Unselect all functionality
function uncheckAll() {
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    updateProgress();
    
    // Show success message
    showNotification('All items have been unselected!', 'info');
}

// Save progress functionality
function saveProgress() {
    const progress = {
        completedItems: completedItems,
        totalItems: totalItems,
        percentage: Math.round((completedItems / totalItems) * 100),
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('checklistProgress', JSON.stringify(progress));
    showNotification('Progress has been saved to local storage!', 'success');
}

// Load progress from local storage
function loadFromLocalStorage() {
    const saved = localStorage.getItem('checklistProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        console.log('Loading saved progress:', progress);
    }
}

// Save to local storage
function saveToLocalStorage() {
    const progress = {
        completedItems: completedItems,
        totalItems: totalItems,
        percentage: Math.round((completedItems / totalItems) * 100),
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('checklistProgress', JSON.stringify(progress));
}

// Print checklist functionality
function printChecklist() {
    // Create print-friendly content
    const printWindow = window.open('', '_blank');
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Participant Orientation Checklist</title>
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
                <h1>Participant Orientation Checklist</h1>
                <p>Ensure all participants are ready to participate in activities</p>
            </div>
            
            <div class="progress">
                Completion Progress: ${Math.round((completedItems / totalItems) * 100)}%
            </div>
            
            ${generatePrintContent()}
            
            <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #666;">
                Print Time: ${new Date().toLocaleString('en-US')}
            </div>
        </body>
        </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
}

// Generate print content
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

// Show notification message
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
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
    
    // Show animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto hide
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Keyboard shortcut support
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + A: Select all
    if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
        event.preventDefault();
        checkAll();
    }
    
    // Ctrl/Cmd + D: Unselect all
    if ((event.ctrlKey || event.metaKey) && event.key === 'd') {
        event.preventDefault();
        uncheckAll();
    }
    
    // Ctrl/Cmd + S: Save progress
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        saveProgress();
    }
    
    // Ctrl/Cmd + P: Print
    if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
        event.preventDefault();
        printChecklist();
    }
});

// Add keyboard shortcut hints
function addKeyboardShortcuts() {
    const shortcuts = [
        { key: 'Ctrl/Cmd + A', action: 'Select All' },
        { key: 'Ctrl/Cmd + D', action: 'Unselect All' },
        { key: 'Ctrl/Cmd + S', action: 'Save Progress' },
        { key: 'Ctrl/Cmd + P', action: 'Print Checklist' }
    ];
    
    const shortcutsContainer = document.createElement('div');
    shortcutsContainer.className = 'keyboard-shortcuts';
    shortcutsContainer.innerHTML = `
        <h4><i class="fas fa-keyboard"></i> Keyboard Shortcuts</h4>
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
    
    // Add to progress section
    const progressSection = document.querySelector('.progress-section');
    progressSection.appendChild(shortcutsContainer);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load saved progress
    loadFromLocalStorage();
    
    // Update initial progress
    updateProgress();
    
    // Add keyboard shortcut hints
    addKeyboardShortcuts();
    
    // Add welcome message
    setTimeout(() => {
        showNotification('Welcome to the Participant Orientation Checklist!', 'info');
    }, 1000);
});

// Add touch support (mobile devices)
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

// Add data export functionality
function exportData() {
    const data = {
        title: 'Participant Orientation Checklist',
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
    
    showNotification('Data has been exported as JSON file!', 'success');
}

// Add export function to global scope
window.exportData = exportData;
