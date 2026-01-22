/* ========================================
   D'GEO - Sitio Web Interactivo
   JavaScript Vanilla con funcionalidades modernas
   ======================================== */

console.log('D\'GEO website loaded successfully');

// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded - Initializing...');

  initThemeToggle();
  initMobileMenu();
  initSmoothScroll();
  initActiveNavigation();
  initScrollAnimations();
  initContactForm();
  initHeaderScroll();
  initScrollProgressBar();
  initParallaxEffect();
  initAnimatedCounters();

  console.log('All initializations complete');
});

// ========================================
// MODO OSCURO (Dark Mode)
// ========================================
function initThemeToggle() {
  console.log('Initializing theme toggle...');

  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Aplicar tema guardado
  document.documentElement.setAttribute('data-theme', currentTheme);
  console.log('Current theme:', currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const theme = document.documentElement.getAttribute('data-theme');
      const newTheme = theme === 'light' ? 'dark' : 'light';

      console.log('Toggling theme from', theme, 'to', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}

// ========================================
// MENÚ MÓVIL
// ========================================
function initMobileMenu() {
  console.log('Initializing mobile menu...');

  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isActive = menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
      console.log('Mobile menu toggled:', isActive ? 'open' : 'closed');

      // Accesibilidad
      menuToggle.setAttribute('aria-expanded', isActive);
    });

    // Cerrar menú al hacer clic en un link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          menuToggle.classList.remove('active');
          nav.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          console.log('Mobile menu closed after link click');
        }
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        console.log('Mobile menu closed (click outside)');
      }
    });
  }
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
  console.log('Initializing smooth scroll...');

  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Ignorar links vacíos o solo "#"
      if (href === '#' || href === '') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        console.log('Smooth scrolling to:', href);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// NAVEGACIÓN ACTIVA
// ========================================
function initActiveNavigation() {
  console.log('Initializing active navigation...');

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Ejecutar al cargar
}

// ========================================
// ANIMACIONES AL HACER SCROLL
// ========================================
function initScrollAnimations() {
  console.log('Initializing scroll animations...');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        console.log('Element became visible:', entry.target.className);
      }
    });
  }, observerOptions);

  // Observar elementos con animaciones
  const animatedElements = document.querySelectorAll('.service-card, .process-step, .fade-in-up');
  animatedElements.forEach(el => observer.observe(el));
}

// ========================================
// HEADER SCROLL EFFECT
// ========================================
function initHeaderScroll() {
  console.log('Initializing header scroll effect...');

  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
}

// ========================================
// FORMULARIO DE CONTACTO
// ========================================
function initContactForm() {
  console.log('Initializing contact form...');

  const form = document.getElementById('contactForm');

  if (!form) {
    console.warn('Contact form not found');
    return;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submitted, starting validation...');

    // Limpiar errores previos
    clearErrors();

    // Obtener valores
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    console.log('Form data:', { name, email, phone, message });

    let isValid = true;

    // Validar nombre
    if (name === '') {
      showError('nameError', 'El nombre es obligatorio');
      isValid = false;
    } else if (name.length < 3) {
      showError('nameError', 'El nombre debe tener al menos 3 caracteres');
      isValid = false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      showError('emailError', 'El correo electrónico es obligatorio');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      showError('emailError', 'Ingrese un correo electrónico válido');
      isValid = false;
    }

    // Validar teléfono
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (phone === '') {
      showError('phoneError', 'El teléfono es obligatorio');
      isValid = false;
    } else if (!phoneRegex.test(phone) || phone.length < 8) {
      showError('phoneError', 'Ingrese un teléfono válido (mínimo 8 dígitos)');
      isValid = false;
    }

    // Validar mensaje
    if (message === '') {
      showError('messageError', 'El mensaje es obligatorio');
      isValid = false;
    } else if (message.length < 10) {
      showError('messageError', 'El mensaje debe tener al menos 10 caracteres');
      isValid = false;
    }

    if (isValid) {
      console.log('Form validation passed, sending email...');

      // Crear mailto link con información prellenada
      const subject = encodeURIComponent('Consulta desde el sitio web - D\'GEO');
      const body = encodeURIComponent(
        `Nombre: ${name}\n` +
        `Email: ${email}\n` +
        `Teléfono: ${phone}\n\n` +
        `Mensaje:\n${message}`
      );

      const mailtoLink = `mailto:info@dgeosoluciones.com?subject=${subject}&body=${body}`;

      // Abrir cliente de correo
      window.location.href = mailtoLink;

      // Mostrar mensaje de éxito
      showSuccessMessage();

      // Limpiar formulario después de 2 segundos
      setTimeout(() => {
        form.reset();
      }, 2000);
    } else {
      console.error('Form validation failed');
    }
  });

  // Validación en tiempo real
  const inputs = form.querySelectorAll('.form-input');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });

    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });
}

function validateField(input) {
  const value = input.value.trim();
  const errorElement = document.getElementById(`${input.id}Error`);

  if (!errorElement) return;

  // Limpiar error anterior
  input.classList.remove('error');
  errorElement.textContent = '';

  // Validaciones específicas
  if (input.id === 'name' && value !== '' && value.length < 3) {
    showError(`${input.id}Error`, 'El nombre debe tener al menos 3 caracteres');
  } else if (input.id === 'email' && value !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showError(`${input.id}Error`, 'Ingrese un correo electrónico válido');
    }
  } else if (input.id === 'phone' && value !== '') {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(value) || value.length < 8) {
      showError(`${input.id}Error`, 'Ingrese un teléfono válido (mínimo 8 dígitos)');
    }
  } else if (input.id === 'message' && value !== '' && value.length < 10) {
    showError(`${input.id}Error`, 'El mensaje debe tener al menos 10 caracteres');
  }
}

