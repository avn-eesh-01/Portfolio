// Update the initialization code at the top of script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with default visible state
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        disable: 'mobile' // Disable on mobile devices
    });

    // Initialize ScrollReveal with default visible state
    const sr = ScrollReveal({
        distance: '60px',
        duration: 1500,
        delay: 400,
        reset: false
    });

    // GSAP ScrollTrigger Setup
    gsap.registerPlugin(ScrollTrigger);

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 15, 28, 0.95)';
            nav.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.background = 'var(--nav-bg)';
            nav.style.boxShadow = 'none';
        }
    });

    // Hero section animations
    gsap.from('.hero-greeting', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2
    });

    gsap.from('.hero h1', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.4
    });

    gsap.from('.hero h2', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6
    });

    // Scroll-triggered animations for sections
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Project cards stagger effect
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.project-grid',
            start: 'top 80%'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2
    });

    // Parallax effect for about section image
    gsap.to('.about-image img', {
        scrollTrigger: {
            trigger: '.about-image',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: 100
    });

    // Skills list animation
    sr.reveal('.skills-list li', {
        origin: 'left',
        distance: '50px',
        duration: 1000,
        interval: 100
    });

    // Contact form elements reveal
    sr.reveal('.form-group', {
        origin: 'bottom',
        interval: 200
    });

    // Social links animation
    sr.reveal('.social-links a', {
        origin: 'top',
        interval: 200
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });

    // Form submission handling
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add your form submission logic here
        // Example: Send data to a server or email service
        
        // Clear form after submission
        this.reset();
        alert('Thank you for your message! I will get back to you soon.');
    });

    // Update GSAP animations to ensure initial visibility
    gsap.set('section', { opacity: 1 }); // Set initial opacity
    gsap.set('.project-card', { opacity: 1 }); // Set initial opacity

    // Handle project links
    const projectLinks = document.querySelectorAll('.project-links a');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const url = this.getAttribute('href');
            
            // Check if URL is valid
            if (url && url !== '#') {
                // Open in new tab
                window.open(url, '_blank', 'noopener,noreferrer');
            } else {
                e.preventDefault();
                alert('Project link coming soon!');
            }
        });
    });

    // Handle navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href');
            const section = document.querySelector(sectionId);
            
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    // Toggle menu
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent click from bubbling to document
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInsideNav = navLinks.contains(e.target);
        const isClickInsideHamburger = hamburger.contains(e.target);

        if (!isClickInsideNav && !isClickInsideHamburger && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Close menu on resize if open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});
