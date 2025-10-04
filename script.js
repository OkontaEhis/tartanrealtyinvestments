// Tartan Realty - Progressive Web Application
// Enhanced JavaScript for modern user experience

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initPropertyFilters();
    initContactForm();
    initScrollAnimations();
    initProgressiveWebApp();


   // Set mobile viewport height fix
    setMobileViewHeight();
    
    // Preload critical images
    preloadImages();
    
    // Track page load
    trackPageView(window.location.pathname);
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Property filters functionality
function initPropertyFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            propertyCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    card.classList.add('animate-fade-in-up');
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filterValue) {
                        card.style.display = 'block';
                        card.classList.add('animate-fade-in-up');
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('animate-fade-in-up');
                    }
                }
            });
        });
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('consultation-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateForm(data)) {
                // Simulate form submission
                submitForm(data);
            }
        });
    }
}

function validateForm(data) {
    const requiredFields = ['name', 'email', 'service'];
    let isValid = true;
    
    // Remove previous error styling
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
        field.style.borderColor = '#cbd5e1';
    });
    
    // Check required fields
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            const fieldElement = document.getElementById(field);
            if (fieldElement) {
                fieldElement.style.borderColor = '#ef4444';
                fieldElement.focus();
            }
            isValid = false;
        }
    });
    
    // Validate email
    if (data.email && !isValidEmail(data.email)) {
        const emailField = document.getElementById('email');
        emailField.style.borderColor = '#ef4444';
        showNotification('Please enter a valid email address', 'error');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitForm(data) {
    const submitBtn = document.querySelector('.btn[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        document.getElementById('consultation-form').reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Thank you! Your consultation request has been sent. We\'ll contact you within 24 hours.', 'success');
        
        // Log to console (in a real app, this would be sent to a server)
        console.log('Form submitted:', data);
    }, 2000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles if not already added
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 1rem;
                border-radius: 12px;
                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                z-index: 10000;
                max-width: 400px;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-success {
                border-left: 4px solid #10b981;
            }
            .notification-error {
                border-left: 4px solid #ef4444;
            }
            .notification-info {
                border-left: 4px solid #3b82f6;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .notification-close {
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                background: none;
                border: none;
                cursor: pointer;
                color: #64748b;
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.service-card, .property-card, .contact-item');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Progressive Web App functionality
function initProgressiveWebApp() {
    // Register service worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('SW registered: ', registration);
                })
                .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
    
    // Handle install prompt
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later
        deferredPrompt = e;
        // Show install button (you could add this to your UI)
        showInstallPromotion();
    });
    
    function showInstallPromotion() {
        // Create install banner
        const installBanner = document.createElement('div');
        installBanner.className = 'install-banner';
        installBanner.innerHTML = `
            <div class="install-content">
                <div class="install-text">
                    <h3>Install Tartan Realty App</h3>
                    <p>Get quick access to properties and services</p>
                </div>
                <div class="install-actions">
                    <button class="btn btn-primary install-btn">Install</button>
                    <button class="btn btn-secondary dismiss-btn">Not Now</button>
                </div>
            </div>
        `;
        
        // Add styles
        const styles = document.createElement('style');
        styles.textContent = `
            .install-banner {
                position: fixed;
                bottom: 20px;
                left: 20px;
                right: 20px;
                background: white;
                padding: 1rem;
                border-radius: 12px;
                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
                z-index: 10000;
                transform: translateY(100%);
                transition: transform 0.3s ease;
            }
            .install-banner.show {
                transform: translateY(0);
            }
            .install-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            .install-actions {
                display: flex;
                gap: 0.5rem;
            }
            .install-actions .btn {
                padding: 0.5rem 1rem;
                font-size: 0.9rem;
            }
            @media (max-width: 768px) {
                .install-content {
                    flex-direction: column;
                    text-align: center;
                }
            }
        `;
        document.head.appendChild(styles);
        
        // Add to page
        document.body.appendChild(installBanner);
        setTimeout(() => installBanner.classList.add('show'), 100);
        
        // Handle install button click
        installBanner.querySelector('.install-btn').addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to the install prompt: ${outcome}`);
                deferredPrompt = null;
            }
            installBanner.remove();
        });
        
        // Handle dismiss button click
        installBanner.querySelector('.dismiss-btn').addEventListener('click', () => {
            installBanner.classList.remove('show');
            setTimeout(() => installBanner.remove(), 300);
        });
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (installBanner.parentNode) {
                installBanner.classList.remove('show');
                setTimeout(() => installBanner.remove(), 300);
            }
        }, 10000);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced scroll performance
const throttledScroll = debounce(() => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
}, 10);

window.addEventListener('scroll', throttledScroll);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadImages();

// Analytics and performance tracking (placeholder)
function trackPageView(page) {
    // In a real application, you would send this to your analytics service
    console.log(`Page view: ${page}`);
}

function trackUserInteraction(action, element) {
    // In a real application, you would send this to your analytics service
    console.log(`User interaction: ${action} on ${element}`);
}

// Track page load
trackPageView(window.location.pathname);

// Add interaction tracking to important elements
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn, .nav-link, .property-card')) {
        trackUserInteraction('click', e.target.className);
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    // Track page load performance
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In a real application, you would send this to your error tracking service
});

// Handle online/offline status
window.addEventListener('online', function() {
    showNotification('You are back online!', 'success');
});

window.addEventListener('offline', function() {
    showNotification('You are now offline. Some features may be limited.', 'info');
});

// ROI Calculator functionality
function calculateROI() {
    // Get input values
    const propertyPrice = parseFloat(document.getElementById('property-price').value) || 0;
    const monthlyRent = parseFloat(document.getElementById('monthly-rent').value) || 0;
    const annualExpenses = parseFloat(document.getElementById('annual-expenses').value) || 0;
    const depositPercent = parseFloat(document.getElementById('deposit-percent').value) || 25;
    
    // Validate inputs
    if (propertyPrice <= 0 || monthlyRent <= 0) {
        showNotification('Please enter valid property price and monthly rent values.', 'error');
        return;
    }
    
    // Calculate values
    const annualRent = monthlyRent * 12;
    const netAnnualIncome = annualRent - annualExpenses;
    const deposit = (propertyPrice * depositPercent) / 100;
    const loanAmount = propertyPrice - deposit;
    
    // Calculate rental yield (gross)
    const rentalYield = (annualRent / propertyPrice) * 100;
    
    // Calculate cash-on-cash ROI (simplified)
    const cashOnCashROI = (netAnnualIncome / deposit) * 100;
    
    // Calculate monthly cash flow (simplified - not including mortgage payments)
    const monthlyCashFlow = monthlyRent - (annualExpenses / 12);
    
    // Display results
    document.getElementById('rental-yield').textContent = rentalYield.toFixed(2) + '%';
    document.getElementById('cash-roi').textContent = cashOnCashROI.toFixed(2) + '%';
    document.getElementById('monthly-cash-flow').textContent = '£' + monthlyCashFlow.toLocaleString('en-GB', { maximumFractionDigits: 0 });
    document.getElementById('initial-investment').textContent = '£' + deposit.toLocaleString('en-GB', { maximumFractionDigits: 0 });
    
    // Highlight results based on performance
    const resultItems = document.querySelectorAll('.result-item');
    resultItems.forEach(item => item.classList.remove('highlight'));
    
    // Highlight good yields (>6%) and ROI (>15%)
    if (rentalYield >= 6) {
        resultItems[0].classList.add('highlight');
    }
    if (cashOnCashROI >= 15) {
        resultItems[1].classList.add('highlight');
    }
    
    // Show success notification
    showNotification('ROI calculation completed! Results are displayed on the right.', 'success');
    
    // Track interaction
    trackUserInteraction('calculate_roi', 'roi-calculator');
    
    // Smooth scroll to results on mobile
    if (window.innerWidth <= 768) {
        document.querySelector('.calculator-results').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }
}

// Add keyboard support for calculator
document.addEventListener('DOMContentLoaded', function() {
    const calculatorInputs = document.querySelectorAll('#calculator input');
    calculatorInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateROI();
            }
        });
    });
});