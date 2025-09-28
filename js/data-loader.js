
// Data loader for dynamic content rendering
class DataLoader {
    constructor() {
        this.cache = new Map();
        this.init();
    }

    init() {
        this.loadPageContent();
    }

    async loadPageContent() {
        try {
            // Load content based on current page
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            
            switch (currentPage) {
                case 'index.html':
                case '':
                    await this.loadHomeContent();
                    break;
                case 'services.html':
                    await this.loadServicesContent();
                    break;
                case 'portfolio.html':
                    await this.loadPortfolioContent();
                    break;
                case 'pricing.html':
                    await this.loadPricingContent();
                    break;
                case 'blog.html':
                    await this.loadBlogContent();
                    break;
                case 'faq.html':
                    await this.loadFAQContent();
                    break;
                case 'about.html':
                    await this.loadAboutContent();
                    break;
            }
        } catch (error) {
            console.error('Error loading page content:', error);
        }
    }

    async loadData(filename) {
        if (this.cache.has(filename)) {
            return this.cache.get(filename);
        }

        try {
            const response = await fetch(`data/${filename}`);
            if (!response.ok) {
                throw new Error(`Failed to load ${filename}`);
            }
            
            const data = await response.json();
            this.cache.set(filename, data);
            return data;
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            return null;
        }
    }

