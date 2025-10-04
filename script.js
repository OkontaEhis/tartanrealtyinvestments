// Tartan Realty - Progressive Web Application
// Enhanced JavaScript for modern user experience with comprehensive mobile optimization

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initPropertyFilters();
    initContactForm();
    initScrollAnimations();
    initProgressiveWebApp();
    initMobileOptimizations();
    initROICalculator();
    
    // Set mobile viewport height fix
    setMobileViewHeight();
    
    // Preload critical images
    preloadImages();
    
    // Track page load
    trackPageView(window.location.pathname);
});

// Enhanced Navigation functionality with mobile improvements
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    // Mobile menu toggle with body scroll lock
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Haptic feedback for mobile
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }

    // Enhanced navbar background on scroll
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', throttle(() => {
        const navbar = document.querySelector('.navbar');
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            if (currentScrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            }
            
            // Hide/show navbar on scroll (mobile)
            if (window.innerWidth <= 768) {
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            }
        }
        
        lastScrollY = currentScrollY;
    }, 10));

    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - (window.innerWidth <= 768 ? 70 : 80);
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced Property filters functionality with mobile improvements
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

            // Animate cards out first
            propertyCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            });

            // Then show/hide and animate in
            setTimeout(() => {
                propertyCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.transition = 'all 0.3s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            }, 150);

            // Haptic feedback for mobile
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }

            // Track interaction
            trackUserInteraction('property_filter', filterValue);
        });
    });

    // Initialize with 'all' filter active
    const allFilter = document.querySelector('.filter-btn[data-filter="all"]');
    if (allFilter) {
        allFilter.click();
    }
}

