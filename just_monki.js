document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const backgroundContainer = document.querySelector('.background-container');
    const profileCard = document.querySelector('.profile-card');
    const contentElements = document.querySelectorAll('.reminder-title, .reminder-text, .okay-button, .heart-button, .dots .dot, .modal-content h3, .modal-content p');
    const profileImage = document.querySelector('.profile-image');
    const heartButton = document.querySelector('.heart-button');
    const flyingHeartContainer = document.querySelector('.flying-heart-container');
    const dotsNavigation = document.querySelector('.dots');
    const whyDrButton = document.querySelector('.okay-button');
    const drInfoModal = document.getElementById('dr-info-modal');
    const closeButton = document.querySelector('.close-button');
    const modalContent = document.querySelector('.modal-content');

    const themes = [
        {
            bgColor: '#585563', // Light lavender, a subtle cool tone that complements warm colors
            cardColor: '#DDDBCB', // Medium purple, a slightly deeper cool tone
            textColor: '#5B2E48',
            imageSrc: 'profile-image-2.jpg'
        },
        {
            bgColor: '#f0eee9', // Off-white, warm and natural
            cardColor: '#b8d8ba', // Soft, muted sage green, earthy and calm
            textColor: '#597a5d', // DarkGreen (Dark leaf green)
            imageSrc: 'profile-image-3.jpg'
        },
        {
            bgColor: '#DCCCA3', // Ivory (Light yellowish-orange)
            cardColor: '#916953', // LightSalmon (Slightly darker orange-pink)
            textColor: '#551B14', // Chocolate (Deep orange-brown)
            imageSrc: 'profile-image-1.jpg'
        }
        // Add more themes as needed
    ];

    let currentThemeIndex = 0;

    function applyTheme(index) {
        const theme = themes[index];
        backgroundContainer.style.backgroundColor = theme.bgColor;
        profileCard.style.backgroundColor = theme.cardColor;
        profileCard.style.boxShadow = `0 4px 12px ${adjustBrightness(theme.cardColor, -0.2)}`;
        contentElements.forEach(element => {
            element.style.color = theme.textColor;
        });
        modalContent.style.backgroundColor = theme.cardColor; // Apply card color to modal content
        modalContent.style.color = theme.textColor; // Apply text color to modal content
        profileImage.style.opacity = 0;
        setTimeout(() => {
            profileImage.src = theme.imageSrc;
            profileImage.style.opacity = 1;
        }, 200); // Slightly faster image transition

        // Update active dot
        const dots = document.querySelectorAll('.dots .dot');
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });
    }

    function adjustBrightness(hex, factor) {
        let color = hex.replace(/^#/, '');
        let r = parseInt(color.substring(0, 2), 16);
        let g = parseInt(color.substring(2, 4), 16);
        let b = parseInt(color.substring(4, 6), 16);
        r = Math.round(Math.min(255, Math.max(0, r + (r * factor))));
        g = Math.round(Math.min(255, Math.max(0, g + (g * factor))));
        b = Math.round(Math.min(255, Math.max(0, b + (b * factor))));
        return `#${(r.toString(16).padStart(2, '0'))}${(g.toString(16).padStart(2, '0'))}${(b.toString(16).padStart(2, '0'))}`;
    }

    let scrollCounter = 0;
    const scrollThreshold = 50; // Adjust this value to control scroll sensitivity

    window.addEventListener('wheel', (event) => {
        scrollCounter += event.deltaY;

        if (Math.abs(scrollCounter) >= scrollThreshold) {
            if (scrollCounter > 0) {
                currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            } else {
                currentThemeIndex = (currentThemeIndex - 1 + themes.length) % themes.length;
            }
            applyTheme(currentThemeIndex);
            scrollCounter = 0; // Reset the counter
        }
    });

    // Initial theme application
    applyTheme(currentThemeIndex);

    // Dot navigation
    const dots = document.querySelectorAll('.dots .dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentThemeIndex = index;
            applyTheme(currentThemeIndex);
        });
    });

    // Heart animation (remains the same)
    heartButton.addEventListener('click', () => {
        const heart = document.createElement('div');
        heart.classList.add('flying-heart');
        heart.innerHTML = '❤️';

        const rect = heartButton.getBoundingClientRect();
        const startX = rect.left + rect.width / 2;
        const startY = rect.top;

        heart.style.left = `${startX}px`;
        heart.style.top = `${startY}px`;

        flyingHeartContainer.appendChild(heart);

        const randomX = Math.random() * 150 - 75; // More controlled horizontal drift
        const randomYUpward = Math.random() * 100 + 50; // Random upward distance
        const endY = startY - randomYUpward;

        const duration = 800 + Math.random() * 400; // Randomize duration slightly

        requestAnimationFrame(() => {
            heart.style.transition = `transform ${duration}ms ease-out, opacity ${duration * 1.5}ms ease-out`;
            heart.style.transform = `translate(${randomX}px, ${endY}px) scale(1.5)`;
            heart.style.opacity = 0;
        });

        setTimeout(() => {
            heart.remove();
        }, duration * 1.5); // Remove heart after fade-out
    });

    // Modal functionality
    whyDrButton.addEventListener('click', () => {
        drInfoModal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        drInfoModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === drInfoModal) {
            drInfoModal.style.display = 'none';
        }
    });
});