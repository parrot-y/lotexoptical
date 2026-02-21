document.addEventListener('DOMContentLoaded', () => {
    // 1. WhatsApp Integration
    const WHATSAPP_NUMBER = '254722361831';
    const inquireButtons = document.querySelectorAll('.btn-whatsapp');

    inquireButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const message = encodeURIComponent(`Hi Lotex Opticals & Eye Clinic! I'd like to book an appointment or inquire about eyewear.`);
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
        });
    });

    // 1.1 Mobile Nav Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const header = document.querySelector('.header');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            header.classList.toggle('mobile-nav-active');
            const icon = mobileToggle.querySelector('i');
            if (header.classList.contains('mobile-nav-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Intersection Observer for Scroll Reveals
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .reveal-scale');

    // Auto-reveal elements that are already in view on load
    const revealOnLoad = () => {
        setTimeout(() => {
            revealElements.forEach((el, index) => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    // Add a staggered delay for hero elements
                    setTimeout(() => {
                        el.classList.add('active-reveal');
                    }, index * 150);
                } else {
                    revealObserver.observe(el);
                }
            });
        }, 100);
    };

    revealOnLoad();

    // 3. Category Tab Switching (Perfect Fit Section)
    const tabs = document.querySelectorAll('.category-tabs li');
    const categoryImg = document.querySelector('.category-img');

    const categoryImages = {
        'EYEGLASSES': 'assets/img/category_eyewear_green_1769759717832.png',
        'SUNGLASSES': 'assets/img/glasses_lineup_1_1769759453089.png',
        'COMPUTER GLASSES': 'assets/img/category_eyewear_green_1769759717832.png',
        'CONTACT LENS': 'assets/img/lotex_trending_eye_close_up_black_1769787474470.png'
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(item => item.classList.remove('active'));
            tab.classList.add('active');

            const type = tab.textContent.trim();
            if (categoryImages[type]) {
                categoryImg.style.opacity = '0';
                categoryImg.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    categoryImg.src = categoryImages[type];
                    categoryImg.style.opacity = '1';
                    categoryImg.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });

    // 4. Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 15px 40px rgba(0,0,0,0.06)';
        } else {
            header.style.padding = '1.5rem 0';
            header.style.boxShadow = 'none';
        }
    });

    // 5. Smooth Scroll for Nav Links
    // 5. Smooth Scroll for Nav Links (Only for internal anchors)
    document.querySelectorAll('.nav-links a, .hero-cta').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');

            // Only intercept if it's an anchor link on the current page
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 6. Top Sellers Interaction
    const sellerFrames = document.querySelectorAll('.clickable-frame');
    sellerFrames.forEach(frame => {
        frame.addEventListener('click', () => {
            const message = encodeURIComponent(`Hi Lotex Opticals! I'm interested in the frames I saw in your top sellers section.`);
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
        });
    });

    // 7. Hero Image Shuffling
    // 7. Hero Image Shuffling
    const heroMain = document.querySelector('.main-portrait');
    if (heroMain) {
        const heroShufflingImages = [
            'assets/img/lotex_hero_black_woman_stylish.png',
            'assets/img/lotex_hero_black_man_stylish.png',
            'assets/img/lotex_hero_black_woman_stylish.png', // Repeating for now to maintain shuffle length
            'assets/img/lotex_hero_black_man_stylish.png'
        ];
        let currentHeroIndex = 0;

        const shuffleHero = () => {
            currentHeroIndex = (currentHeroIndex + 1) % heroShufflingImages.length;
            heroMain.style.opacity = '0';

            setTimeout(() => {
                heroMain.style.backgroundImage = `url('${heroShufflingImages[currentHeroIndex]}')`;
                heroMain.style.opacity = '1';
            }, 800);
        };

        setInterval(shuffleHero, 6000); // Shuffle every 6 seconds
    }

    // 8. Store Hero Carousel
    const slides = document.querySelectorAll('.store-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');

    if (slides.length > 0) {
        let currentSlide = 0;
        let autoplayTimer;

        const goToSlide = (index) => {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };

        const startAutoplay = () => {
            autoplayTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
        };

        const resetAutoplay = () => {
            clearInterval(autoplayTimer);
            startAutoplay();
        };

        // Dot click
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.dataset.slide));
                resetAutoplay();
            });
        });

        // Arrow clicks
        if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoplay(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoplay(); });

        startAutoplay();
    }
});
