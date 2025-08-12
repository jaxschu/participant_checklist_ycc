// Get all checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

// Get signature fields
const participantName = document.getElementById('participantName');
const participantSignature = document.getElementById('participantSignature');
const participantDate = document.getElementById('participantDate');
const staffMember = document.getElementById('staffMember');
const staffSignature = document.getElementById('staffSignature');
const staffDate = document.getElementById('staffDate');

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
        timestamp: new Date().toISOString(),
        signatures: {
            participantName: participantName.value,
            participantSignature: participantSignature.value,
            participantDate: participantDate.value,
            staffMember: staffMember.value,
            staffSignature: staffSignature.value,
            staffDate: staffDate.value
        }
    };
    
    localStorage.setItem('checklistProgress', JSON.stringify(progress));
    showNotification('Progress and signatures have been saved!', 'success');
}

// Load progress from local storage
function loadFromLocalStorage() {
    const saved = localStorage.getItem('checklistProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        console.log('Loading saved progress:', progress);
        
        // Load signatures if available
        if (progress.signatures) {
            participantName.value = progress.signatures.participantName || '';
            participantSignature.value = progress.signatures.participantSignature || '';
            participantDate.value = progress.signatures.participantDate || '';
            staffMember.value = progress.signatures.staffMember || '';
            staffSignature.value = progress.signatures.staffSignature || '';
            staffDate.value = progress.signatures.staffDate || '';
        }
    }
}

// Save to local storage
function saveToLocalStorage() {
    const progress = {
        completedItems: completedItems,
        totalItems: totalItems,
        percentage: Math.round((completedItems / totalItems) * 100),
        timestamp: new Date().toISOString(),
        signatures: {
            participantName: participantName.value,
            participantSignature: participantSignature.value,
            participantDate: participantDate.value,
            staffMember: staffMember.value,
            staffSignature: staffSignature.value,
            staffDate: staffDate.value
        }
    };
    
    localStorage.setItem('checklistProgress', JSON.stringify(progress));
}

// Add event listeners for signature fields
[participantName, participantSignature, participantDate, staffMember, staffSignature, staffDate].forEach(field => {
    if (field) {
        field.addEventListener('input', saveToLocalStorage);
    }
});

