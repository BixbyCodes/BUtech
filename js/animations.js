// Animation on scroll functionality
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Function to handle scroll animations
    function handleScrollAnimations() {
        // Animate elements with reveal class
        document.querySelectorAll('.reveal, .service-card, .team-member, .project-card').forEach((element) => {
            if (isInViewport(element)) {
                element.classList.add('active');
                
                // For skill bars
                if (element.classList.contains('skill-item')) {
                    const progressBar = element.querySelector('.progress');
                    const percent = element.getAttribute('data-percent');
                    if (progressBar && percent) {
                        progressBar.style.width = percent + '%';
                    }
                }
            }
        });

        // Animate counters
        document.querySelectorAll('.counter').forEach((counter) => {
            if (isInViewport(counter) && !counter.classList.contains('animated')) {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / 50; // Adjust speed here
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(arguments.callee, 20);
                } else {
                    counter.innerText = target;
                    counter.classList.add('animated');
                }
            }
        });
    }

    // Initial check
    handleScrollAnimations();

    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);

    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.btn, .card, .service-card, .team-member, .project-card');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
        });
    });

    // Add animation to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add loading animation to page load
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add animation to hero section
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('animate__animated', 'animate__fadeInUp');
        }
        
        // Add staggered animation to service cards
        document.querySelectorAll('.service-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate__animated', 'animate__fadeInUp');
            }, 200 * index);
        });
    });
});
