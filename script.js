// Tartan Realty - Clean and Simple JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initPropertyFilters();
    initContactForm();
    initScrollAnimations();
    initProgressiveWebApp();
    initROICalculator();
});

// Simple Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
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

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Simple navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }
    });

    // Simple smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Simple Property filters functionality
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
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Initialize with 'all' filter active
    const allFilter = document.querySelector('.filter-btn[data-filter="all"]');
    if (allFilter) {
        allFilter.click();
    }
}

// Simple Contact form functionality
function initContactForm() {
    const form = document.getElementById('consultation-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Let the form submit naturally (to Formspree or your backend)
            // Reset button after a delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }
}

// Simple scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.service-card, .property-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Simple Progressive Web App functionality
function initProgressiveWebApp() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    }
}

// ROI Calculator functionality
function initROICalculator() {
    const calculatorInputs = document.querySelectorAll('#calculator input');
    calculatorInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateROI();
            }
        });
    });
}

// Calculate ROI function
function calculateROI() {
    const propertyPrice = parseFloat(document.getElementById('property-price').value) || 0;
    const monthlyRent = parseFloat(document.getElementById('monthly-rent').value) || 0;
    const annualExpenses = parseFloat(document.getElementById('annual-expenses').value) || 0;
    const depositPercent = parseFloat(document.getElementById('deposit-percent').value) || 25;
    
    if (propertyPrice <= 0 || monthlyRent <= 0) {
        alert('Please enter valid property price and monthly rent values.');
        return;
    }
    
    // Calculate values
    const annualRent = monthlyRent * 12;
    const netAnnualIncome = annualRent - annualExpenses;
    const deposit = (propertyPrice * depositPercent) / 100;
    
    const rentalYield = (annualRent / propertyPrice) * 100;
    const cashOnCashROI = deposit > 0 ? (netAnnualIncome / deposit) * 100 : 0;
    const monthlyCashFlow = netAnnualIncome / 12;
    
    // Display results
    document.getElementById('rental-yield').textContent = rentalYield.toFixed(1) + '%';
    document.getElementById('cash-roi').textContent = cashOnCashROI.toFixed(1) + '%';
    document.getElementById('monthly-cash-flow').textContent = '£' + monthlyCashFlow.toLocaleString('en-GB', { maximumFractionDigits: 0 });
    document.getElementById('initial-investment').textContent = '£' + deposit.toLocaleString('en-GB', { maximumFractionDigits: 0 });
    
    // Highlight good performance
    const yieldElement = document.getElementById('rental-yield');
    const roiElement = document.getElementById('cash-roi');
    
    // Reset colors
    yieldElement.style.color = '';
    roiElement.style.color = '';
    
    // Highlight if good returns
    if (rentalYield >= 6) {
        yieldElement.style.color = '#10b981';
        yieldElement.style.fontWeight = 'bold';
    }
    
    if (cashOnCashROI >= 15) {
        roiElement.style.color = '#10b981';
        roiElement.style.fontWeight = 'bold';
    }
    
    // Scroll to results on mobile
    if (window.innerWidth <= 768) {
        const resultsSection = document.querySelector('.calculator-results');
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

console.log('Tartan Realty website loaded successfully!');