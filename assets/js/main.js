// Hardy.Digital - Main JavaScript

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class for fade-in effect
    document.body.classList.add('loaded');

    // Initialize all components
    initMobileMenu();
    initJTBDVisualization();
    initSmoothScroll();
    initScrollAnimations();
});

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

// Interactive Jobs-to-be-Done Visualization
// This is the STANDOUT ELEMENT - discrete but unmistakable
function initJTBDVisualization() {
    const svg = document.getElementById('jtbd-diagram');
    if (!svg) return;

    // JTBD Framework Elements
    const elements = [
        { id: 'customer', label: 'Customer', x: 200, y: 200, color: '#3b82f6', size: 60 },
        { id: 'job', label: 'Job', x: 100, y: 100, color: '#10b981', size: 45 },
        { id: 'outcome', label: 'Outcome', x: 300, y: 100, color: '#8b5cf6', size: 45 },
        { id: 'context', label: 'Context', x: 100, y: 300, color: '#f59e0b', size: 45 },
        { id: 'barriers', label: 'Barriers', x: 300, y: 300, color: '#ef4444', size: 45 }
    ];

    // Clear existing content
    svg.innerHTML = '';

    // Create connections (lines)
    const connections = [
        { from: 'customer', to: 'job' },
        { from: 'customer', to: 'outcome' },
        { from: 'customer', to: 'context' },
        { from: 'customer', to: 'barriers' }
    ];

    // Draw connection lines with animation
    connections.forEach((conn, index) => {
        const from = elements.find(e => e.id === conn.from);
        const to = elements.find(e => e.id === conn.to);

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', from.x);
        line.setAttribute('y1', from.y);
        line.setAttribute('x2', to.x);
        line.setAttribute('y2', to.y);
        line.setAttribute('stroke', '#cbd5e1');
        line.setAttribute('stroke-width', '2');
        line.classList.add('jtbd-line');
        line.style.animationDelay = `${index * 0.2}s`;
        svg.appendChild(line);
    });

    // Draw circular nodes
    elements.forEach((element, index) => {
        // Create group for each element
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('data-id', element.id);
        group.style.opacity = '0';
        group.style.animation = `fadeIn 0.6s ease-out ${0.5 + index * 0.15}s forwards`;

        // Pulsing background circle (only for customer - the center)
        if (element.id === 'customer') {
            const pulseCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            pulseCircle.setAttribute('cx', element.x);
            pulseCircle.setAttribute('cy', element.y);
            pulseCircle.setAttribute('r', element.size);
            pulseCircle.setAttribute('fill', element.color);
            pulseCircle.setAttribute('opacity', '0.2');
            pulseCircle.classList.add('jtbd-pulse');
            group.appendChild(pulseCircle);
        }

        // Main circle
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', element.x);
        circle.setAttribute('cy', element.y);
        circle.setAttribute('r', element.size);
        circle.setAttribute('fill', element.color);
        circle.classList.add('jtbd-circle');
        group.appendChild(circle);

        // Text label
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', element.x);
        text.setAttribute('y', element.y + 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', 'white');
        text.setAttribute('font-size', element.id === 'customer' ? '18' : '14');
        text.setAttribute('font-weight', element.id === 'customer' ? 'bold' : '600');
        text.classList.add('jtbd-text');
        text.textContent = element.label;
        group.appendChild(text);

        svg.appendChild(group);

        // Add interactivity
        group.addEventListener('mouseenter', function() {
            // Highlight connections
            const nodeId = this.getAttribute('data-id');
            highlightConnections(nodeId, true);

            // Scale up circle
            const circles = this.querySelectorAll('circle:not(.jtbd-pulse)');
            circles.forEach(c => {
                c.style.transform = 'scale(1.1)';
                c.style.transformOrigin = `${element.x}px ${element.y}px`;
            });
        });

        group.addEventListener('mouseleave', function() {
            const nodeId = this.getAttribute('data-id');
            highlightConnections(nodeId, false);

            const circles = this.querySelectorAll('circle:not(.jtbd-pulse)');
            circles.forEach(c => {
                c.style.transform = 'scale(1)';
            });
        });
    });

    // Add CSS animation for fade in
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);

    // Function to highlight connections
    function highlightConnections(nodeId, highlight) {
        const lines = svg.querySelectorAll('line');
        const relatedConnections = connections.filter(c => c.from === nodeId || c.to === nodeId);

        lines.forEach((line, index) => {
            const conn = connections[index];
            if (relatedConnections.includes(conn)) {
                line.setAttribute('stroke', highlight ? '#3b82f6' : '#cbd5e1');
                line.setAttribute('stroke-width', highlight ? '3' : '2');
            }
        });
    }

    // Rotate through highlighting different aspects on interval
    let currentHighlight = 0;
    const highlightOrder = ['job', 'outcome', 'context', 'barriers'];

    setInterval(() => {
        // Reset all
        elements.forEach(el => {
            const group = svg.querySelector(`[data-id="${el.id}"]`);
            if (group) {
                const circle = group.querySelector('circle:not(.jtbd-pulse)');
                if (circle && el.id !== 'customer') {
                    circle.style.opacity = '1';
                }
            }
        });

        // Highlight current
        const highlightId = highlightOrder[currentHighlight];
        const group = svg.querySelector(`[data-id="${highlightId}"]`);
        if (group) {
            const circle = group.querySelector('circle:not(.jtbd-pulse)');
            if (circle) {
                circle.style.opacity = '1';
                // Subtle pulse
                circle.style.animation = 'pulse-subtle 1s ease-in-out';
                setTimeout(() => {
                    circle.style.animation = '';
                }, 1000);
            }
        }

        currentHighlight = (currentHighlight + 1) % highlightOrder.length;
    }, 3000);
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

// Scroll-based animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Email copy functionality
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
            document.body.removeChild(notification);
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
