
// Main application script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initThemeToggle();
    initMobileMenu();
    initSearch();
    initHeroSlider();
    initBackToTop();
    initModals();
    initToast();
    
    // Load initial data
    loadArticles();
    loadVideos();
});

function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.setAttribute('data-theme', 
            document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        localStorage.setItem('theme', document.body.getAttribute('data-theme'));
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
    });
    
    overlay.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
    });
}

function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchBar = document.querySelector('.search-bar');
    const searchClose = document.querySelector('.search-close');
    
    searchBtn.addEventListener('click', function() {
        searchBar.classList.toggle('active');
    });
    
    searchClose.addEventListener('click', function() {
        searchBar.classList.remove('active');
    });
}

function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    document.querySelector('.next-slide').addEventListener('click', function() {
        showSlide((currentSlide + 1) % slides.length);
    });
    
    document.querySelector('.prev-slide').addEventListener('click', function() {
        showSlide((currentSlide - 1 + slides.length) % slides.length);
    });
    
    // Auto slide change
    setInterval(() => {
        showSlide((currentSlide + 1) % slides.length);
    }, 5000);
}

function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initModals() {
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('[data-modal]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            document.getElementById(modalId).classList.add('active');
        });
    });
    
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this || e.target.closest('.modal-close')) {
                this.classList.remove('active');
            }
        });
    });
}

function initToast() {
    window.showToast = function(message, type = 'success') {
        const toast = document.getElementById('notification-toast');
        toast.querySelector('.toast-message p').textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };
}

function loadArticles() {
    // This would be replaced with actual data loading
    const articles = [
        {
            id: 1,
            title: "Global Summit Addresses Climate Change Concerns",
            excerpt: "World leaders gather to discuss urgent measures against rising global temperatures.",
            category: "Global",
            date: "2 hours ago",
            image: "assets/images/placeholder-article1.jpg",
            views: 1245
        },
        // More articles...
    ];
    
    const container = document.getElementById('latest-news-container');
    container.innerHTML = articles.map(article => `
        <div class="news-card">
            <div class="news-card-image">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="news-card-content">
                <div class="news-card-meta">
                    <span class="news-card-category ${article.category.toLowerCase()}">${article.category}</span>
                    <span class="news-card-time">${article.date}</span>
                </div>
                <h3 class="news-card-title">${article.title}</h3>
                <p class="news-card-excerpt">${article.excerpt}</p>
                <div class="news-card-actions">
                    <button class="like-btn" data-id="${article.id}">
                        <i class="far fa-heart"></i> Like
                    </button>
                    <button class="share-btn" data-id="${article.id}">
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function loadVideos() {
    // Similar to loadArticles but for videos
}
