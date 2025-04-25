// Theme toggle functionality for both buttons
function setupThemeToggle() {
    const mobileToggle = document.getElementById('theme-toggle-mobile');
    const desktopToggle = document.getElementById('theme-toggle-desktop');
    
    console.log('Theme toggles:', mobileToggle, desktopToggle); // Debugging
    
    // Function to toggle dark mode
    function toggleDarkMode() {
        console.log('Toggling dark mode'); // Debugging
        document.body.classList.toggle('dark-mode');
    }
    
    // Add event listeners to both toggles
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleDarkMode);
    }
    
    if (desktopToggle) {
        desktopToggle.addEventListener('click', toggleDarkMode);
    }
}

// Hamburger menu functionality
let hamburger;
let navLinks;
let navMenu;
let menuOverlay;

// Create overlay for mobile menu
function createOverlay() {
    menuOverlay = document.createElement('div');
    menuOverlay.classList.add('menu-overlay');
    document.body.appendChild(menuOverlay);
    
    menuOverlay.addEventListener('click', () => {
        closeMenu();
    });
}

// Enhanced mobile menu initialization with forced refresh
function initMobileMenu() {
    // Force refresh element references for reliability
    hamburger = document.querySelector('.hamburger-menu');
    navLinks = document.querySelectorAll('.nav-links a');
    navMenu = document.querySelector('.nav-links');
    
    if (!hamburger || !navMenu) {
        console.error('Mobile menu elements not found');
        return;
    }
    
    // Create overlay if it doesn't exist
    if (!menuOverlay) {
        createOverlay();
    }
    
    // Remove previous event listeners to prevent duplicates
    hamburger.removeEventListener('click', toggleMenu);
    hamburger.removeEventListener('touchstart', handleTouchMenu);
    
    // Add click event
    hamburger.addEventListener('click', toggleMenu);
    
    // Add touch event with special handler
    hamburger.addEventListener('touchstart', handleTouchMenu);
    
    // Process each navigation link
    navLinks.forEach(link => {
        // Remove previous events to prevent duplicates
        link.removeEventListener('click', handleLinkClick);
        link.removeEventListener('touchstart', handleLinkTouch);
        
        // Add click event
        link.addEventListener('click', handleLinkClick);
        
        // Add touch event
        link.addEventListener('touchstart', handleLinkTouch);
    });
    
    console.log('Mobile menu initialized with', navLinks.length, 'navigation links');
}

// Touch handler for menu toggle
function handleTouchMenu(e) {
    e.preventDefault(); // Prevent default touch behavior
    e.stopPropagation(); // Stop event bubbling
    console.log('Menu touch detected');
    toggleMenu();
}

// Handle link click
function handleLinkClick(e) {
    console.log('Link clicked:', this.href);
    closeMenu();
}

// Handle link touch
function handleLinkTouch(e) {
    e.preventDefault(); // Prevent default touch behavior
    e.stopPropagation(); // Stop event bubbling
    console.log('Link touched:', this.href);
    
    // Highlight the link visually
    this.classList.add('active-touch');
    
    // Remove the highlight after a brief delay
    setTimeout(() => {
        this.classList.remove('active-touch');
        closeMenu();
        
        // Navigate to the link's destination
        if (this.href) {
            window.location.href = this.href;
        }
    }, 150);
}

// Enhanced toggle menu function
function toggleMenu() {
    console.log('Toggling menu');
    
    // Toggle hamburger icon state
    if (hamburger) hamburger.classList.toggle('active');
    
    // Toggle menu visibility
    if (navMenu) navMenu.classList.toggle('active');
    
    // Toggle overlay
    if (menuOverlay) menuOverlay.classList.toggle('active');
    
    // Toggle body scroll locking
    if (hamburger && hamburger.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        console.log('Menu opened, body scroll locked');
    } else {
        document.body.style.overflow = 'auto';
        console.log('Menu closed, body scroll unlocked');
    }
}

// Enhanced close menu function
function closeMenu() {
    console.log('Closing menu');
    
    // Remove active classes
    if (hamburger) hamburger.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
    if (menuOverlay) menuOverlay.classList.remove('active');
    
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
}

// Initialize project items click functionality
function initProjectItems() {
    const projectItems = document.querySelectorAll('.project-item');
    
    // For mobile devices only
    if (window.innerWidth <= 992) {
        // Function to handle click on project item
        function handleProjectClick(e) {
            // If the click is on a link, don't toggle active state
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            // Remove active class from all other items
            projectItems.forEach(item => {
                if (item !== this) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle active class on this item
            this.classList.toggle('active');
        }
        
        // Add click event listener to project items
        projectItems.forEach(item => {
            item.addEventListener('click', handleProjectClick);
        });
        
        // Close active items when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.project-item')) {
                projectItems.forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    }
}

// Back to top button functionality
function initBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) return;
    
    // Show button when scrolling down 300px
    window.addEventListener('scroll', debounce(() => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }, 50));
    
    // Scroll to top when clicking the button
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme toggle
    setupThemeToggle();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize project items
    initProjectItems();
    
    // Initialize back to top button
    initBackToTopButton();
    
    // Copy protection
    document.addEventListener('copy', function(e) {
        e.clipboardData.setData('text/plain', '© 2025 Jinson John. All rights reserved.');
        e.preventDefault();
    });
    
    // Set up scroll animations
    initScrollAnimations();
});

// Set up scroll animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    // Debounce function to limit scroll event firing
    const debounce = (func, delay) => {
        let inDebounce;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(inDebounce);
            inDebounce = setTimeout(() => func.apply(context, args), delay);
        };
    };
    
    // Use debounced scroll event for better performance on mobile
    window.addEventListener('scroll', debounce(() => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }, 50)); // 50ms debounce delay
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add active class to clicked link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // For mobile devices, scroll with a small offset to account for the fixed header
                const isMobile = window.innerWidth < 768;
                const offset = isMobile ? 20 : 0;
                
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Set up animations for project items and personality text
    setupElementAnimations();
}

// Set up animations for elements
function setupElementAnimations() {
    const projectItems = document.querySelectorAll('.project-item');
    const personalityText = document.querySelector('.personality-text');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    
    // Animation for project items
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(animateOnScroll, observerOptions);
    
    // Set initial state for project items
    projectItems.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(item);
    });
    
    // Animation for personality text
    if (personalityText) {
        const personalityObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    personalityObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        personalityText.style.opacity = "0";
        personalityText.style.transform = "translateY(20px)";
        personalityText.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        personalityObserver.observe(personalityText);
    }
    
    // Add hover effects to navigation links
    navLinks.forEach(link => {
        // Add hover effect for vertical movement
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add subtle hover animations to buttons and links
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
        });
        
        ctaButton.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });
    }
}