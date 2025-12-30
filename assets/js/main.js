// Hardy.Digital - Enhanced Main JavaScript

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class for fade-in effect
    document.body.classList.add('loaded');

    // Initialize all components
    initThemeToggle();
    initMobileMenu();
    initCloudAnimation();
    initSmoothScroll();
    initScrollAnimations();
});

// Dark Mode Toggle with LocalStorage Persistence
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Apply saved theme
    if (currentTheme === 'dark') {
        htmlElement.classList.add('dark');
    }

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            htmlElement.classList.toggle('dark');

            // Save preference
            const newTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');
        });

        // Close menu when clicking a link
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
            });
        });
    }
}

// Cloud JTBD Animation
function initCloudAnimation() {
    const cloudContainer = document.getElementById('cloud-container');
    const mainCloud = document.getElementById('main-cloud');
    const jtbdOrbit = document.getElementById('jtbd-orbit');

    if (!cloudContainer || !mainCloud || !jtbdOrbit) return;

    let animationStarted = false;

    // Trigger orbit animation after a delay
    setTimeout(() => {
        jtbdOrbit.classList.add('active');
        animationStarted = true;
    }, 2000);

    // Optional: Add hover interaction to trigger orbit
    cloudContainer.addEventListener('mouseenter', function() {
        if (!animationStarted) {
            jtbdOrbit.classList.add('active');
            animationStarted = true;
        }
    });

    // Add click interaction for mobile
    cloudContainer.addEventListener('click', function() {
        if (!animationStarted) {
            jtbdOrbit.classList.add('active');
            animationStarted = true;
        } else {
            // Toggle orbit visibility on subsequent clicks
            jtbdOrbit.classList.toggle('active');
        }
    });
}

// Smooth Scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll-based animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation to improve performance
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections except hero
    document.querySelectorAll('section:not(#hero)').forEach(section => {
        observer.observe(section);
    });

    // Hero is always visible
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
}

// Optional: Add parallax effect to hero gradient
function initParallaxEffect() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;

        if (scrolled <= window.innerHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Optional: Initialize parallax (commented out by default)
// initParallaxEffect();

// Email copy functionality (for future use)
function copyEmail(email) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
            showNotification('Email copied to clipboard!');
        });
    }
}

// Simple notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// Console Easter Egg
console.log('%cHardy.Digital', 'color: #14b8a6; font-size: 24px; font-weight: bold;');
console.log('%cLooking for something? Let\'s talk! → hello@hardy.digital', 'color: #3b82f6; font-size: 14px;');
