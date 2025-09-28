// Contact form validation and handling
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.fields = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            phone: document.getElementById('phone'),
            service: document.getElementById('service'),
            budget: document.getElementById('budget'),
            message: document.getElementById('message')
        };
        this.errors = {
            name: document.getElementById('nameError'),
            email: document.getElementById('emailError'),
            message: document.getElementById('messageError')
        };
        
        this.init();
    }

    init() {
        if (!this.form) return;
        
        this.setupEventListeners();
        this.setupRealTimeValidation();
    }

    setupEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Clear errors on input
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            if (field) {
                field.addEventListener('input', () => {
                    this.clearError(fieldName);
                });
            }
        });
    }

    setupRealTimeValidation() {
        // Email validation
        if (this.fields.email) {
            this.fields.email.addEventListener('blur', () => {
                this.validateEmail();
            });
        }

        // Name validation
        if (this.fields.name) {
            this.fields.name.addEventListener('blur', () => {
                this.validateName();
            });
        }

        // Message validation
        if (this.fields.message) {
            this.fields.message.addEventListener('blur', () => {
                this.validateMessage();
            });
        }

        // Phone formatting
        if (this.fields.phone) {
            this.fields.phone.addEventListener('input', (e) => {
                this.formatPhoneNumber(e.target);
            });
        }
    }

    validateName() {
        const name = this.fields.name.value.trim();
        
        if (!name) {
            this.showError('name', 'Name is required');
            return false;
        }
        
        if (name.length < 2) {
            this.showError('name', 'Name must be at least 2 characters');
            return false;
        }
        
        if (!/^[a-zA-Z\s'-]+$/.test(name)) {
            this.showError('name', 'Name can only contain letters, spaces, hyphens, and apostrophes');
            return false;
        }
        
        this.clearError('name');
        return true;
    }

    validateEmail() {
        const email = this.fields.email.value.trim();
        
        if (!email) {
            this.showError('email', 'Email is required');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showError('email', 'Please enter a valid email address');
            return false;
        }
        
        this.clearError('email');
        return true;
    }

    validateMessage() {
        const message = this.fields.message.value.trim();
        
        if (!message) {
            this.showError('message', 'Message is required');
            return false;
        }
        
        if (message.length < 10) {
            this.showError('message', 'Message must be at least 10 characters');
            return false;
        }
        
        if (message.length > 1000) {
            this.showError('message', 'Message must be less than 1000 characters');
            return false;
        }
        
        this.clearError('message');
        return true;
    }

    formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        
        // Handle Kenyan phone numbers
        if (value.startsWith('254')) {
            value = value.substring(0, 12);
            if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 $4');
            }
        } else if (value.startsWith('0')) {
            value = value.substring(0, 10);
            if (value.length >= 4) {
                value = value.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
            }
        }
        
        input.value = value;
    }

    showError(fieldName, message) {
        const errorElement = this.errors[fieldName];
        const fieldElement = this.fields[fieldName];
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        if (fieldElement) {
            fieldElement.style.borderColor = 'var(--error)';
            fieldElement.setAttribute('aria-invalid', 'true');
        }
    }

    clearError(fieldName) {
        const errorElement = this.errors[fieldName];
        const fieldElement = this.fields[fieldName];
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        
        if (fieldElement) {
            fieldElement.style.borderColor = '';
            fieldElement.removeAttribute('aria-invalid');
        }
    }

    validateForm() {
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isMessageValid = this.validateMessage();
        
        return isNameValid && isEmailValid && isMessageValid;
    }

    getFormData() {
        return {
            name: this.fields.name.value.trim(),
            email: this.fields.email.value.trim(),
            phone: this.fields.phone.value.trim(),
            service: this.fields.service.value,
            budget: this.fields.budget.value,
            message: this.fields.message.value.trim()
        };
    }

    async handleSubmit() {
        // Validate form
        if (!this.validateForm()) {
            DevCircleApp.showToast('Please fix the errors above', 'error');
            return;
        }

        // Get form data
        const formData = this.getFormData();
        
        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            // In a real implementation, you would send this to your backend
            // For now, we'll simulate the submission
            await this.simulateSubmission(formData);
            
            // Show success message
            DevCircleApp.showToast('Message sent successfully! We\'ll get back to you within 24 hours.', 'success', 7000);
            
            // Reset form
            this.form.reset();
            
            // Optional: Redirect to thank you page or show modal
            this.showThankYouMessage(formData);
            
        } catch (error) {
            console.error('Form submission error:', error);
            DevCircleApp.showToast('Failed to send message. Please try again or contact us directly.', 'error');
        } finally {
            // Restore button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    async simulateSubmission(formData) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real implementation, replace this with actual form submission:
        // 
        // Option 1: Use a service like Formspree
        // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // });
        //
        // Option 2: Use EmailJS
        // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);
        //
        // Option 3: Send to your own backend
        // const response = await fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // });
        
        console.log('Form data that would be submitted:', formData);
        
        // Create mailto link as fallback
        const subject = encodeURIComponent(`New Contact Form Submission from ${formData.name}`);
        const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service}
