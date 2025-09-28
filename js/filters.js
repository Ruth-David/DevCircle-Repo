// Blog and Portfolio filtering functionality
class FilterManager {
    constructor() {
        this.posts = [];
        this.filteredPosts = [];
        this.currentFilter = 'all';
        this.currentSearch = '';
        this.init();
    }

    async init() {
        await this.loadBlogData();
        this.setupEventListeners();
        this.renderFilters();
        this.renderPosts();
    }

    async loadBlogData() {
        try {
            const response = await fetch('data/posts.json');
            if (!response.ok) {
                throw new Error('Failed to load blog data');
            }
            this.posts = await response.json();
            this.filteredPosts = [...this.posts];
        } catch (error) {
            console.error('Error loading blog data:', error);
            this.posts = [];
            this.filteredPosts = [];
        }
    }

    setupEventListeners() {
        // Search input
        const searchInput = document.getElementById('blogSearch');
        if (searchInput) {
            searchInput.addEventListener('input', DevCircleApp.debounce((e) => {
                this.currentSearch = e.target.value.toLowerCase();
                this.applyFilters();
            }, 300));
        }
    }

    renderFilters() {
        const filtersContainer = document.getElementById('blogFilters');
        if (!filtersContainer || this.posts.length === 0) return;

        // Get unique categories
        const categories = [...new Set(this.posts.map(post => post.category))];
        
        const filterButtons = [
            { value: 'all', label: 'All Posts' },
            ...categories.map(category => ({ value: category, label: category }))
        ];

        filtersContainer.innerHTML = filterButtons.map(filter => `
            <button class="btn btn-outline blog-filter ${filter.value === this.currentFilter ? 'active' : ''}" 
                    data-filter="${filter.value}">
                ${filter.label}
            </button>
        `).join('');

        // Add event listeners to filter buttons
        filtersContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('blog-filter')) {
                const filter = e.target.dataset.filter;
                this.setFilter(filter);
            }
        });
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        const filterButtons = document.querySelectorAll('.blog-filter');
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        this.applyFilters();
    }

    applyFilters() {
        let filtered = [...this.posts];

        // Apply category filter
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(post => post.category === this.currentFilter);
        }

        // Apply search filter
        if (this.currentSearch) {
            filtered = filtered.filter(post => {
                const searchText = this.currentSearch;
                return (
                    post.title.toLowerCase().includes(searchText) ||
                    post.excerpt.toLowerCase().includes(searchText) ||
                    post.tags.some(tag => tag.toLowerCase().includes(searchText)) ||
                    post.category.toLowerCase().includes(searchText)
                );
            });
        }

        this.filteredPosts = filtered;
        this.renderPosts();
    }

    renderPosts() {
        const blogGrid = document.getElementById('blogGrid');
        const noResults = document.getElementById('noResults');
        
        if (!blogGrid) return;

        if (this.filteredPosts.length === 0) {
            blogGrid.style.display = 'none';
            if (noResults) noResults.style.display = 'block';
            return;
        }

        blogGrid.style.display = 'block';
        if (noResults) noResults.style.display = 'none';

        blogGrid.innerHTML = `
            <div class="grid grid-3">
                ${this.filteredPosts.map(post => `
                    <article class="card">
                        <img src="${post.featured_image}" alt="${post.title}" class="card-image" loading="lazy">
                        <div class="card-body">
                            <div style="margin-bottom: 1rem;">
                                <span class="tag tag-primary">${post.category}</span>
                                ${post.tags.slice(0, 2).map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                            <h3 class="card-title">${post.title}</h3>
                            <p class="card-description">${post.excerpt}</p>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; font-size: 0.875rem; color: var(--gray-500);">
                                <div>
                                    <span>${DevCircleApp.formatDate(post.published_date)}</span>
                                    <span style="margin: 0 0.5rem;">•</span>
                                    <span>${post.reading_time} min read</span>
                                </div>
                                <button class="btn btn-outline btn-small" onclick="this.openPost('${post.slug}')">
                                    Read More
                                </button>
                            </div>
                        </div>
                    </article>
                `).join('')}
            </div>
        `;
    }

    openPost(slug) {
        // In a real implementation, this would navigate to the blog post
        // For now, we'll show a placeholder message
        DevCircleApp.showToast(`Blog post "${slug}" would open here. This is a demo.`, 'info');
    }

    // Public API
    getFilteredPosts() {
        return this.filteredPosts;
    }

    getCurrentFilter() {
        return this.currentFilter;
    }

    getCurrentSearch() {
        return this.currentSearch;
    }
}

