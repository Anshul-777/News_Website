// videos.js
import { formatDate, showToast } from './utils.js';

// Initialize videos functionality
document.addEventListener('DOMContentLoaded', () => {
    // Load and display videos
    loadVideos();
    
    // Initialize video interactions
    initVideoInteractions();
});

// Load videos from localStorage or mock data
function loadVideos() {
    let videos = JSON.parse(localStorage.getItem('videos'));
    
    // If no videos in localStorage, load mock data
    if (!videos || videos.length === 0) {
        videos = generateMockVideos();
        localStorage.setItem('videos', JSON.stringify(videos));
    }
    
    // Display videos
    displayVideos(videos);
}

// Generate mock videos for demo
function generateMockVideos() {
    const categories = ['news', 'technology', 'sports', 'entertainment', 'education'];
    const mockVideos = [];
    
    for (let i = 1; i <= 12; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const title = `Sample Video ${i} About ${category.charAt(0).toUpperCase() + category.slice(1)}`;
        
        mockVideos.push({
            id: `video-${i}`,
            title,
            description: `This is a sample video description for video ${i} in the ${category} category. The video would show interesting content related to this topic.`,
            category,
            author: `Channel ${i}`,
            date: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
            videoUrl: `https://www.youtube.com/embed/video${i}`,
            thumbnailUrl: `assets/images/placeholder-video-${i % 4 + 1}.jpg`,
            duration: Math.floor(Math.random() * 600) + 60, // 1-10 minutes
            views: Math.floor(Math.random() * 100000),
            likes: Math.floor(Math.random() * 5000),
            comments: Math.floor(Math.random() * 300),
            tags: [`tag${i}`, category, 'video', 'trending']
        });
    }
    
    return mockVideos;
}

// Display videos in the grid
function displayVideos(videos) {
    const container = document.getElementById('trending-videos-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.className = 'video-card hover-shadow';
        videoElement.innerHTML = `
            <div class="video-card-thumbnail">
                <img src="${video.thumbnailUrl}" alt="${video.title}">
                <div class="video-card-play">
                    <i class="fas fa-play"></i>
                </div>
                <div class="video-card-duration">${formatDuration(video.duration)}</div>
            </div>
            <div class="video-card-content">
                <h3 class="video-card-title">${video.title}</h3>
                <div class="video-card-meta">
                    <span>${video.author}</span>
                    <span class="video-card-views">
                        <i class="fas fa-eye"></i> ${formatViews(video.views)}
                    </span>
                </div>
            </div>
        `;
        
        container.appendChild(videoElement);
    });
}

// Format duration in MM:SS format
function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Format views count
function formatViews(views) {
    if (views >= 1000000) {
        return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
        return `${(views / 1000).toFixed(1)}K`;
    }
    return views;
}

// Initialize video interaction buttons
function initVideoInteractions() {
    // Video play functionality
    document.addEventListener('click', (e) => {
        if (e.target.closest('.video-card-thumbnail')) {
            const thumbnail = e.target.closest('.video-card-thumbnail');
            const videoCard = thumbnail.closest('.video-card');
            const videoTitle = videoCard.querySelector('.video-card-title').textContent;
            
            // In a real app, this would open the video player
            showToast(`Playing: ${videoTitle}`, 'info');
        }
    });
}
