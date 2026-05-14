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

// 2. Función que contiene toda la interactividad del header
function inicializarEventosNavbar() {
    const header = document.querySelector('.header');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Efecto de "sombra" al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            header.style.padding = '0.5rem 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            header.style.padding = '1rem 0';
        }
    });

    // Manejo de Dropdowns para dispositivos móviles
    dropdowns.forEach(dropdown => {
        // Buscamos el enlace principal del dropdown
        const link = dropdown.querySelector('.nav-link');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault(); 
                const menu = this.nextElementSibling; // El .dropdown-menu
                menu.classList.toggle('show-mobile');
            }
        });
    });
}

// 3. Ejecutar la carga al iniciar
document.addEventListener('DOMContentLoaded', cargarNavbar);