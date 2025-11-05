// Desktop-only transparent navbar function
function desktopNavbarTransparency() {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        function handleScroll() {
            const heroHeight = heroSection.offsetHeight;
            
            if (window.scrollY > heroHeight * 0.1) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        window.addEventListener('scroll', handleScroll);
        
        // Check initial scroll position
        handleScroll();
    }
}

// Check if viewport is desktop size (992px and above)
const mediaQuery = window.matchMedia('(min-width: 992px)');

function handleDesktopView(e) {
    if (e.matches) {
        desktopNavbarTransparency();
    }
}

// Add listener for changes
mediaQuery.addListener(handleDesktopView);

// Check on initial load
handleDesktopView(mediaQuery);

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon...');
    this.reset();
});

// Add fade-in animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .blog-post, .about-content, .contact-container').forEach(el => {
    observer.observe(el);
});

// Typing and erasing effect for hero-content paragraph
document.addEventListener('DOMContentLoaded', () => {
    const heroText = document.querySelector('.hero-content p');
    const text = "Specialize in Fullstack Development, Automation & Graphic Design..."; // The text to type
    let index = 0;
    let isTyping = true;

    function typeEffect() {
        if (isTyping) {
            heroText.textContent = text.slice(0, index);
            index++;
            if (index > text.length) {
                isTyping = false;
                setTimeout(typeEffect, 1000); // Pause before erasing
                return;
            }
        } else {
            heroText.textContent = text.slice(0, index);
            index--;
            if (index < 0) {
                isTyping = true;
                setTimeout(typeEffect, 500); // Pause before typing again
                return;
            }
        }
        setTimeout(typeEffect, 100); // Adjust typing/erasing speed here
    }

    typeEffect();
});