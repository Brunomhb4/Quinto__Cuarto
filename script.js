document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const logoImg = document.querySelector('.logo-img');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const blurOverlay = document.querySelector('.blur-overlay');
    const contactForm = document.querySelector('.contact-form');
    const galleryImages = document.querySelectorAll('.gallery-img');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');
    const videoItems = document.querySelectorAll('.video-item');

    // 1. Header scroll effect
    window.addEventListener('scroll', function() {
        header.classList.toggle('scrolled', window.scrollY > 100);
    });

    // 2. Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // 3. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            if (this.classList.contains('nav-link')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }

            const targetElement = document.querySelector(this.getAttribute('href'));
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });

    // 4. Blur overlay effect on scroll
    window.addEventListener('scroll', function() {
        const blurAmount = Math.min(window.scrollY / 50, 8);
        blurOverlay.style.backdropFilter = `blur(${blurAmount}px)`;
    });

    // 5. Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
            this.reset();
        });
    }

    // 6. Gallery functionality
    if (galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                openLightbox(this.src, this.alt);
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display === 'block') {
                closeLightbox();
            }
        });
    }

    // 7. Video controls
    if (videoItems.length > 0) {
        videoItems.forEach(item => {
            const video = item.querySelector('.gallery-video');
            const playBtn = item.querySelector('.play-btn');
            const muteBtn = item.querySelector('.mute-btn');

            initializeVideoControls(video, playBtn, muteBtn);
            addVideoEventListeners(video, playBtn, muteBtn);
        });
    }

    function openLightbox(src, alt) {
        lightbox.style.display = 'block';
        lightboxImg.src = src;
        lightboxCaption.textContent = alt;
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function initializeVideoControls(video, playBtn, muteBtn) {
        if (video.muted) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    }

    function addVideoEventListeners(video, playBtn, muteBtn) {
        playBtn.addEventListener('click', togglePlayPause);
        muteBtn.addEventListener('click', toggleMute);
        video.addEventListener('ended', updatePlayButton);
        video.parentElement.addEventListener('mouseenter', showControls);
        video.parentElement.addEventListener('mouseleave', hideControls);
        video.parentElement.addEventListener('mouseover', autoPlayVideo);
        video.parentElement.addEventListener('mouseout', autoPauseVideo);

        function togglePlayPause() {
            if (video.paused) {
                video.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        }

        function toggleMute() {
            video.muted = !video.muted;
            muteBtn.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
        }

        function updatePlayButton() {
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }

        function showControls() {
            video.parentElement.querySelector('.video-controls').style.opacity = '1';
        }

        function hideControls() {
            if (!video.paused) {
                video.parentElement.querySelector('.video-controls').style.opacity = '0';
            }
        }

        function autoPlayVideo() {
            if (video.paused) {
                video.play().catch(error => {
                    console.log('La reproducción automática fue bloqueada:', error);
                });
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
        }

        function autoPauseVideo() {
            if (!video.paused) {
                video.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        }
    }
});
