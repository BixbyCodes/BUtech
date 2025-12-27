document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const body = document.body;
    
    // Toggle mobile menu
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    }
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on a nav link
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = 'auto';
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-links') && !event.target.closest('.hamburger')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = 'auto';
        }
    });
    
    // Close menu on window resize if it becomes desktop view
    function handleResize() {
        if (window.innerWidth >= 992) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = 'auto';
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class based on scroll position
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
        
        // Show/hide back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (currentScroll > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Active nav link highlighting
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to your server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // Animate progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress');
    
    const animateOnScroll = function() {
        progressBars.forEach(progressBar => {
            const progressBarPosition = progressBar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (progressBarPosition < screenPosition) {
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                
                // Trigger reflow to restart animation
                void progressBar.offsetWidth;
                
                progressBar.style.width = width;
                progressBar.style.transition = 'width 2s ease-in-out';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize animations on page load
    animateOnScroll();
    
    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.classList.contains(filterValue)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Add animation to project cards on page load
    const animateProjectCards = function() {
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    };
    
    // Initialize project card animations
    setTimeout(animateProjectCards, 500);
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                document.body.style.overflow = 'auto';
            }, 1000);
        });
    }
    
    // Add animation to elements when they come into view
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    
    const checkIfInView = function() {
        animateOnScrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop >= 0) && (elementBottom <= window.innerHeight);
            
            if (isVisible) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // Check on page load
});