    async loadHomeContent() {
        // Load quick summaries
        const quickSummariesElement = document.getElementById('quickSummaries');
        if (quickSummariesElement) {
            const summaries = [
                {
                    icon: '🎨',
                    title: 'Creative Design',
                    description: 'Stunning, user-friendly designs that capture your brand essence and engage your audience.'
                },
                {
                    icon: '⚡',
                    title: 'Fast Performance',
                    description: 'Lightning-fast websites optimized for speed, SEO, and mobile responsiveness.'
                },
                {
                    icon: '🚀',
                    title: 'Growth Focused',
                    description: 'Strategic digital solutions that drive traffic, leads, and business growth.'
                }
            ];

            quickSummariesElement.innerHTML = summaries.map(item => `
                <div class="card">
                    <div class="card-body">
                        <div class="service-icon" style="margin-bottom: 1.5rem;">
                            ${item.icon}
                        </div>
                        <h3 class="card-title">${item.title}</h3>
                        <p class="card-description">${item.description}</p>
                    </div>
                </div>
            `).join('');
        }

        // Load services preview
        const servicesData = await this.loadData('services.json');
        const servicesPreviewElement = document.getElementById('servicesPreview');
        
        if (servicesData && servicesPreviewElement) {
            const featuredServices = servicesData.slice(0, 3);
            servicesPreviewElement.innerHTML = `
                <div class="grid grid-3">
                    ${featuredServices.map(service => `
                        <div class="service-card">
                            <div class="service-icon">
                                ${service.icon}
                            </div>
                            <h3>${service.title}</h3>
                            <p>${service.description}</p>
                            <ul style="text-align: left; margin-bottom: 2rem;">
                                ${service.features.slice(0, 3).map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                            <a href="services.html#${service.id}" class="btn btn-outline">Learn More</a>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Load portfolio preview
        const portfolioData = await this.loadData('portfolio.json');
        const portfolioPreviewElement = document.getElementById('portfolioPreview');
        
        if (portfolioData && portfolioPreviewElement) {
            const featuredProjects = portfolioData.slice(0, 6);
            portfolioPreviewElement.innerHTML = `
                <div class="grid grid-3">
                    ${featuredProjects.map(project => `
                        <div class="portfolio-card">
                            <div class="portfolio-image">
                                <img src="${project.image}" alt="${project.title}" loading="lazy">
                                <div class="portfolio-overlay">
                                    <div class="portfolio-overlay-content">
                                        <h4>${project.title}</h4>
                                        <p>${project.category}</p>
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
        }

        // Load testimonials
        const testimonials = [
            {
                content: "DevCircle transformed our online presence completely. Their attention to detail and creative approach exceeded our expectations. Our website traffic increased by 300% within the first month!",
                author: "Sarah Kimani",
                position: "CEO, Kimani Enterprises",
                avatar: "assets/img/testimonial-1.jpg"
            },
            {
                content: "The team at DevCircle is incredibly professional and talented. They delivered our e-commerce site on time and within budget. The results speak for themselves - our online sales have doubled!",
                author: "James Mwangi",
                position: "Founder, TechHub Kenya",
                avatar: "assets/img/testimonial-2.jpg"
            },
            {
                content: "Working with DevCircle was a game-changer for our business. Their SEO expertise helped us rank #1 on Google for our main keywords. Highly recommended!",
                author: "Grace Achieng",
                position: "Marketing Director, EcoSolutions",
                avatar: "assets/img/testimonial-3.jpg"
            }
        ];

        const testimonialsElement = document.getElementById('testimonialsCarousel');
        if (testimonialsElement) {
            testimonialsElement.innerHTML = `
                <div class="carousel">
                    <div class="carousel-container">
                        <div class="carousel-track" id="testimonialsTrack">
                            ${testimonials.map(testimonial => `
                                <div class="carousel-slide">
                                    <div class="testimonial">
                                        <div class="testimonial-content">
                                            "${testimonial.content}"
                                        </div>
                                        <div class="testimonial-author">
                                            <img src="${testimonial.avatar}" alt="${testimonial.author}" class="testimonial-avatar">
                                            <div class="testimonial-info">
                                                <h4>${testimonial.author}</h4>
                                                <p>${testimonial.position}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="carousel-controls">
                        <button class="carousel-btn" id="testimonialsPrev" aria-label="Previous testimonial">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15,18 9,12 15,6"></polyline>
                            </svg>
                        </button>
                        <button class="carousel-btn" id="testimonialsNext" aria-label="Next testimonial">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9,18 15,12 9,6"></polyline>
                            </svg>
                        </button>
                    </div>
                    <div class="carousel-dots" id="testimonialsDots"></div>
                </div>
            `;

            // Initialize testimonials carousel
            if (typeof Carousel !== 'undefined') {
                new Carousel('testimonialsCarousel', { autoplay: true, interval: 5000 });
            }
        }

        // Load client logos
        const clientLogos = [
            { name: 'TechCorp', logo: 'assets/img/client-1.png' },
            { name: 'InnovateLab', logo: 'assets/img/client-2.png' },
            { name: 'DigitalHub', logo: 'assets/img/client-3.png' },
            { name: 'StartupXYZ', logo: 'assets/img/client-4.png' },
            { name: 'GrowthCo', logo: 'assets/img/client-5.png' },
            { name: 'FutureTech', logo: 'assets/img/client-6.png' }
        ];

        const clientMarqueeElement = document.getElementById('clientMarquee');
        if (clientMarqueeElement) {
            clientMarqueeElement.innerHTML = `
                <div class="client-marquee-track">
                    ${clientLogos.concat(clientLogos).map(client => `
                        <img src="${client.logo}" alt="${client.name}" class="client-logo">
                    `).join('')}
                </div>
            `;
        }
    }

    async loadServicesContent() {
        const servicesData = await this.loadData('services.json');
        const servicesContainer = document.getElementById('servicesContainer');
        
        if (servicesData && servicesContainer) {
            servicesContainer.innerHTML = servicesData.map(service => `
                <section id="${service.id}" class="service-section">
                    <div class="container">
                        <div class="grid grid-2" style="gap: 4rem; align-items: center;">
                            <div>
                                <div class="service-icon" style="width: 80px; height: 80px; font-size: 2rem; margin-bottom: 2rem;">
                                    ${service.icon}
                                </div>
                                <h2>${service.title}</h2>
                                <p style="font-size: 1.125rem; margin-bottom: 2rem;">${service.description}</p>
                                <h3>What's Included:</h3>
                                <ul style="margin-bottom: 2rem;">
                                    ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                                </ul>
                                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                                    <a href="contact.html" class="btn btn-primary">Request Quote</a>
                                    <a href="https://wa.me/254743750237" class="btn btn-accent">Chat on WhatsApp</a>
                                </div>
                            </div>
                            <div>
                                <img src="${service.image}" alt="${service.title}" style="border-radius: 1rem; box-shadow: var(--shadow-xl);">
                            </div>
                        </div>
                    </div>
                </section>
            `).join('');
        }
    }

    async loadPortfolioContent() {
        const portfolioData = await this.loadData('portfolio.json');
        const portfolioGrid = document.getElementById('portfolioGrid');
        
        if (portfolioData && portfolioGrid) {
            portfolioGrid.innerHTML = `
                <div class="grid grid-3">
                    ${portfolioData.map((project, index) => `
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

            // Initialize portfolio filters and lightbox
            this.initializePortfolioFilters(portfolioData);
        }
    }

    async loadPricingContent() {
        const pricingData = await this.loadData('pricing.json');
        const pricingGrid = document.getElementById('pricingGrid');
        
        if (pricingData && pricingGrid) {
            pricingGrid.innerHTML = `
                <div class="grid grid-3">
                    ${pricingData.map(plan => `
                        <div class="pricing-card ${plan.featured ? 'featured' : ''}">
                            <div class="pricing-header">
                                <h3 class="pricing-title">${plan.name}</h3>
                                <div class="pricing-price">${plan.price}</div>
                                <div class="pricing-period">${plan.period}</div>
                            </div>
                            <ul class="pricing-features">
                                ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                            <a href="contact.html" class="btn ${plan.featured ? 'btn-primary' : 'btn-outline'} btn-large">
                                Get Started
                            </a>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    async loadBlogContent() {
        const postsData = await this.loadData('posts.json');
        const blogGrid = document.getElementById('blogGrid');
        
        if (postsData && blogGrid) {
            blogGrid.innerHTML = `
                <div class="grid grid-3">
                    ${postsData.map(post => `
                        <article class="card">
                            <img src="${post.featured_image}" alt="${post.title}" class="card-image">
                            <div class="card-body">
                                <div style="margin-bottom: 1rem;">
                                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                </div>
                                <h3 class="card-title">${post.title}</h3>
                                <p class="card-description">${post.excerpt}</p>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
                                    <small style="color: var(--gray-500);">
                                        ${DevCircleApp.formatDate(post.published_date)}
                                    </small>
                                    <a href="blog/${post.slug}.html" class="btn btn-outline btn-small">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </article>
                    `).join('')}
                </div>
            `;
        }
    }

    async loadFAQContent() {
        const faqData = await this.loadData('faq.json');
        const faqContainer = document.getElementById('faqContainer');
        
        if (faqData && faqContainer) {
            faqContainer.innerHTML = `
                <div class="accordion">
                    ${faqData.map((faq, index) => `
                        <div class="accordion-item">
                            <button class="accordion-header" data-target="faq-${index}">
                                ${faq.question}
                                <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="6,9 12,15 18,9"></polyline>
                                </svg>
                            </button>
                            <div class="accordion-content" id="faq-${index}">
                                <div class="accordion-body">
                                    ${faq.answer}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

            // Initialize accordion functionality
            this.initializeAccordion();
        }
    }

    async loadAboutContent() {
        const teamData = await this.loadData('team.json');
        const teamGrid = document.getElementById('teamGrid');
        
        if (teamData && teamGrid) {
            teamGrid.innerHTML = `
                <div class="grid grid-3">
                    ${teamData.map(member => `
                        <div class="card">
                            <div class="card-body" style="text-align: center;">
                                <img src="${member.photo}" alt="${member.name}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin: 0 auto 1.5rem;">
                                <h3 class="card-title">${member.name}</h3>
                                <p style="color: var(--brand-blue); font-weight: 500; margin-bottom: 1rem;">${member.role}</p>
                                <p class="card-description">${member.bio}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    initializePortfolioFilters(portfolioData) {
        // Create filter buttons
        const categories = [...new Set(portfolioData.map(project => project.category))];
        const filtersContainer = document.getElementById('portfolioFilters');
        
        if (filtersContainer) {
            filtersContainer.innerHTML = `
                <button class="btn btn-outline portfolio-filter active" data-filter="all">All</button>
                ${categories.map(category => `
                    <button class="btn btn-outline portfolio-filter" data-filter="${category}">
                        ${category}
                    </button>
                `).join('')}
            `;

            // Add filter functionality
            const filterButtons = filtersContainer.querySelectorAll('.portfolio-filter');
            filterButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const filter = e.target.dataset.filter;
                    this.filterPortfolio(filter, filterButtons);
                });
            });
        }
    }

    filterPortfolio(filter, filterButtons) {
        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        const activeButton = Array.from(filterButtons).find(btn => btn.dataset.filter === filter);
        if (activeButton) activeButton.classList.add('active');

        // Filter portfolio items
        const portfolioItems = document.querySelectorAll('.portfolio-card');
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    initializeAccordion() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const targetId = header.dataset.target;
                const content = document.getElementById(targetId);
                const isActive = header.classList.contains('active');

                // Close all other accordion items
                accordionHeaders.forEach(h => {
                    h.classList.remove('active');
                    const c = document.getElementById(h.dataset.target);
                    if (c) c.classList.remove('active');
                });

                // Toggle current item
                if (!isActive) {
                    header.classList.add('active');
                    if (content) content.classList.add('active');
                }
            });
        });
    }
}

// Initialize data loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DataLoader();
});