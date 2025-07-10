// Load services for services page
function loadServices() {
    fetch('../data/services.json')
        .then(response => response.json())
        .then(services => {
            let html = '';
            services.forEach(service => {
                html += `
                <div class="col-md-6 col-lg-4">
                    <div class="service-card card h-100 border-0 shadow-sm animate__animated animate__fadeInUp">
                        <div class="card-img-top bg-light p-4 text-center">
                            <img src="${service.icon}" alt="${service.title}" width="80">
                        </div>
                        <div class="card-body">
                            <h3 class="card-title">${service.title}</h3>
                            <p class="card-text">${service.excerpt}</p>
                            <ul class="service-features list-unstyled">
                                ${service.features.map(feature => `<li><i class="bi bi-check-circle text-primary me-2"></i> ${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="card-footer bg-transparent border-0">
                            <a href="${service.url}" class="btn btn-primary">Learn More</a>
                        </div>
                    </div>
                </div>`;
            });
            document.getElementById('services-container').innerHTML = html;
        });
}

// Load blog posts
function loadBlogPosts() {
    fetch('../data/blogs.json')
        .then(response => response.json())
        .then(blogs => {
            let html = '';
            blogs.forEach(blog => {
                html += `
                <div class="col-md-6 mb-4">
                    <div class="blog-card card h-100 border-0 shadow-sm">
                        <img src="${blog.image}" class="card-img-top" alt="${blog.title}">
                        <div class="card-body">
                            <span class="badge bg-primary mb-2">${blog.category}</span>
                            <h3 class="card-title">${blog.title}</h3>
                            <p class="card-text">${blog.excerpt}</p>
                        </div>
                        <div class="card-footer bg-transparent">
                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-muted">${formatDate(blog.date)} • ${blog.read_time}</small>
                                <a href="${blog.url}" class="btn btn-sm btn-outline-primary">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>`;
            });
            document.getElementById('blog-posts').innerHTML = html;
        });
}

// Load popular authors
function loadPopularAuthors() {
    fetch('../data/authors.json')
        .then(response => response.json())
        .then(authors => {
            let html = '';
            authors.slice(0, 5).forEach(author => {
                html += `
                <div class="author-item d-flex mb-3">
                    <img src="${author.image}" alt="${author.name}" class="rounded-circle me-3" width="50">
                    <div>
                        <h6 class="mb-0">${author.name}</h6>
                        <small class="text-muted">${author.role}</small>
                        <a href="../blogs/authors/${author.slug}.html" class="d-block small">View articles</a>
                    </div>
                </div>`;
            });
            document.getElementById('popular-authors').innerHTML = html;
        });
}

// Load related articles
function loadRelatedArticles(keyword, containerId) {
    fetch('../data/news.json')
        .then(response => response.json())
        .then(articles => {
            const related = articles.filter(article => 
                article.tags.includes(keyword.toLowerCase())
            ).slice(0, 3);
            
            let html = '';
            related.forEach(article => {
                html += `
                <div class="col-md-4">
                    <div class="card h-100">
                        <img src="${article.image}" class="card-img-top" alt="${article.title}">
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">${article.excerpt}</p>
                            <a href="${article.url}" class="btn btn-sm btn-outline-primary">Read More</a>
                        </div>
                    </div>
                </div>`;
            });
            document.getElementById(containerId).innerHTML = html;
        });
}