// Print checklist functionality
function printChecklist() {
    // Create print-friendly content
    const printWindow = window.open('', '_blank');
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Your Centred Care - Participant Orientation Checklist</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 20px; 
                    line-height: 1.6;
                }
                .header { 
                    text-align: center; 
                    margin-bottom: 30px; 
                }
                .logo {
                    font-size: 2rem;
                    margin-bottom: 10px;
                }
                .title-banner {
                    background: #1E40AF;
                    color: white;
                    padding: 15px;
                    margin-bottom: 20px;
                    border-radius: 5px;
                }
                .intro-text {
                    margin-bottom: 20px;
                    font-style: italic;
                }
                .section { 
                    margin-bottom: 25px; 
                    page-break-inside: avoid; 
                }
                .section h2 { 
                    color: #1F2937; 
                    border-bottom: 1px solid #1E40AF; 
                    padding-bottom: 5px; 
                    font-size: 1.1rem;
                }
                .item { 
                    margin: 8px 0; 
                    padding: 5px 0;
                }
                .checkbox { 
                    display: inline-block; 
                    width: 18px; 
                    height: 18px; 
                    border: 2px solid #1E40AF; 
                    margin-right: 10px; 
                    text-align: center;
                    line-height: 14px;
                    font-weight: bold;
                }
                .progress { 
                    text-align: center; 
                    margin: 20px 0; 
                    font-size: 16px; 
                    font-weight: bold; 
                    color: #1E40AF;
                }
                .confirmation-banner {
                    background: #1E40AF;
                    color: white;
                    padding: 15px;
                    margin: 30px 0 20px 0;
                    border-radius: 5px;
                    text-align: center;
                }
                .signature-section {
                    margin-top: 30px;
                    page-break-inside: avoid;
                }
                .signature-group {
                    margin-bottom: 20px;
                    padding: 15px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                .signature-field {
                    margin-bottom: 15px;
                }
                .signature-field label {
                    font-weight: bold;
                    display: block;
                    margin-bottom: 5px;
                }
                .signature-line {
                    border-bottom: 1px solid #000;
                    min-height: 30px;
                    margin-bottom: 10px;
                }
                .date-field {
                    display: inline-block;
                    margin-left: 20px;
                }
                .footer {
                    margin-top: 40px;
                    font-size: 12px;
                    color: #666;
                    display: flex;
                    justify-content: space-between;
                }
                @media print { 
                    body { margin: 0; } 
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">❤️</div>
                <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;">Your Centred Care</div>
                <div class="title-banner">
                    <h1 style="margin: 0; font-size: 1.5rem;">PARTICIPANT ORIENTATION CHECKLIST</h1>
                </div>
                <div class="intro-text">
                    This checklist is to be checked and signed by participant to confirm that they have the knowledge and understanding of this organisation's processes and procedures.
                </div>
            </div>
            
            <div class="progress">
                Completion Progress: ${Math.round((completedItems / totalItems) * 100)}%
            </div>
            
            ${generatePrintContent()}
            
            <div class="confirmation-banner">
                This organisation has informed me of policies and procedures relevant to my support plan. I understand my rights and responsibilities during my time with this organisation.
            </div>
            
            <div class="signature-section">
                <div class="signature-group">
                    <div class="signature-field">
                        <label>Participant Name:</label>
                        <div class="signature-line">${participantName.value || '_________________'}</div>
                    </div>
                    <div class="signature-field">
                        <label>Participant Signature:</label>
                        <div class="signature-line">${participantSignature.value || '_________________'}</div>
                        <span class="date-field">Date: ${participantDate.value || '___/___/___'}</span>
                    </div>
                </div>
                
                <div class="signature-group">
                    <div class="signature-field">
                        <label>Staff Member:</label>
                        <div class="signature-line">${staffMember.value || '_________________'}</div>
                    </div>
                    <div class="signature-field">
                        <label>Staff Signature:</label>
                        <div class="signature-line">${staffSignature.value || '_________________'}</div>
                        <span class="date-field">Date: ${staffDate.value || '___/___/___'}</span>
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <div>
                    <div>Document name: YCC Participant Orientation Checklist</div>
                    <div>Version: 1.1</div>
                    <div>Date: 26 Mar 2024</div>
                </div>
                <div>Page 1 of 1</div>
            </div>
            
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
                    <span style="${isChecked ? 'text-decoration: line-through; color: #1E40AF;' : ''}">${label}</span>
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
        background: ${type === 'success' ? '#059669' : type === 'error' ? '#DC2626' : '#2563EB'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
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
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
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
        background: #F3F4F6;
        border-radius: 8px;
        padding: 15px;
        margin-top: 20px;
        border: 1px solid #E5E7EB;
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
            background: #E5E7EB;
            border: 1px solid #D1D5DB;
            border-radius: 4px;
            padding: 2px 6px;
            font-size: 0.8rem;
            font-family: monospace;
        `;
    });
    
    // Add to progress section
    const progressSection = document.querySelector('.progress-section');
    if (progressSection) {
        progressSection.appendChild(shortcutsContainer);
    }
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
        showNotification('Welcome to Your Centred Care Participant Orientation Checklist!', 'info');
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
        title: 'Your Centred Care - Participant Orientation Checklist',
        timestamp: new Date().toISOString(),
        progress: {
            completed: completedItems,
            total: totalItems,
            percentage: Math.round((completedItems / totalItems) * 100)
        },
        signatures: {
            participantName: participantName.value,
            participantSignature: participantSignature.value,
            participantDate: participantDate.value,
            staffMember: staffMember.value,
            staffSignature: staffSignature.value,
            staffDate: staffDate.value
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
    a.download = `ycc-checklist-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Data has been exported as JSON file!', 'success');
}

// Add export function to global scope
window.exportData = exportData;
