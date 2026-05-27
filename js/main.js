document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MOBILE NAVIGATION MENU
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger / close icon
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.className = 'fa-solid fa-bars';
            });
        });
    }

    /* ==========================================================================
       STICKY HEADER SCROLL EFFECT
       ========================================================================== */
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.backgroundColor = 'rgba(7, 9, 14, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.padding = '0';
            header.style.backgroundColor = 'var(--glass-bg)';
            header.style.boxShadow = 'none';
        }
    });

    /* ==========================================================================
       REVEAL ON SCROLL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       ACTIVE LINK HIGHLIGHT ON SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section, footer');
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-75px 0px -40% 0px'
    });

    sections.forEach(section => {
        navObserver.observe(section);
    });

    /* ==========================================================================
       SKILLS FILTER FUNCTIONALITY
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-group-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Set active button style
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Add transitional fade animations
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95) translateY(10px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                        // Trigger reflow
                        card.offsetHeight;
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    /* ==========================================================================
       COPY EMAIL TO CLIPBOARD
       ========================================================================== */
    const copyBtn = document.getElementById('btn-copy-email');
    const emailText = document.getElementById('email-address');

    if (copyBtn && emailText) {
        copyBtn.addEventListener('click', () => {
            const email = emailText.innerText || emailText.textContent;
            
            navigator.clipboard.writeText(email).then(() => {
                // Feedback animation
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                copyBtn.style.backgroundColor = 'var(--accent-emerald)';
                copyBtn.style.color = 'white';
                copyBtn.style.borderColor = 'var(--accent-emerald)';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.style.backgroundColor = 'transparent';
                    copyBtn.style.color = 'var(--text-secondary)';
                    copyBtn.style.borderColor = 'var(--glass-border)';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    /* ==========================================================================
       SIMULATED CONTACT FORM SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('btn-send-message');

    if (contactForm && formStatus && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const originalBtnContent = submitBtn.innerHTML;
            
            // Set loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            formStatus.className = 'form-status';
            formStatus.innerText = '';

            // Simulate server network delay
            setTimeout(() => {
                // Success feedback
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                
                formStatus.classList.add('success');
                formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message sent successfully! Atou will reply soon.';
                
                // Clear fields
                contactForm.reset();
                
                // Fade out message status after 5s
                setTimeout(() => {
                    formStatus.style.opacity = '0';
                    formStatus.style.transition = 'opacity 1s ease';
                    setTimeout(() => {
                        formStatus.innerHTML = '';
                        formStatus.style.opacity = '1';
                        formStatus.removeAttribute('style');
                    }, 1000);
                }, 5000);

            }, 1500);
        });
    }
});
