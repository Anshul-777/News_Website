// utils.js
// Utility functions used across the application

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds
 * @returns {Function} - The debounced function
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit how often a function can be called
 * @param {Function} func - The function to throttle
 * @param {number} limit - The delay in milliseconds
 * @returns {Function} - The throttled function
 */
export function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

/**
 * Format date to readable string
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date string
 */
export function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Generate a unique ID
 * @returns {string} - Unique ID
 */
export function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

/**
 * Get a random number between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Random number
 */
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} el - The element to check
 * @returns {boolean} - True if element is in viewport
 */
export function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Add ripple effect to button
 * @param {Event} event - The click event
 */
export function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple-effect");

    const ripple = button.getElementsByClassName("ripple-effect")[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

/**
 * Toggle dark/light theme
 */
export function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

/**
 * Initialize theme from localStorage or prefers-color-scheme
 */
export function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

/**
 * Scroll to element with offset
 * @param {string} selector - The selector of the element to scroll to
 * @param {number} offset - The offset in pixels
 */
export function scrollToElement(selector, offset = 0) {
    const element = document.querySelector(selector);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Copy text to clipboard
 * @param {string} text - The text to copy
 * @returns {Promise} - Promise that resolves when text is copied
 */
export function copyToClipboard(text) {
    return navigator.clipboard.writeText(text);
}

/**
 * Show notification toast
 * @param {string} message - The message to display
 * @param {string} type - The type of toast (success, error, info)
 * @param {number} duration - The duration in milliseconds
 */
export function showToast(message, type = 'info', duration = 3000) {
    const toast = document.getElementById('notification-toast');
    const toastMessage = toast.querySelector('.toast-message p');
    const toastIcon = toast.querySelector('.toast-icon i');
    
    // Set message and icon based on type
    toastMessage.textContent = message;
    
    switch (type) {
        case 'success':
            toastIcon.className = 'fas fa-check-circle';
            toast.style.backgroundColor = 'var(--success-color)';
            break;
        case 'error':
            toastIcon.className = 'fas fa-exclamation-circle';
            toast.style.backgroundColor = 'var(--danger-color)';
            break;
        case 'warning':
            toastIcon.className = 'fas fa-exclamation-triangle';
            toast.style.backgroundColor = 'var(--warning-color)';
            break;
        default:
            toastIcon.className = 'fas fa-info-circle';
            toast.style.backgroundColor = 'var(--info-color)';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after duration
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

/**
 * Initialize all tooltips
 */
export function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', () => {
            const tooltipText = tooltip.getAttribute('data-tooltip');
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip';
            tooltipElement.textContent = tooltipText;
            document.body.appendChild(tooltipElement);
            
            const rect = tooltip.getBoundingClientRect();
            tooltipElement.style.position = 'absolute';
            tooltipElement.style.left = `${rect.left + rect.width / 2 - tooltipElement.offsetWidth / 2}px`;
            tooltipElement.style.top = `${rect.top - tooltipElement.offsetHeight - 10}px`;
            
            tooltip.addEventListener('mouseleave', () => {
                tooltipElement.remove();
            }, { once: true });
        });
    });
}

/**
 * Format number with commas
 * @param {number} num - The number to format
 * @returns {string} - Formatted number
 */
export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Truncate text with ellipsis
 * @param {string} text - The text to truncate
 * @param {number} maxLength - The maximum length
 * @returns {string} - Truncated text
 */
export function truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

/**
 * Generate a summary from text
 * @param {string} text - The text to summarize
 * @param {number} sentenceCount - Number of sentences in summary
 * @returns {string} - Generated summary
 */
export function generateSummary(text, sentenceCount = 2) {
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
    return sentences.slice(0, sentenceCount).join(' ');
}