function showError(errorId, message) {
  const errorElement = document.getElementById(errorId);
  const inputId = errorId.replace('Error', '');
  const inputElement = document.getElementById(inputId);

  if (errorElement && inputElement) {
    errorElement.textContent = message;
    inputElement.classList.add('error');
    console.error(`Validation error on ${inputId}:`, message);
  }
}

function clearErrors() {
  console.log('Clearing form errors...');

  const errorElements = document.querySelectorAll('.form-error');
  const inputElements = document.querySelectorAll('.form-input');

  errorElements.forEach(el => el.textContent = '');
  inputElements.forEach(el => el.classList.remove('error'));
}

function showSuccessMessage() {
  console.log('Showing success message...');

  const form = document.getElementById('contactForm');

  // Crear mensaje de éxito
  const successDiv = document.createElement('div');
  successDiv.style.cssText = `
    background-color: #48bb78;
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    text-align: center;
    font-weight: 600;
    animation: fadeInUp 0.5s ease;
  `;
  successDiv.textContent = '¡Mensaje enviado! Se abrirá su cliente de correo.';

  // Insertar antes del formulario
  form.parentNode.insertBefore(successDiv, form);

  // Remover después de 5 segundos
  setTimeout(() => {
    successDiv.style.animation = 'fadeOut 0.5s ease';
    setTimeout(() => successDiv.remove(), 500);
  }, 5000);
}

// ========================================
// LAZY LOADING DE IMÁGENES
// ========================================
function initLazyLoading() {
  console.log('Initializing lazy loading...');

  const images = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            console.log('Lazy loaded image:', img.src);
          }
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback para navegadores sin IntersectionObserver
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  }
}

// ========================================
// MANEJO DE TECLAS (Accesibilidad)
// ========================================
document.addEventListener('keydown', (e) => {
  // Cerrar menú móvil con ESC
  if (e.key === 'Escape') {
    const nav = document.getElementById('nav');
    const menuToggle = document.getElementById('menuToggle');

    if (nav && nav.classList.contains('active')) {
      nav.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      console.log('Mobile menu closed with ESC key');
    }
  }
});

// ========================================
// UTILIDADES
// ========================================

// Debounce para optimizar eventos de scroll/resize
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Detectar si es dispositivo móvil
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

console.log('Device type:', isMobile() ? 'mobile' : 'desktop');

// ========================================
// MANEJO DE RENDIMIENTO
// ========================================

// Precargar imágenes críticas
window.addEventListener('load', () => {
  console.log('Window fully loaded');
  initLazyLoading();
});

// Log de errores JavaScript
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.message, 'at', e.filename, 'line', e.lineno);
});

// Advertencia si JavaScript está deshabilitado (noscript)
// Este script no se ejecutará si JS está deshabilitado, pero es buena práctica incluir <noscript> en HTML

// ========================================
// BARRA DE PROGRESO DE SCROLL
// ========================================
function initScrollProgressBar() {
  console.log('Initializing scroll progress bar...');

  // Crear elemento de barra de progreso
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  function updateProgressBar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = `${scrollPercentage}%`;
  }

  window.addEventListener('scroll', debounce(updateProgressBar, 10));
  console.log('Scroll progress bar initialized');
}

// ========================================
// EFECTO PARALLAX EN HERO
// ========================================
function initParallaxEffect() {
  console.log('Initializing parallax effect...');

  const hero = document.querySelector('.hero');

  if (!hero) {
    console.warn('Hero section not found for parallax');
    return;
  }

  // Solo aplicar parallax en desktop
  if (window.innerWidth <= 768) {
    console.log('Parallax disabled on mobile');
    return;
  }

  function applyParallax() {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    if (scrolled < hero.offsetHeight) {
      hero.style.backgroundPositionY = `${scrolled * parallaxSpeed}px`;
    }
  }

  window.addEventListener('scroll', debounce(applyParallax, 10));
  console.log('Parallax effect initialized');
}

// ========================================
// CONTADORES ANIMADOS PARA ESTADÍSTICAS
// ========================================
function initAnimatedCounters() {
  console.log('Initializing animated counters...');

  const counters = document.querySelectorAll('.stat-number');

  if (counters.length === 0) {
    console.warn('No stat counters found');
    return;
  }

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
        console.log('Counter animation started for:', entry.target.textContent);
      }
    });
  }, observerOptions);

  counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
  const text = element.textContent;
  const hasPlus = text.includes('+');
  const hasPercent = text.includes('%');
  const targetNumber = parseInt(text.replace(/\D/g, ''));

  if (isNaN(targetNumber)) {
    console.warn('Counter value is not a number:', text);
    return;
  }

  const duration = 2000; // 2 segundos
  const frameRate = 1000 / 60; // 60 FPS
  const totalFrames = Math.round(duration / frameRate);
  const increment = targetNumber / totalFrames;

  let currentNumber = 0;
  let frame = 0;

  const counter = setInterval(() => {
    frame++;
    currentNumber += increment;

    if (frame >= totalFrames) {
      currentNumber = targetNumber;
      clearInterval(counter);
    }

    let displayValue = Math.floor(currentNumber);
    if (hasPlus) displayValue += '+';
    if (hasPercent) displayValue += '%';

    element.textContent = displayValue;
  }, frameRate);
}

// ========================================
// RIPPLE EFFECT EN BOTONES
// ========================================
function initRippleEffect() {
  console.log('Initializing ripple effect on buttons...');

  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// CSS para ripple effect (se puede agregar dinámicamente)
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyles);

console.log('D\'GEO JavaScript initialized successfully');
