// Function to load header
function loadHeader() {
    console.log('Loading header...');
    const headerPlaceholder = document.getElementById('header-placeholder');
    
    if (!headerPlaceholder) {
        console.error('Header placeholder not found!');
        return;
    }

    // Create header HTML directly since we can't use fetch with file://
    const headerHTML = `
        <style>
            .header {
                background-color: #000000 !important;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3) !important;
                position: fixed !important;
                top: 0;
                left: 0;
                right: 0;
                z-index: 1000 !important;
                width: 100% !important;
            }
            
            /* Add padding to body to account for fixed header */
            body {
                padding-top: 90px !important;
            }
            /* Navbar container styling */
            .navbar {
                background-color: #000000 !important;
                padding: 0 30px !important;
                width: 100%;
                height: 90px !important;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
            }
            
            /* Menu container and text styling */
            .nav-links {
                gap: 15px !important;
                padding: 0 20px !important;
                height: 60px !important;
                display: flex !important;
                align-items: center !important;
                list-style: none !important;
                margin: 0 !important;
            }
            .nav-links a {
                color: #000000 !important;
                padding: 5px 10px !important;  /* Reduced padding */
                font-size: 15px !important;    /* Slightly smaller font */
                letter-spacing: 0.5px !important;
            }
            /* Quote button styling */
            .nav-links .quote-btn {
                margin-left: 15px !important;
                padding: 10px 25px !important;
                font-size: 16px !important;
                font-weight: 600 !important;
                background-color: #ffd700 !important; /* Yellow color */
                color: #000000 !important; /* Black text */
                border-radius: 50px !important;
                text-transform: uppercase;
                transition: all 0.3s ease !important;
                border: none !important;
                cursor: pointer;
            }
            .nav-links .quote-btn:hover {
                background-color: #ffc800 !important; /* Slightly darker yellow on hover */
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(204, 22, 22, 0.2);
            }
            /* Hamburger icon color */
            .hamburger span {
                background-color:rgb(177, 37, 37) !important;
            }
            /* Logo size - reduced size */
            header .logo a img {
                width: auto !important;
                height: 70px !important;
                max-width: 100%;
                transition: all 0.3s ease;
                object-fit: contain;
            }
            /* Header and navbar styling with increased height */
            .header {
                padding: 0 !important;
                height: 90px !important;
                display: flex;
                align-items: center;
            }
            .navbar {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 100%;
                padding: 0 20px;
            }
            /* Mobile menu styles */
            @media (max-width: 768px) {
                .nav-links {
                    background-color: #000000 !important;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
                }
                .nav-links li {
                    border-bottom: 1px solid #333333 !important;
                }
                .nav-links a {
                    padding: 12px 20px !important;
                    display: block !important;
                }
                .nav-links a:hover {
                    background-color: #1a1a1a !important;
                }
            }
        </style>
        <header class="header">
            <div class="container">
                <nav class="navbar">
                    <div class="logo">
                        <a href="index.html">
                            <img src="assets/1.png" alt="Moveroo Logo" class="logo-img">
                        </a>
                    </div>
                    <ul class="nav-links">
                        <li><a href="index.html#home">Home</a></li>
                        <li><a href="index.html#services">Services</a></li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="process.html">Process</a></li>
                        <li><a href="index.html#contact">Contact</a></li>
                        <li><a href="#" class="quote-btn">Get a Quote</a></li>
                    </ul>
                    <div class="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </nav>
            </div>
        </header>
    `;

    // Insert the header HTML
    headerPlaceholder.innerHTML = headerHTML;
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Update active link
    updateActiveLink();
    
    console.log('Header loaded successfully');
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a nav link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// Update active link based on current page
function updateActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if ((currentPage === 'index.html' && (linkHref === '#' || linkHref === '#home')) ||
            (currentPage !== 'index.html' && linkHref.includes(currentPage))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadHeader);

// Re-initialize if the page is loaded via AJAX or similar
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    loadHeader();
}
