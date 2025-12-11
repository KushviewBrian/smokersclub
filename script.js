// 🛠️ SMOKER'S CLUB WEBSITE JAVASCRIPT
// Age Verification Gate Implementation
document.addEventListener('DOMContentLoaded', function() {
    const ageGate = document.getElementById('age-gate');
    const ageVerifyBtn = document.getElementById('age-verify-btn');
    const ageExitBtn = document.getElementById('age-exit-btn');
    const hoursBadge = document.getElementById('hours-badge');
    
    // Check if user has already verified age in this session
    if (!sessionStorage.getItem('ageVerified')) {
        // Show age gate
        ageGate.style.display = 'flex';
    } else {
        // Hide age gate if already verified
        ageGate.style.display = 'none';
    }
    
    // Age verification button event
    ageVerifyBtn.addEventListener('click', function() {
        // Set session storage to remember verification for 24 hours
        sessionStorage.setItem('ageVerified', 'true');
        
        // Add exit-intent reminder for compliance
        setTimeout(() => {
            // Add event listener for when user tries to exit
            window.addEventListener('beforeunload', function(e) {
                if (sessionStorage.getItem('ageVerified')) {
                    alert('REMINDER: 21+ ONLY - Valid ID Required Upon Entry');
                }
            });
        }, 1000);
        
        // Hide age gate with fade out effect
        ageGate.style.opacity = '0';
        setTimeout(() => {
            ageGate.style.display = 'none';
        }, 500);
    });
    
    // Age exit button event
    ageExitBtn.addEventListener('click', function() {
        // Redirect to Google to prevent access
        window.location.href = 'https://www.google.com';
    });
    
    // Update live hours status
    updateHoursStatus();
    
    // Update hours every minute
    setInterval(updateHoursStatus, 60000);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile sticky bar visibility control
    const mobileStickyBar = document.querySelector('.mobile-sticky-bar');
    const footer = document.querySelector('.footer');
    
    if (mobileStickyBar && footer) {
        // Hide sticky bar when footer is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    mobileStickyBar.style.display = 'none';
                } else {
                    mobileStickyBar.style.display = 'flex';
                }
            });
        }, {
            threshold: 0.1
        });
        
        observer.observe(footer);
    }
});

// Function to update live hours status
function updateHoursStatus() {
    const hoursBadge = document.getElementById('hours-badge');
    if (!hoursBadge) return;
    
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // Business hours: Mon-Sat 9AM-7PM, Sun 9AM-5PM
    let isOpen = false;
    let opensAt = '';
    
    if (day === 0) { // Sunday
        if (hour >= 9 && hour < 17) {
            isOpen = true;
        } else if (hour < 9) {
            opensAt = 'Opens at 9:00 AM';
        } else {
            opensAt = 'Opens tomorrow at 9:00 AM';
        }
    } else if (day >= 1 && day <= 6) { // Monday to Saturday
        if (hour >= 9 && hour < 19) {
            isOpen = true;
        } else if (hour < 9) {
            opensAt = 'Opens at 9:0 AM';
        } else {
            opensAt = 'Opens tomorrow at 9:00 AM';
        }
    }
    
    if (isOpen) {
        hoursBadge.textContent = 'OPEN NOW';
        hoursBadge.className = 'hours-badge';
    } else {
        hoursBadge.textContent = opensAt || 'CLOSED';
        hoursBadge.className = 'hours-badge closed';
    }
}

// Function to get directions (called from hero button)
function getLocation() {
    // On mobile, try to open Google Maps app; on desktop, open in browser
    if (navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
        // Mobile device - try to open Google Maps app
        window.open('https://maps.google.com/?q=5525+Coldwater+Rd+Fort+Wane+IN+46825', '_system');
    } else {
        // Desktop - open in new tab
        window.open('https://maps.google.com/?q=5525+Coldwater+Rd+Fort+Wane+IN+46825', '_blank');
    }
}

// Product card hover effects enhancement
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.borderColor = '#8BF1D1';
            this.style.boxShadow = '0 8px 25px rgba(139, 241, 209, 0.2)';
            this.style.backgroundColor = '#0a0a0a';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.borderColor = 'transparent';
            this.style.boxShadow = 'none';
            this.style.backgroundColor = '#000000';
        });
    });
});

// FAQ accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        
        question.addEventListener('click', function() {
            // Toggle the answer visibility
            const answer = this.nextElementSibling;
            answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
        });
    });
});

// Google Analytics tracking (if implemented)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track important user interactions
document.addEventListener('DOMContentLoaded', function() {
    // Track phone number clicks
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('Contact', 'Phone Click', this.href);
        });
    });
    
    // Track directions clicks
    const directionLinks = document.querySelectorAll('a[href*="maps.google.com"]');
    directionLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('Navigation', 'Directions Click', this.href);
        });
    });
    
    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.cta-button, .review-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('Engagement', 'CTA Click', this.textContent);
        });
    });
    
    // Track age verification
    document.getElementById('age-verify-btn').addEventListener('click', function() {
        trackEvent('Compliance', 'Age Verified', 'User confirmed 21+');
    });
});

// Exit-intent popup for compliance reminder
let exitIntentShown = false;
document.addEventListener('mouseout', function(e) {
    if (!exitIntentShown && e.clientY < 0 && sessionStorage.getItem('ageVerified')) {
        exitIntentShown = true;
        alert('REMINDER: 21+ ONLY - Valid ID Required Upon Entry');
    }
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add skip link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('role', 'main');
    }
});

// Performance optimization - lazy load map
document.addEventListener('DOMContentLoaded', function() {
    const mapIframe = document.querySelector('.location-map iframe');
    
    // Create an intersection observer to detect when the map enters the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // The map is in view, load it
                const iframe = entry.target;
                const src = iframe.dataset.src;
                if (src) {
                    iframe.src = src;
                    observer.unobserve(iframe); // Stop observing once loaded
                }
            }
        });
    });
    
    // Set the data-src attribute and remove src to prevent initial loading
    if (mapIframe) {
        mapIframe.dataset.src = mapIframe.src;
        mapIframe.src = ''; // Clear the src to prevent loading
        observer.observe(mapIframe);
    }
});
