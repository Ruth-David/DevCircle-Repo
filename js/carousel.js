// Carousel component for testimonials and other content
class Carousel {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.options = {
            autoplay: options.autoplay || false,
            interval: options.interval || 3000,
            showDots: options.showDots !== false,
            showControls: options.showControls !== false,
            ...options
        };

        this.currentIndex = 0;
        this.slides = [];
        this.isPlaying = false;
        this.intervalId = null;

        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.setupDots();
        
        if (this.options.autoplay) {
            this.play();
        }

        // Update display
        this.updateDisplay();
    }

    setupElements() {
        this.track = this.container.querySelector('.carousel-track');
        this.slides = Array.from(this.track?.children || []);
        this.prevButton = this.container.querySelector('#testimonialsPrev') || 
                         this.container.querySelector('.carousel-prev');
        this.nextButton = this.container.querySelector('#testimonialsNext') || 
                         this.container.querySelector('.carousel-next');
        this.dotsContainer = this.container.querySelector('.carousel-dots');
    }

    setupEventListeners() {
        // Previous button
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => {
                this.prevSlide();
            });
        }

        // Next button
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => {
                this.nextSlide();
            });
        }

        // Keyboard navigation
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });

        // Touch/swipe support
        this.setupTouchEvents();

        // Pause on hover
        this.container.addEventListener('mouseenter', () => {
            this.pause();
        });

        this.container.addEventListener('mouseleave', () => {
            if (this.options.autoplay) {
                this.play();
            }
        });

        // Pause when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else if (this.options.autoplay) {
                this.play();
            }
        });
    }

    setupTouchEvents() {
        let startX = 0;
        let startY = 0;
        let isDragging = false;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
            this.pause();
        }, { passive: true });

        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = startX - currentX;
            const diffY = startY - currentY;

            // If it's more of a vertical scroll, don't interfere
            if (Math.abs(diffY) > Math.abs(diffX)) {
                isDragging = false;
                return;
            }

            e.preventDefault();
        }, { passive: false });

        this.track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }

            isDragging = false;
            
            if (this.options.autoplay) {
                this.play();
            }
        }, { passive: true });
    }

    setupDots() {
        if (!this.options.showDots || !this.dotsContainer || this.slides.length <= 1) {
            return;
        }

        this.dotsContainer.innerHTML = this.slides.map((_, index) => `
            <button class="carousel-dot ${index === 0 ? 'active' : ''}" 
                    data-index="${index}" 
                    aria-label="Go to slide ${index + 1}"></button>
        `).join('');

        // Add dot event listeners
        this.dotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('carousel-dot')) {
                const index = parseInt(e.target.dataset.index);
                this.goToSlide(index);
            }
        });
    }

    updateDisplay() {
        if (!this.track || this.slides.length === 0) return;

        // Update track position
        const translateX = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${translateX}%)`;

        // Update dots
        const dots = this.dotsContainer?.querySelectorAll('.carousel-dot');
        if (dots) {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        }

        // Update button states
        if (this.prevButton) {
            this.prevButton.disabled = this.currentIndex === 0 && !this.isInfinite();
        }

        if (this.nextButton) {
            this.nextButton.disabled = this.currentIndex === this.slides.length - 1 && !this.isInfinite();
        }

        // Update ARIA attributes
        this.slides.forEach((slide, index) => {
            slide.setAttribute('aria-hidden', index !== this.currentIndex);
            if (index === this.currentIndex) {
                slide.setAttribute('tabindex', '0');
            } else {
                slide.setAttribute('tabindex', '-1');
            }
        });
    }

    nextSlide() {
        if (this.currentIndex < this.slides.length - 1) {
            this.currentIndex++;
        } else if (this.isInfinite()) {
            this.currentIndex = 0;
        }
        
        this.updateDisplay();
        this.announceSlideChange();
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else if (this.isInfinite()) {
            this.currentIndex = this.slides.length - 1;
        }
        
        this.updateDisplay();
        this.announceSlideChange();
    }

    goToSlide(index) {
        if (index >= 0 && index < this.slides.length) {
            this.currentIndex = index;
            this.updateDisplay();
            this.announceSlideChange();
        }
    }

    play() {
        if (this.isPlaying || this.slides.length <= 1) return;
        
        this.isPlaying = true;
        this.intervalId = setInterval(() => {
            this.nextSlide();
        }, this.options.interval);
    }

    pause() {
        this.isPlaying = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    stop() {
        this.pause();
        this.currentIndex = 0;
        this.updateDisplay();
    }

    destroy() {
        this.pause();
        // Remove event listeners and clean up
        this.container = null;
        this.track = null;
        this.slides = [];
    }

    isInfinite() {
        return this.options.infinite !== false;
    }

    announceSlideChange() {
        // For screen readers
        const announcement = `Slide ${this.currentIndex + 1} of ${this.slides.length}`;
        
        // Create or update live region for accessibility
        let liveRegion = document.getElementById('carousel-live-region');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'carousel-live-region';
            liveRegion.className = 'sr-only';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            document.body.appendChild(liveRegion);
        }
        
        liveRegion.textContent = announcement;
    }

    // Public API methods
    getCurrentIndex() {
        return this.currentIndex;
    }

    getSlideCount() {
        return this.slides.length;
    }

    isAutoPlaying() {
        return this.isPlaying;
    }
}

// Auto-initialize carousels with data attributes
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('[data-carousel]');
    
    carousels.forEach(carousel => {
        const options = {
            autoplay: carousel.dataset.autoplay === 'true',
            interval: parseInt(carousel.dataset.interval) || 3000,
            showDots: carousel.dataset.showDots !== 'false',
            showControls: carousel.dataset.showControls !== 'false',
            infinite: carousel.dataset.infinite !== 'false'
        };
        
        new Carousel(carousel.id, options);
    });
});

// Make Carousel available globally
window.Carousel = Carousel;