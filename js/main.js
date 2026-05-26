// 1. Función para cargar el menú automáticamente
function cargarNavbar() {
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) throw new Error("No se pudo cargar el navbar");
            return response.text();
        })
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            
            // INICIALIZAR LÓGICA DEL NAVBAR DESPUÉS DE CARGARLO
            inicializarEventosNavbar();
        })
        .catch(error => console.error("Error:", error));
}

// 2. Función que contiene toda la interactividad del navbar
function inicializarEventosNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Efecto de scroll en el navbar
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
                navbar.style.background = 'var(--white)';
                navbar.style.backdropFilter = 'none';
            }
        });
    }

    // Menú Hamburguesa Móvil
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('show-mobile');
        });

        // Cerrar menú al hacer clic en enlaces comunes (no dropdowns)
        const navLinks = navMenu.querySelectorAll('li:not(.dropdown) > a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('show-mobile');
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('show-mobile');
            }
        });
    }

    // Manejo de Dropdowns para dispositivos móviles
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.dropdown-toggle') || dropdown.querySelector('.nav-link');
        
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 992) {
                    e.preventDefault(); 
                    e.stopPropagation();
                    const menu = this.nextElementSibling; // El .dropdown-menu
                    if (menu) {
                        menu.classList.toggle('show-mobile');
                    }
                }
            });
        }
    });
}

// 3. Animaciones Scroll Reveal
function inicializarScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px"
        });
        
        reveals.forEach(reveal => {
            observer.observe(reveal);
        });
    } else {
        // Fallback para navegadores antiguos
        reveals.forEach(reveal => {
            reveal.classList.add('active');
        });
    }
}

// 4. Animación de Contadores Numéricos
function inicializarContadores() {
    const counters = document.querySelectorAll('.counter-num');
    
    if (counters.length === 0) return;

    if ('IntersectionObserver' in window) {
        const animateCounters = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const duration = 1500; // ms
                    const startTime = performance.now();
                    
                    const updateCount = (now) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Función de easing out para desacelerar al final
                        const easeProgress = 1 - Math.pow(1 - progress, 3);
                        const currentValue = Math.floor(easeProgress * target);
                        
                        counter.innerText = currentValue + suffix;
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.innerText = target + suffix;
                        }
                    };
                    
                    requestAnimationFrame(updateCount);
                    observer.unobserve(counter); // Animar una sola vez
                }
            });
        };
        
        const counterObserver = new IntersectionObserver(animateCounters, {
            threshold: 0.2
        });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    } else {
        // Fallback
        counters.forEach(counter => {
            const target = counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            counter.innerText = target + suffix;
        });
    }
}

// 5. Inicializar todo al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
    cargarNavbar();
    inicializarScrollReveal();
    inicializarContadores();
});