// Enhanced Contact form functionality with better validation
function initContactForm() {
    const form = document.getElementById('consultation-form');
    
    if (form) {
        // Real form submission to Formspree
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Let the form submit naturally to Formspree
            // Reset button after a delay (in case of errors)
            setTimeout(() => {
                if (submitBtn.disabled) {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            }, 5000);
            
            // Track form submission
            trackUserInteraction('form_submit', 'consultation_form');
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Clear error state on input
                this.style.borderColor = '';
                const errorMsg = this.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });

            // Prevent zoom on iOS when focusing inputs
            input.addEventListener('focus', function() {
                if (window.innerWidth <= 768) {
                    this.style.fontSize = '16px';
                }
            });
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Email validation
    if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    }

    // Phone validation (basic)
    if (field.type === 'tel' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
    }

    // Show error state
    if (!isValid) {
        field.style.borderColor = '#ef4444';
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;';
        errorDiv.textContent = errorMessage;
        field.parentNode.appendChild(errorDiv);
    } else {
        field.style.borderColor = '#10b981';
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced notification system
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

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
                border-left: 4px solid #6b46c1;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-success {
                border-left-color: #10b981;
            }
            .notification-error {
                border-left-color: #ef4444;
            }
            .notification-info {
                border-left-color: #3b82f6;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: #374151;
                font-weight: 500;
            }
            .notification-close {
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                background: none;
                border: none;
                cursor: pointer;
                color: #64748b;
                padding: 0.25rem;
                border-radius: 4px;
                transition: background-color 0.2s;
            }
            .notification-close:hover {
                background-color: #f3f4f6;
            }
            @media (max-width: 768px) {
                .notification {
                    left: 20px;
                    right: 20px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// Enhanced scroll animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                // Stagger animations for multiple elements
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                entry.target.style.animationDelay = `${delay}ms`;
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.service-card, .property-card, .contact-item, .stat-item, .highlight-item');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Add CSS animations if not already added
    if (!document.getElementById('scroll-animations')) {
        const styles = document.createElement('style');
        styles.id = 'scroll-animations';
        styles.textContent = `
            .animate-fade-in-up {
                animation: fadeInUp 0.6s ease-out forwards;
            }
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(styles);
    }
}

// Enhanced Progressive Web App functionality
function initProgressiveWebApp() {
    // Register service worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('./sw.js')
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
        e.preventDefault();
        deferredPrompt = e;
        showInstallPromotion();
    });
    
    function showInstallPromotion() {
        // Only show on mobile devices
        if (window.innerWidth <= 768) {
            const installBanner = document.createElement('div');
            installBanner.className = 'install-banner';
            installBanner.innerHTML = `
                <div class="install-content">
                    <div class="install-icon">
                        <i class="fas fa-mobile-alt"></i>
                    </div>
                    <div class="install-text">
                        <h4>Install Tartan Realty</h4>
                        <p>Get quick access to properties and services</p>
                    </div>
                    <div class="install-actions">
                        <button class="btn btn-primary install-btn">Install</button>
                        <button class="btn-close dismiss-btn"><i class="fas fa-times"></i></button>
                    </div>
                </div>
            `;
            
            // Add install banner styles
            if (!document.getElementById('install-banner-styles')) {
                const styles = document.createElement('style');
                styles.id = 'install-banner-styles';
                styles.textContent = `
                    .install-banner {
                        position: fixed;
                        bottom: 20px;
                        left: 20px;
                        right: 20px;
                        background: linear-gradient(135deg, var(--primary-color), var(--primary-bright));
                        color: white;
                        padding: 1rem;
                        border-radius: 12px;
                        box-shadow: 0 10px 25px -5px rgba(107, 70, 193, 0.3);
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
                        gap: 1rem;
                    }
                    .install-icon {
                        font-size: 2rem;
                        opacity: 0.9;
                    }
                    .install-text {
                        flex: 1;
                    }
                    .install-text h4 {
                        margin: 0 0 0.25rem 0;
                        font-size: 1rem;
                        font-weight: 600;
                    }
                    .install-text p {
                        margin: 0;
                        font-size: 0.875rem;
                        opacity: 0.9;
                    }
                    .install-actions {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                    }
                    .install-btn {
                        padding: 0.5rem 1rem;
                        font-size: 0.875rem;
                        background: rgba(255, 255, 255, 0.2);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        backdrop-filter: blur(10px);
                    }
                    .install-btn:hover {
                        background: rgba(255, 255, 255, 0.3);
                    }
                    .btn-close {
                        background: none;
                        border: none;
                        color: rgba(255, 255, 255, 0.8);
                        cursor: pointer;
                        padding: 0.5rem;
                        border-radius: 50%;
                        transition: background-color 0.2s;
                    }
                    .btn-close:hover {
                        background: rgba(255, 255, 255, 0.2);
                        color: white;
                    }
                `;
                document.head.appendChild(styles);
            }
            
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
                trackUserInteraction('pwa_install', 'install_prompt');
            });
            
            // Handle dismiss button click
            installBanner.querySelector('.dismiss-btn').addEventListener('click', () => {
                installBanner.classList.remove('show');
                setTimeout(() => installBanner.remove(), 300);
                trackUserInteraction('pwa_dismiss', 'install_prompt');
            });
            
            // Auto-hide after 15 seconds
            setTimeout(() => {
                if (installBanner.parentNode) {
                    installBanner.classList.remove('show');
                    setTimeout(() => installBanner.remove(), 300);
                }
            }, 15000);
        }
    }
}

// Mobile-specific optimizations
function initMobileOptimizations() {
    // Touch-friendly form improvements
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            // Prevent zoom on iOS when focusing inputs
            if (window.innerWidth <= 768) {
                this.style.fontSize = '16px';
            }
        });
    });

    // Add mobile-specific styles
    if (!document.getElementById('mobile-optimizations')) {
        const styles = document.createElement('style');
        styles.id = 'mobile-optimizations';
        styles.textContent = `
            .menu-open {
                overflow: hidden;
            }
            .menu-open .nav-menu.active {
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                bottom: 0;
                overflow-y: auto;
            }
            
            /* Touch-friendly improvements */
            @media (hover: none) and (pointer: coarse) {
                .btn {
                    min-height: 48px;
                    padding: 1rem 1.5rem;
                }
                .nav-link {
                    min-height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .filter-btn {
                    min-height: 44px;
                }
                .social-link {
                    min-width: 44px;
                    min-height: 44px;
                }
            }
            
            /* Landscape mobile optimization */
            @media (max-width: 896px) and (orientation: landscape) {
                .hero {
                    min-height: 100vh;
                    padding: 60px 0 1rem;
                }
                .hero-title {
                    font-size: 1.75rem;
                    margin-bottom: 0.75rem;
                }
                .hero-buttons {
                    flex-direction: row;
                    justify-content: center;
                    gap: 1rem;
                }
                .hero-buttons .btn {
                    width: auto;
                    min-width: 160px;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // Mobile viewport height fix for iOS
    setMobileViewHeight();
    window.addEventListener('resize', setMobileViewHeight);
    window.addEventListener('orientationchange', () => {
        setTimeout(setMobileViewHeight, 100);
    });
}

// Mobile viewport height fix
function setMobileViewHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Update mobile padding
    document.documentElement.style.setProperty('--mobile-padding', window.innerWidth <= 768 ? '1rem' : '2rem');
}

// Enhanced ROI Calculator functionality
function initROICalculator() {
    const calculatorInputs = document.querySelectorAll('#calculator input');
    
    calculatorInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateROI();
            }
        });
        
        // Format number inputs on blur
        input.addEventListener('blur', function() {
            if (this.type === 'number' && this.value) {
                const value = parseFloat(this.value);
                if (!isNaN(value)) {
                    this.value = value.toLocaleString('en-GB');
                }
            }
        });
        
        // Remove formatting on focus
        input.addEventListener('focus', function() {
            if (this.type === 'number') {
                this.value = this.value.replace(/,/g, '');
            }
        });
    });
}