Budget: ${formData.budget}

Message:
${formData.message}
        `);
        
        // Store mailto link for manual fallback
        window.contactFormMailto = `mailto:info@devcircle.co.ke?subject=${subject}&body=${body}`;
    }

    showThankYouMessage(formData) {
        // Create a simple thank you modal
        const modal = document.createElement('div');
        modal.className = 'modal-backdrop active';
        modal.innerHTML = `
            <div class="modal" style="max-width: 500px;">
                <div class="modal-header">
                    <h3>Thank You!</h3>
                    <button class="modal-close" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
                </div>
                <div class="modal-body" style="text-align: center;">
                    <div style="width: 80px; height: 80px; background: var(--success); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem;">✓</div>
                    <h4>Message Sent Successfully!</h4>
                    <p>Hi ${formData.name}, thank you for reaching out to DevCircle. We've received your message and will get back to you within 24 hours.</p>
                    <p style="font-size: 0.875rem; color: var(--gray-500);">
                        Need immediate assistance? <a href="https://wa.me/254743750237">Chat with us on WhatsApp</a>
                    </p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="this.parentElement.parentElement.parentElement.remove()">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 10000);
    }

    // Public API
    reset() {
        this.form.reset();
        Object.keys(this.errors).forEach(fieldName => {
            this.clearError(fieldName);
        });
    }

    setFieldValue(fieldName, value) {
        if (this.fields[fieldName]) {
            this.fields[fieldName].value = value;
        }
    }

    getFieldValue(fieldName) {
        return this.fields[fieldName] ? this.fields[fieldName].value : '';
    }
}

// Newsletter subscription form handler
class NewsletterForm {
    constructor() {
        this.forms = document.querySelectorAll('form[action*="newsletter"], form:has(input[type="email"][placeholder*="newsletter"]), form:has(input[type="email"][placeholder*="email"])');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            // Skip the main contact form
            if (form.id === 'contactForm') return;
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubmit(form);
            });
        });
    }

    async handleNewsletterSubmit(form) {
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button[type="submit"]');
        
        if (!emailInput || !submitButton) return;
        
        const email = emailInput.value.trim();
        
        // Validate email
        if (!email) {
            DevCircleApp.showToast('Please enter your email address', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            DevCircleApp.showToast('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;
        
        try {
            // Simulate subscription
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            DevCircleApp.showToast('Successfully subscribed to our newsletter!', 'success');
            emailInput.value = '';
            
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            DevCircleApp.showToast('Failed to subscribe. Please try again.', 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }
}

// Initialize forms when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.contactForm = new ContactForm();
    window.newsletterForm = new NewsletterForm();
});

// Make classes available globally
window.ContactForm = ContactForm;
window.NewsletterForm = NewsletterForm;