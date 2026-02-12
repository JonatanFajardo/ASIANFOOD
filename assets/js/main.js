$(document).ready(function(){
    // Lazy loading for images
    $('.lazy').lazy({
        effect: "fadeIn",
        effectTime: 1000,
        threshold: 0
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in-up, .fade-in-scale').forEach(el => {
        observer.observe(el);
    });

    // Gallery Filter Functionality
    $('.filter-btn').on('click', function() {
        const filter = $(this).data('filter');

        // Update active button
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        // Filter gallery items
        $('.gallery-item').each(function() {
            const category = $(this).data('category');

            if (filter === 'todos' || category === filter) {
                $(this).removeClass('hidden').addClass('fade-in-scale');
                // Re-trigger animation
                setTimeout(() => {
                    $(this).addClass('visible');
                }, 50);
            } else {
                $(this).removeClass('visible').addClass('hidden');
            }
        });
    });

    // Smooth Scrolling Using Navigation Menu
    $('a[href*="#"]').on('click', function(e){
        $('html,body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 100
        }, 800, 'swing');
        e.preventDefault();

        // Close mobile menu after clicking
        $('.menu-btn').prop('checked', false);
    });

    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.main-menu').css({
                'height': '65px',
                'box-shadow': '0 4px 30px rgba(232, 30, 58, 0.4)'
            });
        } else {
            $('.main-menu').css({
                'height': '70px',
                'box-shadow': '0 2px 20px rgba(0, 0, 0, 0.3)'
            });
        }
    });

    // Scroll reveal animation for cards
    function revealOnScroll() {
        var cards = $('.cards-item');
        var windowHeight = $(window).height();
        var scrollTop = $(window).scrollTop();

        cards.each(function(i) {
            var cardTop = $(this).offset().top;
            if (cardTop < scrollTop + windowHeight - 100) {
                setTimeout(() => {
                    $(this).css({
                        'opacity': '1',
                        'transform': 'translateY(0)'
                    });
                }, i * 50);
            }
        });
    }

    // Initial state for cards
    $('.cards-item').css({
        'opacity': '0',
        'transform': 'translateY(30px)',
        'transition': 'all 0.6s ease-out'
    });

    // Trigger reveal on scroll
    $(window).on('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Form validation enhancement
    $('#reservacion form').on('submit', function(e) {
        e.preventDefault();

        var inputs = $(this).find('input');
        var isValid = true;

        inputs.each(function() {
            if ($(this).val() === '') {
                $(this).css('border-color', '#e81e3a');
                isValid = false;
            } else {
                $(this).css('border-color', 'transparent');
            }
        });

        if (isValid) {
            $(this).find('button').text('¡Enviado!').css('background', '#28a745');
            setTimeout(() => {
                $(this).find('button').text('ENVIAR').css('background', '');
                this.reset();
            }, 2000);
        }
    });

    // Add active class to navigation
    $(window).on('scroll', function() {
        var scrollPos = $(window).scrollTop() + 150;

        $('.menu a').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr('href'));

            if (refElement.length && refElement.position().top <= scrollPos &&
                refElement.position().top + refElement.height() > scrollPos) {
                $('.menu a').removeClass('active');
                currLink.addClass('active');
            }
        });
    });

    // New Reservation Form Handler
    $('#reservation-form').on('submit', function(e) {
        e.preventDefault();

        var button = $(this).find('.reservation-submit');
        var originalText = button.text();

        // Change button state
        button.text('✓ ENVIADO').css('background-color', '#28a745');

        // Reset after 3 seconds
        setTimeout(function() {
            button.text(originalText).css('background-color', '');
            $('#reservation-form')[0].reset();
        }, 3000);
    });

    // Set current year in footer
    const currentYear = new Date().getFullYear();
    $('#current-year').text(currentYear);
});