// Enhanced ROI Calculator function
function calculateROI() {
    // Get input values and remove formatting
    const propertyPriceInput = document.getElementById('property-price');
    const monthlyRentInput = document.getElementById('monthly-rent');
    const annualExpensesInput = document.getElementById('annual-expenses');
    const depositPercentInput = document.getElementById('deposit-percent');
    
    if (!propertyPriceInput || !monthlyRentInput || !annualExpensesInput || !depositPercentInput) {
        showNotification('Calculator inputs not found. Please refresh the page.', 'error');
        return;
    }
    
    const propertyPrice = parseFloat(propertyPriceInput.value.replace(/,/g, '')) || 0;
    const monthlyRent = parseFloat(monthlyRentInput.value.replace(/,/g, '')) || 0;
    const annualExpenses = parseFloat(annualExpensesInput.value.replace(/,/g, '')) || 0;
    const depositPercent = parseFloat(depositPercentInput.value) || 25;
    
    // Validate inputs
    if (propertyPrice <= 0 || monthlyRent <= 0) {
        showNotification('Please enter valid property price and monthly rent values.', 'error');
        return;
    }
    
    // Calculate values
    const annualRent = monthlyRent * 12;
    const netAnnualIncome = annualRent - annualExpenses;
    const deposit = (propertyPrice * depositPercent) / 100;
    
    // Calculate rental yield (gross)
    const rentalYield = (annualRent / propertyPrice) * 100;
    
    // Calculate cash-on-cash ROI
    const cashOnCashROI = deposit > 0 ? (netAnnualIncome / deposit) * 100 : 0;
    
    // Calculate monthly cash flow (simplified)
    const monthlyCashFlow = (netAnnualIncome / 12);
    
    // Display results with proper formatting
    const resultElements = {
        yield: document.getElementById('rental-yield'),
        roi: document.getElementById('cash-roi'),
        cashFlow: document.getElementById('monthly-cash-flow'),
        investment: document.getElementById('initial-investment')
    };
    
    if (resultElements.yield) resultElements.yield.textContent = rentalYield.toFixed(1) + '%';
    if (resultElements.roi) resultElements.roi.textContent = cashOnCashROI.toFixed(1) + '%';
    if (resultElements.cashFlow) resultElements.cashFlow.textContent = '£' + monthlyCashFlow.toLocaleString('en-GB', { maximumFractionDigits: 0 });
    if (resultElements.investment) resultElements.investment.textContent = '£' + deposit.toLocaleString('en-GB', { maximumFractionDigits: 0 });
    
    // Visual feedback for mobile
    const resultsSection = document.querySelector('.calculator-results');
    if (resultsSection) {
        resultsSection.style.transform = 'scale(0.98)';
        setTimeout(() => {
            resultsSection.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Highlight good performance
    Object.values(resultElements).forEach(el => {
        if (el) {
            el.style.color = '';
            el.style.fontWeight = '';
        }
    });
    
    if (rentalYield >= 6 && resultElements.yield) {
        resultElements.yield.style.color = '#10b981';
        resultElements.yield.style.fontWeight = '700';
    }
    
    if (cashOnCashROI >= 15 && resultElements.roi) {
        resultElements.roi.style.color = '#10b981';
        resultElements.roi.style.fontWeight = '700';
    }
    
    // Show success notification
    showNotification('ROI calculation completed! ' + (rentalYield >= 6 || cashOnCashROI >= 15 ? 'Great returns!' : 'Results calculated.'), 'success');
    
    // Track interaction
    trackUserInteraction('calculate_roi', `yield_${rentalYield.toFixed(1)}_roi_${cashOnCashROI.toFixed(1)}`);
    
    // Auto-scroll to results on mobile
    if (window.innerWidth <= 768 && resultsSection) {
        setTimeout(() => {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
    }
    
    // Haptic feedback
    if ('vibrate' in navigator) {
        navigator.vibrate(100);
    }
}

// Utility functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

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

// Enhanced scroll performance with parallax
const throttledScroll = throttle(() => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    if (parallax && window.innerWidth > 768) { // Only on desktop
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll, { passive: true });

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop&crop=center&auto=format&q=80'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Analytics and performance tracking
function trackPageView(page) {
    console.log(`Page view: ${page} at ${new Date().toISOString()}`);
    // In production, send to analytics service
}

function trackUserInteraction(action, element) {
    console.log(`User interaction: ${action} on ${element} at ${new Date().toISOString()}`);
    // In production, send to analytics service
}

// Performance monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
            console.log('Page load time:', Math.round(perfData.loadEventEnd - perfData.loadEventStart), 'ms');
            console.log('DOM content loaded:', Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart), 'ms');
        }
    }
});

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    showNotification('An error occurred. Please refresh the page if issues persist.', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// Network status handling
window.addEventListener('online', function() {
    showNotification('You are back online!', 'success');
});

window.addEventListener('offline', function() {
    showNotification('You are now offline. Some features may be limited.', 'info');
});

// Add interaction tracking to important elements
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        trackUserInteraction('button_click', e.target.textContent.trim());
    }
    if (e.target.matches('.nav-link')) {
        trackUserInteraction('navigation_click', e.target.textContent.trim());
    }
    if (e.target.matches('.property-card') || e.target.closest('.property-card')) {
        trackUserInteraction('property_view', 'property_card');
    }
}, { passive: true });

// Enhanced lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Service Worker update notification
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        showNotification('App updated! New features available.', 'success');
    });
}

// Keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
});

console.log('🏠 Tartan Realty website loaded successfully!');