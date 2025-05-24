// auth.js
import { showToast, toggleTheme, initTheme } from './utils.js';

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    // Theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Initialize auth modals
    initAuthModals();
});

// Auth modals functionality
function initAuthModals() {
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const switchToRegister = document.querySelector('.switch-to-register');
    const switchToLogin = document.querySelector('.switch-to-login');
    const userBtn = document.querySelector('.user-btn');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    
    // Open login modal when user button is clicked
    if (userBtn) {
        userBtn.addEventListener('click', () => {
            loginModal.classList.add('active');
        });
    }
    
    // Switch between login and register modals
    if (switchToRegister) {
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.remove('active');
            registerModal.classList.add('active');
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerModal.classList.remove('active');
            loginModal.classList.add('active');
        });
    }
    
    // Close modals when close button is clicked
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').classList.remove('active');
        });
    });
    
    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Simulate login
            simulateLogin(email, password);
        });
    }
    
    // Register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm').value;
            
            if (password !== confirmPassword) {
                showToast('Passwords do not match', 'error');
                return;
            }
            
            // Simulate registration
            simulateRegistration(name, email, password);
        });
    }
}

// Simulate login with localStorage
function simulateLogin(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Save user session
        localStorage.setItem('currentUser', JSON.stringify(user));
        showToast('Login successful', 'success');
        document.getElementById('login-modal').classList.remove('active');
        updateUserUI();
    } else {
        showToast('Invalid email or password', 'error');
    }
}

// Simulate registration with localStorage
function simulateRegistration(name, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
        showToast('Email already registered', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: generateId(),
        name,
        email,
        password,
        joined: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Log the user in
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    showToast('Registration successful', 'success');
    document.getElementById('register-modal').classList.remove('active');
    updateUserUI();
}

// Update UI based on user login state
function updateUserUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userBtn = document.querySelector('.user-btn');
    
    if (currentUser && userBtn) {
        userBtn.innerHTML = `<i class="fas fa-user"></i> ${currentUser.name.split(' ')[0]}`;
    }
}

// Initialize user UI on page load
updateUserUI();
