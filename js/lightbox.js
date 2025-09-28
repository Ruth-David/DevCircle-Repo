// Lightbox component for portfolio images
class Lightbox {
    constructor() {
        this.currentIndex = 0;
        this.items = [];
        this.modal = null;
        this.init();
    }

    init() {
        this.createModal();
        this.setupEventListeners();
    }

    createModal() {
        // Check if modal already exists
        this.modal = document.getElementById('portfolioModal');
        if (!this.modal) {
            this.modal = document.createElement('div');
            this.modal.id = 'portfolioModal';
            this.modal.className = 'modal-backdrop';
            this.modal.innerHTML = `
                <div class="modal" style="max-width: 900px;">
                    <div class="modal-header">
                        <h3 class="modal-title" id="modalTitle">Project Title</h3>
                        <button class="modal-close" id="modalClose" aria-label="Close modal">&times;</button>
                    </div>
                    <div class="modal-body" id="modalBody">
                        <!-- Content will be loaded here -->
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline" id="modalClose2">Close</button>
                        <a href="contact.html" class="btn btn-primary">Start Your Project</a>
                    </div>
                </div>
            `;
            document.body.appendChild(this.modal);
        }
    }

    setupEventListeners() {
        // Portfolio view buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.portfolio-view') || e.target.closest('.portfolio-view')) {
                e.preventDefault();
                const button = e.target.matches('.portfolio-view') ? e.target : e.target.closest('.portfolio-view');
                const index = parseInt(button.dataset.index);
                this.openModal(index);
            }
        });

        // Modal close buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('#modalClose') || e.target.matches('#modalClose2')) {
                this.closeModal();
            }
        });

        // Close modal when clicking backdrop
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal && this.modal.classList.contains('active')) {
                switch (e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.previousItem();
                        break;
                    case 'ArrowRight':
                        this.nextItem();
                        break;
                }
            }
        });
    }

    async openModal(index) {
        try {
            // Load portfolio data
            const portfolioData = await this.loadPortfolioData();
            if (!portfolioData || !portfolioData[index]) {
                console.error('Portfolio item not found');
                return;
            }

            this.items = portfolioData;
            this.currentIndex = index;
            
            this.updateModalContent();
            this.showModal();
        } catch (error) {
            console.error('Error opening modal:', error);
        }
    }

    async loadPortfolioData() {
        try {
            const response = await fetch('data/portfolio.json');
            if (!response.ok) {
                throw new Error('Failed to load portfolio data');
            }
            return await response.json();
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            return null;
        }
    }

    updateModalContent() {
        if (!this.items[this.currentIndex]) return;

        const item = this.items[this.currentIndex];
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        if (modalTitle) {
            modalTitle.textContent = item.title;
        }

        if (modalBody) {
            modalBody.innerHTML = `
                <div class="grid grid-2" style="gap: 2rem; align-items: start;">
                    <div>
                        <img src="${item.image}" alt="${item.title}" style="width: 100%; border-radius: 0.5rem; box-shadow: var(--shadow-md);">
                        
                        <div style="margin-top: 1.5rem;">
                            <h4>Technologies Used</h4>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
                                ${item.technologies.map(tech => `
                                    <span class="tag tag-primary">${tech}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <div style="margin-bottom: 1.5rem;">
                            <h4>Project Overview</h4>
                            <p>${item.description}</p>
                        </div>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <h4>Project Details</h4>
                            <div style="display: grid; gap: 0.5rem;">
                                <div><strong>Client:</strong> ${item.client}</div>
                                <div><strong>Year:</strong> ${item.year}</div>
                                <div><strong>Category:</strong> ${item.category}</div>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <h4>Project Tags</h4>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
                                ${item.tags.map(tag => `
                                    <span class="tag">${tag}</span>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <h4>Results Achieved</h4>
                            <p style="background: var(--gray-50); padding: 1rem; border-radius: 0.5rem; border-left: 4px solid var(--success);">
                                ${item.results}
                            </p>
                        </div>
                        
                        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                            <a href="https://wa.me/254743750237" class="btn btn-primary">
                                Start Similar Project
                            </a>
                            <a href="contact.html" class="btn btn-outline">
                                Get Quote
                            </a>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--gray-200);">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: var(--gray-500);">
                            Project ${this.currentIndex + 1} of ${this.items.length}
                        </span>
                        <div style="display: flex; gap: 0.5rem;">
                            <button class="btn btn-outline btn-small" onclick="lightbox.previousItem()" ${this.currentIndex === 0 ? 'disabled' : ''}>
                                ← Previous
                            </button>
                            <button class="btn btn-outline btn-small" onclick="lightbox.nextItem()" ${this.currentIndex === this.items.length - 1 ? 'disabled' : ''}>
                                Next →
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    previousItem() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateModalContent();
        }
    }

    nextItem() {
        if (this.currentIndex < this.items.length - 1) {
            this.currentIndex++;
            this.updateModalContent();
        }
    }

    showModal() {
        if (this.modal) {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus management for accessibility
            const firstFocusable = this.modal.querySelector('button, a, input, textarea, select');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Return focus to the trigger button
            const triggerButton = document.querySelector(`[data-index="${this.currentIndex}"]`);
            if (triggerButton) {
                triggerButton.focus();
            }
        }
    }

    destroy() {
        if (this.modal && this.modal.parentNode) {
            this.modal.parentNode.removeChild(this.modal);
        }
    }
}

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.lightbox = new Lightbox();
});

// Make Lightbox available globally
window.Lightbox = Lightbox;