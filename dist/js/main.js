// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const theme = localStorage.getItem('theme');

    // Set initial theme
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    darkModeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Add animation classes to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .hero-section h1, .hero-section p');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('fade-in');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Handle user authentication state
    const checkAuthState = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const loginLink = document.getElementById('loginLink');
        const dashboardLink = document.getElementById('dashboardLink');

        if (isLoggedIn === 'true') {
            loginLink.style.display = 'none';
            dashboardLink.style.display = 'block';
        } else {
            loginLink.style.display = 'block';
            dashboardLink.style.display = 'none';
        }
    };

    checkAuthState();
});

// Progress tracking
class ProgressTracker {
    static saveProgress(lessonId, progress) {
        const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
        userProgress[lessonId] = progress;
        localStorage.setItem('userProgress', JSON.stringify(userProgress));
    }

    static getProgress(lessonId) {
        const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
        return userProgress[lessonId] || 0;
    }
}

// Initialize Bootstrap tooltips and popovers
document.addEventListener('DOMContentLoaded', () => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
});
