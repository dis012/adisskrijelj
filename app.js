

document.addEventListener('DOMContentLoaded', () => {
    // Tab functionality
    const tabs = document.querySelectorAll('.tab-title');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-tab-id');
            const targetContent = document.getElementById(targetId);

            // Hide all tab contents
            tabContents.forEach(content => {
                content.style.display = 'none';
            });

            // Show the clicked tab content
            targetContent.style.display = 'block';

            // Highlight the active tab, optional
            tabs.forEach(t => t.classList.remove('is-active'));
            tab.classList.add('is-active');

            // Trigger skill bar animations for the "Skills" tab
            if (targetId === 'skills') {
                initSkillBars();
            }
        });
    });

    // Skill bars animation initialization
    function initSkillBars() {
        const skillbars = document.querySelectorAll('.skillbar');
        skillbars.forEach(skillbar => {
            const percent = skillbar.dataset.percent;
            const bar = skillbar.querySelector('.skillbar-bar');
            bar.style.width = 0; // Reset width to 0
            setTimeout(() => { // Timeout to ensure animation plays
                bar.style.width = percent;
            }, 0);
        });
    }

    // IntersectionObserver for animating items
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.item');
    hiddenElements.forEach(el => observer.observe(el));
    
    // Call the skill bars animation function directly if the Skills tab is initially visible
    // This is useful if the "Skills" tab is the default active tab
    if (document.querySelector('#skills').classList.contains('active')) {
        initSkillBars();
    }
});



// script.js
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const intro = document.getElementById('intro');
        intro.style.opacity = 0;

        setTimeout(() => {
            intro.style.display = 'none';
            const mainContent = document.getElementsByClassName('main');
            mainContent.style.display = 'block';
            setTimeout(() => mainContent.style.opacity = 1, 100); // Slight delay to ensure the transition plays
        }, 2000); // Matches the CSS transition time
    }, 3000); // Time the intro is displayed before fading out
});



// Stars animation
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('star-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let stars = []; // Array to hold your stars
    const starCount = 100; // Number of stars

    // Function to create stars
    function createStars() {
        for (let i = 0; i < starCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 2;
            const speed = Math.random() * 0.5 + 0.2;
            stars.push({ x, y, size, speed });
        }
    }

    // Function to draw stars
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
        });
    }

    // Function to update stars for animation
    function updateStars() {
        stars.forEach(star => {
            star.size += star.speed * (Math.random() > 0.5 ? 1 : -1);
            if (star.size < 0.5 || star.size > 2) { // Reset star size
                star.speed *= -1;
            }
        });
    }

    // Animation loop
    function animate() {
        drawStars();
        updateStars();
        requestAnimationFrame(animate);
    }

    createStars();
    animate();

    // Adjust canvas size on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
