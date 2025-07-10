// Load research highlights for homepage
function loadResearchHighlights(limit = 3) {
    fetch('data/research.json')
        .then(response => response.json())
        .then(research => {
            let html = '';
            research.slice(0, limit).forEach(item => {
                html += `
                <div class="col-md-4 mb-4">
                    <div class="research-card card h-100 border-0 shadow-sm">
                        <img src="${item.image}" class="card-img-top" alt="${item.title}">
                        <div class="card-body">
                            <span class="badge bg-primary mb-2">${item.category}</span>
                            <h3 class="card-title">${item.title}</h3>
                            <p class="card-text">${item.excerpt}</p>
                        </div>
                        <div class="card-footer bg-transparent border-0">
                            <a href="${item.url}" class="btn btn-sm btn-outline-primary">Read More</a>
                        </div>
                    </div>
                </div>`;
            });
            document.getElementById('research-highlights').innerHTML = html;
        });
}

// Load latest news for homepage
function loadLatestNews(limit = 3) {
    fetch('data/news.json')
        .then(response => response.json())
        .then(news => {
            let html = '';
            news.slice(0, limit).forEach(item => {
                html += `
                <div class="col-md-4 mb-4">
                    <div class="news-card card h-100 border-0 shadow-sm">
                        <div class="news-badge">${item.category}</div>
                        <img src="${item.image}" class="card-img-top" alt="${item.title}">
                        <div class="card-body">
                            <h3 class="card-title">${item.title}</h3>
                            <p class="card-text">${item.excerpt}</p>
                        </div>
                        <div class="card-footer bg-transparent">
                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-muted">${formatDate(item.date)}</small>
                                <a href="${item.url}" class="btn btn-sm btn-outline-primary">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>`;
            });
            document.getElementById('latest-news').innerHTML = html;
        });
}

// Load team members for about page
function loadTeamMembers() {
    fetch('data/team.json')
        .then(response => response.json())
        .then(team => {
            let html = '';
            team.forEach(member => {
                html += `
                <div class="col-md-6 col-lg-3 mb-4">
                    <div class="team-card card h-100 border-0 shadow-sm">
                        <img src="${member.image}" class="card-img-top" alt="${member.name}">
                        <div class="card-body text-center">
                            <h4 class="card-title mb-1">${member.name}</h4>
                            <p class="card-text text-muted mb-2">${member.position}</p>
                            <div class="social-links">
                                <a href="${member.linkedin}" class="text-decoration-none" target="_blank"><i class="bi bi-linkedin"></i></a>
                                <a href="${member.twitter}" class="text-decoration-none mx-2" target="_blank"><i class="bi bi-twitter"></i></a>
                                <a href="mailto:${member.email}" class="text-decoration-none"><i class="bi bi-envelope"></i></a>
                            </div>
                        </div>
                    </div>
                </div>`;
            });
            document.getElementById('team-members').innerHTML = html;
        });
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Animate statistics
function animateStatistics() {
    const statItems = document.querySelectorAll('.stat-number');
    statItems.forEach(item => {
        const target = parseInt(item.getAttribute('data-count'));
        const duration = 2000; // Animation duration in ms
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            item.textContent = Math.floor(current);
        }, 16);
    });
}

// Initialize tooltips
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Initialize popovers
function initPopovers() {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

// Document ready
document.addEventListener('DOMContentLoaded', function() {
    initTooltips();
    initPopovers();
});

// Function to load blog posts
function loadBlogPosts() {
    fetch('../data/blog-posts.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('blog-posts');
            if (!container) return;

            // Filter out the featured post (already shown)
            const regularPosts = data.posts.filter(post => !post.featured);
            
            container.innerHTML = regularPosts.map(post => `
                <div class="col-md-6 mb-4">
                    <div class="card shadow h-100">
                        <img src="${post.image}" class="card-img-top" alt="${post.title}" style="height: 200px; object-fit: cover;">
                        <div class="card-body">
                            <span class="badge bg-primary mb-2">${post.category.charAt(0).toUpperCase() + post.category.slice(1)}</span>
                            <h3 class="h5">${post.title}</h3>
                            <p class="card-text">${post.excerpt}</p>
                        </div>
                        <div class="card-footer bg-transparent">
                            <div class="d-flex align-items-center">
                                <img src="${post.authorAvatar}" class="rounded-circle me-2" width="40" height="40" alt="${post.author}">
                                <div>
                                    <h6 class="mb-0">${post.author}</h6>
                                    <small class="text-muted">${post.readTime} • ${new Date(post.date).toLocaleDateString()}</small>
                                </div>
                            </div>
                            <a href="post.html?id=${post.id}" class="stretched-link"></a>
                        </div>
                    </div>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Error loading blog posts:', error);
            document.getElementById('blog-posts').innerHTML = `
                <div class="col-12 text-center py-5">
                    <div class="alert alert-warning">Blog posts could not be loaded. Please try again later.</div>
                </div>
            `;
        });
}

// Function to load popular authors
function loadPopularAuthors() {
    fetch('../data/blog-posts.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('popular-authors');
            if (!container) return;

            container.innerHTML = data.popularAuthors.map(author => `
                <div class="d-flex align-items-center mb-3">
                    <img src="${author.avatar}" class="rounded-circle me-3" width="50" height="50" alt="${author.name}">
                    <div>
                        <h6 class="mb-0">${author.name}</h6>
                        <small class="text-muted">${author.role}</small>
                        <div class="mt-1">
                            <small class="text-muted">${author.postCount} articles</small>
                        </div>
                    </div>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Error loading popular authors:', error);
            document.getElementById('popular-authors').innerHTML = `
                <div class="alert alert-warning">Authors list could not be loaded.</div>
            `;
        });
}

// Initialize blog when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadBlogPosts();
    loadPopularAuthors();
    
    // Blog subscription form handling
    const subscriptionForm = document.getElementById('blog-subscription');
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulate form submission (replace with actual API call)
            console.log('Subscribing email:', email);
            
            // Show success message
            alert('Thank you for subscribing to our blog!');
            this.reset();
        });
    }
});