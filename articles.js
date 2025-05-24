// articles.js
import { formatDate, showToast, generateSummary, truncateText } from './utils.js';

// Initialize articles functionality
document.addEventListener('DOMContentLoaded', () => {
    // Load and display articles
    loadArticles();
    
    // Initialize article interactions
    initArticleInteractions();
    
    // Initialize search functionality
    initSearch();
});

// Load articles from localStorage or mock data
function loadArticles() {
    let articles = JSON.parse(localStorage.getItem('articles'));
    
    // If no articles in localStorage, load mock data
    if (!articles || articles.length === 0) {
        articles = generateMockArticles();
        localStorage.setItem('articles', JSON.stringify(articles));
    }
    
    // Display articles
    displayArticles(articles);
}

// Generate mock articles for demo
function generateMockArticles() {
    const categories = ['world', 'politics', 'business', 'technology', 'science', 'health', 'sports', 'entertainment'];
    const mockArticles = [];
    
    for (let i = 1; i <= 12; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const title = `Sample Article Title ${i} About ${category.charAt(0).toUpperCase() + category.slice(1)}`;
        const content = `This is a sample article content for article ${i} in the ${category} category. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. This article discusses important developments in the ${category} field that could have significant impact. More details would be included in a real article.`;
        
        mockArticles.push({
            id: `article-${i}`,
            title,
            content,
            summary: generateSummary(content),
            category,
            author: `Author ${i}`,
            date: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
            imageUrl: `assets/images/placeholder-article-${i % 4 + 1}.jpg`,
            views: Math.floor(Math.random() * 10000),
            likes: Math.floor(Math.random() * 500),
            comments: Math.floor(Math.random() * 100),
            tags: [`tag${i}`, category, 'news', 'featured']
        });
    }
    
    return mockArticles;
}