// Portfolio filtering (for portfolio page)
class PortfolioFilter {
    constructor() {
        this.projects = [];
        this.filteredProjects = [];
        this.currentFilter = 'all';
        this.init();
    }

    async init() {
        await this.loadPortfolioData();
        this.setupFilters();
        this.renderProjects();
    }

    async loadPortfolioData() {
        try {
            const response = await fetch('data/portfolio.json');
            if (!response.ok) {
                throw new Error('Failed to load portfolio data');
            }
            this.projects = await response.json();
            this.filteredProjects = [...this.projects];
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            this.projects = [];
            this.filteredProjects = [];
        }
    }

    setupFilters() {
        const filtersContainer = document.getElementById('portfolioFilters');
        if (!filtersContainer || this.projects.length === 0) return;

        // Get unique categories
        const categories = [...new Set(this.projects.map(project => project.category))];
        
        const filterButtons = [
            { value: 'all', label: 'All Projects' },
            ...categories.map(category => ({ value: category, label: category }))
        ];

        filtersContainer.innerHTML = filterButtons.map(filter => `
            <button class="btn btn-outline portfolio-filter ${filter.value === this.currentFilter ? 'active' : ''}" 
                    data-filter="${filter.value}">
                ${filter.label}
            </button>
        `).join('');

        // Add event listeners
        filtersContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('portfolio-filter')) {
                const filter = e.target.dataset.filter;
                this.setFilter(filter);
            }
        });
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        const filterButtons = document.querySelectorAll('.portfolio-filter');
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        this.applyFilter();
    }

    applyFilter() {
        if (this.currentFilter === 'all') {
            this.filteredProjects = [...this.projects];
        } else {
            this.filteredProjects = this.projects.filter(project => 
                project.category === this.currentFilter
            );
        }

        this.renderProjects();
    }

    renderProjects() {
        const portfolioGrid = document.getElementById('portfolioGrid');
        if (!portfolioGrid) return;

        if (this.filteredProjects.length === 0) {
            portfolioGrid.innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <h3>No projects found</h3>
                    <p>Try selecting a different category.</p>
                </div>
            `;
            return;
        }

        portfolioGrid.innerHTML = `
            <div class="grid grid-3">
                ${this.filteredProjects.map((project, index) => `
                    <div class="portfolio-card" data-category="${project.category}" data-index="${index}">
                        <div class="portfolio-image">
                            <img src="${project.image}" alt="${project.title}" loading="lazy">
                            <div class="portfolio-overlay">
                                <div class="portfolio-overlay-content">
                                    <h4>${project.title}</h4>
                                    <button class="btn btn-secondary btn-small portfolio-view" data-index="${index}">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="portfolio-info">
                            <h4 class="portfolio-title">${project.title}</h4>
                            <p class="portfolio-description">${project.description}</p>
                            <div class="portfolio-tags">
                                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Add animation to filtered items
        const portfolioCards = portfolioGrid.querySelectorAll('.portfolio-card');
        portfolioCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Public API
    getFilteredProjects() {
        return this.filteredProjects;
    }

    getCurrentFilter() {
        return this.currentFilter;
    }
}

// Initialize filters based on current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'blog.html') {
        window.blogFilter = new FilterManager();
    } else if (currentPage === 'portfolio.html') {
        window.portfolioFilter = new PortfolioFilter();
    }
});

// Make classes available globally
window.FilterManager = FilterManager;
window.PortfolioFilter = PortfolioFilter;