// Display articles in the grid
function displayArticles(articles) {
    const container = document.getElementById('latest-news-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'news-card hover-shadow';
        articleElement.innerHTML = `
            <div class="news-card-image">
                <img src="${article.imageUrl}" alt="${article.title}">
            </div>
            <div class="news-card-content">
                <div class="news-card-meta">
                    <span class="news-card-category ${article.category}">${article.category}</span>
                    <span>${formatDate(article.date)}</span>
                </div>
                <h3 class="news-card-title">${article.title}</h3>
                <p class="news-card-excerpt">${truncateText(article.summary, 100)}</p>
                <div class="news-card-actions">
                    <button class="like-btn" data-article-id="${article.id}">
                        <i class="far fa-heart"></i> ${article.likes}
                    </button>
                    <button class="comment-btn" data-article-id="${article.id}">
                        <i class="far fa-comment"></i> ${article.comments}
                    </button>
                    <button class="bookmark-btn" data-article-id="${article.id}">
                        <i class="far fa-bookmark"></i>
                    </button>
                    <button class="share-btn" data-article-id="${article.id}">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(articleElement);
    });
}

// Initialize article interaction buttons
function initArticleInteractions() {
    // Like button functionality
    document.addEventListener('click', (e) => {
        if (e.target.closest('.like-btn')) {
            const button = e.target.closest('.like-btn');
            const articleId = button.getAttribute('data-article-id');
            toggleLike(articleId, button);
        }
        
        if (e.target.closest('.bookmark-btn')) {
            const button = e.target.closest('.bookmark-btn');
            const articleId = button.getAttribute('data-article-id');
            toggleBookmark(articleId, button);
        }
        
        if (e.target.closest('.share-btn')) {
            const button = e.target.closest('.share-btn');
            const articleId = button.getAttribute('data-article-id');
            openShareModal(articleId);
        }
    });
}

// Toggle like on article
function toggleLike(articleId, button) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        showToast('Please login to like articles', 'error');
        document.getElementById('login-modal').classList.add('active');
        return;
    }
    
    let articles = JSON.parse(localStorage.getItem('articles'));
    const articleIndex = articles.findIndex(a => a.id === articleId);
    
    if (articleIndex === -1) return;
    
    // Check if user already liked the article
    const userLikes = JSON.parse(localStorage.getItem('userLikes')) || {};
    const hasLiked = userLikes[currentUser.id] && userLikes[currentUser.id].includes(articleId);
    
    if (hasLiked) {
        // Unlike
        articles[articleIndex].likes--;
        userLikes[currentUser.id] = userLikes[currentUser.id].filter(id => id !== articleId);
        button.innerHTML = `<i class="far fa-heart"></i> ${articles[articleIndex].likes}`;
    } else {
        // Like
        articles[articleIndex].likes++;
        if (!userLikes[currentUser.id]) userLikes[currentUser.id] = [];
        userLikes[currentUser.id].push(articleId);
        button.innerHTML = `<i class="fas fa-heart"></i> ${articles[articleIndex].likes}`;
    }
    
    // Update storage
    localStorage.setItem('articles', JSON.stringify(articles));
    localStorage.setItem('userLikes', JSON.stringify(userLikes));
    
    // Show feedback
    showToast(hasLiked ? 'Article unliked' : 'Article liked', 'success');
}

// Toggle bookmark on article
function toggleBookmark(articleId, button) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        showToast('Please login to bookmark articles', 'error');
        document.getElementById('login-modal').classList.add('active');
        return;
    }
    
    // Get user bookmarks
    const userBookmarks = JSON.parse(localStorage.getItem('userBookmarks')) || {};
    const hasBookmarked = userBookmarks[currentUser.id] && userBookmarks[currentUser.id].includes(articleId);
    
    if (hasBookmarked) {
        // Remove bookmark
        userBookmarks[currentUser.id] = userBookmarks[currentUser.id].filter(id => id !== articleId);
        button.innerHTML = '<i class="far fa-bookmark"></i>';
    } else {
        // Add bookmark
        if (!userBookmarks[currentUser.id]) userBookmarks[currentUser.id] = [];
        userBookmarks[currentUser.id].push(articleId);
        button.innerHTML = '<i class="fas fa-bookmark"></i>';
    }
    
    // Update storage
    localStorage.setItem('userBookmarks', JSON.stringify(userBookmarks));
    
    // Show feedback
    showToast(hasBookmarked ? 'Bookmark removed' : 'Article bookmarked', 'success');
}

// Open share modal for article
function openShareModal(articleId) {
    const articles = JSON.parse(localStorage.getItem('articles'));
    const article = articles.find(a => a.id === articleId);
    
    if (!article) return;
    
    const shareModal = document.getElementById('share-modal');
    const shareUrl = document.getElementById('share-url');
    
    // Set share URL
    shareUrl.value = `${window.location.origin}/article.html?id=${articleId}`;
    
    // Open modal
    shareModal.classList.add('active');
    
    // Initialize share buttons
    document.querySelector('.copy-link').addEventListener('click', () => {
        copyToClipboard(shareUrl.value)
            .then(() => showToast('Link copied to clipboard', 'success'))
            .catch(() => showToast('Failed to copy link', 'error'));
    });
}

// Initialize search functionality
function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchClose = document.querySelector('.search-close');
    const searchBar = document.querySelector('.search-bar');
    const searchInput = searchBar.querySelector('input');
    
    // Toggle search bar
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            searchBar.classList.toggle('active');
            if (searchBar.classList.contains('active')) {
                searchInput.focus();
            }
        });
    }
    
    // Close search bar
    if (searchClose) {
        searchClose.addEventListener('click', () => {
            searchBar.classList.remove('active');
        });
    }
    
    // Search functionality
    searchInput.addEventListener('input', debounce(() => {
        const query = searchInput.value.trim().toLowerCase();
        
        if (query.length === 0) {
            loadArticles();
            return;
        }
        
        const articles = JSON.parse(localStorage.getItem('articles'));
        const filteredArticles = articles.filter(article => 
            article.title.toLowerCase().includes(query) || 
            article.content.toLowerCase().includes(query) ||
            article.tags.some(tag => tag.toLowerCase().includes(query))
        );
        
        displayArticles(filteredArticles);
    }, 300));
}
