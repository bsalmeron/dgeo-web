import React, { useEffect } from 'react';
import '../dgeo-styles.css';

export default function DgeoWebsite() {
  useEffect(() => {
    console.log('D\'GEO Professional Website - Initializing');

    // Theme Toggle
    const initTheme = () => {
      console.log('Initializing theme toggle...');
      const theme = localStorage.getItem('theme') || 'light';
      console.log('Current theme:', theme);
      document.documentElement.setAttribute('data-theme', theme);

      const themeToggle = document.getElementById('themeToggle');
      if (themeToggle) {
        console.log('Theme toggle button found');
        themeToggle.addEventListener('click', () => {
          const current = document.documentElement.getAttribute('data-theme');
          const next = current === 'light' ? 'dark' : 'light';
          console.log('Theme switched from', current, 'to', next);
          document.documentElement.setAttribute('data-theme', next);
          localStorage.setItem('theme', next);
        });
      } else {
        console.error('Theme toggle button NOT found');
      }
    };

    // Mobile Menu
    const initMobileMenu = () => {
      console.log('Initializing mobile menu...');
      const menuToggle = document.getElementById('menuToggle');
      const nav = document.getElementById('nav');

      if (menuToggle && nav) {
        console.log('Mobile menu elements found');
        menuToggle.addEventListener('click', () => {
          const isActive = menuToggle.classList.toggle('active');
          nav.classList.toggle('active');
          console.log('Mobile menu toggled:', isActive ? 'opened' : 'closed');
        });

        // Close menu when clicking nav links
        nav.querySelectorAll('.nav-link').forEach(link => {
          link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            console.log('Mobile menu closed after navigation');
          });
        });
      } else {
        console.error('Mobile menu elements NOT found');
      }
    };

    // Smooth Scroll
    const initSmoothScroll = () => {
      console.log('Initializing smooth scroll...');
      const links = document.querySelectorAll('a[href^="#"]');
      console.log('Found', links.length, 'anchor links for smooth scrolling');
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const href = link.getAttribute('href');
          const target = document.querySelector(href);
          if (target) {
            const offset = 80;
            const top = target.offsetTop - offset;
            console.log('Smooth scrolling to:', href);
            window.scrollTo({ top, behavior: 'smooth' });
          } else {
            console.warn('Scroll target not found:', href);
          }
        });
      });
    };

    // Scroll Animations
    const initScrollAnimations = () => {
      console.log('Initializing scroll animations...');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              console.log('Element became visible:', entry.target.className);
            }
          });
        },
        { threshold: 0.1 }
      );

      const elements = document.querySelectorAll('.fade-in-up, .service-card-pro, .project-card-pro, .feature-card, .process-step-pro');
      console.log('Observing', elements.length, 'elements for scroll animations');
      elements.forEach(el => {
        observer.observe(el);
      });
    };

    // Header Scroll Effect
    const initHeaderScroll = () => {
      console.log('Initializing header scroll effect...');
      const header = document.getElementById('header');
      if (header) {
        console.log('Header element found');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
          const currentScroll = window.pageYOffset;

          if (currentScroll > 50) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }

          lastScroll = currentScroll;
        });
      } else {
        console.error('Header element NOT found');
      }
    };

    // Initialize all
    console.log('Starting initialization sequence...');
    initTheme();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    console.log('All initializations complete');

    console.log('D\'GEO Professional Website - Ready');
  }, []);

  return (
    <>
      {/* Header */}
      <header className="header" id="header">
        <div className="container-wide">
          <div className="header-content">
            <a href="#inicio" className="logo">
              <div className="logo-icon">D'GEO</div>
              <div className="logo-text">
                <span className="logo-title">D'GEO</span>
                <span className="logo-subtitle">Soluciones Geotécnicas</span>
              </div>
            </a>

            <button className="menu-toggle" id="menuToggle" aria-label="Menu">
              <span></span>
              <span></span>
              <span></span>
            </button>

            <nav className="nav" id="nav">
              <a href="#inicio" className="nav-link">Inicio</a>
              <a href="#servicios" className="nav-link">Servicios</a>
              <a href="#proyectos" className="nav-link">Proyectos</a>
              <a href="#nosotros" className="nav-link">Nosotros</a>
              <a href="#contacto" className="nav-link">Contacto</a>
            </nav>

            <div className="header-actions">
              <button className="theme-toggle" id="themeToggle" aria-label="Toggle theme">
                <svg className="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                <svg className="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </button>
              <a href="#contacto" className="btn btn-primary">Cotizar Proyecto</a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero-professional" id="inicio">
          <div className="hero-bg">
            <img src="https://sensible-spoonbill-485.convex.cloud/api/storage/cd59feba-dc95-41fe-bf68-82486f9367fc" alt="D'GEO Geotecnia" loading="eager" />
            <div className="hero-overlay"></div>
          </div>
          <div className="container-wide">
            <div className="hero-content-professional">
              <div className="hero-badge fade-in-up">Excelencia en Geotecnia</div>
              <h1 className="hero-title-pro fade-in-up">Soluciones Geotécnicas de<br />Clase Mundial</h1>
              <p className="hero-subtitle-pro fade-in-up">
                Liderando el sector con tecnología avanzada, experiencia comprobada y un compromiso inquebrantable con la calidad en cada proyecto de ingeniería geotécnica.
              </p>
              <div className="hero-cta-group fade-in-up">
                <a href="#contacto" className="btn btn-hero-primary">Iniciar Proyecto</a>
                <a href="#servicios" className="btn btn-hero-secondary">Ver Servicios</a>
              </div>
              <div className="hero-stats fade-in-up">
                <div className="hero-stat">
                  <div className="stat-value">15+</div>
                  <div className="stat-label">Años de Experiencia</div>
                </div>
                <div className="hero-stat">
                  <div className="stat-value">500+</div>
                  <div className="stat-label">Proyectos Completados</div>
                </div>
                <div className="hero-stat">
                  <div className="stat-value">100%</div>
                  <div className="stat-label">Satisfacción del Cliente</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-professional" id="servicios">
          <div className="container">
            <div className="section-header-pro fade-in-up">
              <span className="section-badge">Nuestros Servicios</span>
              <h2 className="section-title-pro">Servicios Integrales en Geotecnia</h2>
              <p className="section-desc-pro">
                Ofrecemos soluciones completas respaldadas por equipos de última generación y profesionales altamente calificados
              </p>
            </div>

            <div className="services-grid-pro">
              <article className="service-card-pro fade-in-up">
                <div className="service-image-pro">
                  <img src="https://sensible-spoonbill-485.convex.cloud/api/storage/b480c3cb-862b-4686-9283-a6b34e070952" alt="Investigación Geotécnica" loading="lazy" />
                  <div className="service-overlay"></div>
                </div>
                <div className="service-content-pro">
                  <div className="service-number">01</div>
                  <h3 className="service-title-pro">Investigación Geotécnica</h3>
                  <p className="service-desc-pro">
                    Estudios exhaustivos del subsuelo mediante sondeos avanzados, ensayos in-situ y caracterización geológica detallada para proyectos de infraestructura crítica.
                  </p>
                  <a href="#contacto" className="service-link">
                    Más información
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </article>

              <article className="service-card-pro fade-in-up">
                <div className="service-image-pro">
                  <img src="https://sensible-spoonbill-485.convex.cloud/api/storage/45efd7df-3a0d-4bc6-82d2-98cef0b0d644" alt="Laboratorio Especializado" loading="lazy" />
                  <div className="service-overlay"></div>
                </div>
                <div className="service-content-pro">
                  <div className="service-number">02</div>
                  <h3 className="service-title-pro">Laboratorio Especializado</h3>
                  <p className="service-desc-pro">
                    Ensayos de mecánica de suelos y rocas con equipos de última generación. Análisis granulométricos, límites de Atterberg, resistencia al corte y compactación certificados.
                  </p>
                  <a href="#contacto" className="service-link">
                    Más información
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </article>

              <article className="service-card-pro fade-in-up">
                <div className="service-image-pro">
                  <img src="https://sensible-spoonbill-485.convex.cloud/api/storage/43bf7af7-724a-43e5-af93-91d7026d1959" alt="Equipos Topográficos" loading="lazy" />
                  <div className="service-overlay"></div>
                </div>
                <div className="service-content-pro">
                  <div className="service-number">03</div>
                  <h3 className="service-title-pro">Topografía y Geomática</h3>
                  <p className="service-desc-pro">
                    Levantamientos topográficos de alta precisión con tecnología GNSS, estaciones totales y drones profesionales para mapeo y modelado 3D del terreno.
                  </p>
                  <a href="#contacto" className="service-link">
                    Más información
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </article>

              <article className="service-card-pro fade-in-up">
                <div className="service-image-pro">
                  <img src="https://sensible-spoonbill-485.convex.cloud/api/storage/ca705595-c339-4558-af9f-907bb69d65a7" alt="Diseño y Construcción" loading="lazy" />
                  <div className="service-overlay"></div>
                </div>
                <div className="service-content-pro">
                  <div className="service-number">04</div>
                  <h3 className="service-title-pro">Diseño y Supervisión</h3>
                  <p className="service-desc-pro">
                    Diseño de cimentaciones, muros de contención, estabilización de taludes y soluciones geotécnicas personalizadas con supervisión técnica especializada continua.
                  </p>
                  <a href="#contacto" className="service-link">
                    Más información
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Projects Gallery Section */}
        <section className="projects-professional" id="proyectos">
          <div className="container">
            <div className="section-header-pro fade-in-up">
              <span className="section-badge">Portfolio</span>
              <h2 className="section-title-pro">Proyectos Destacados</h2>
              <p className="section-desc-pro">
                Casos de éxito que demuestran nuestra capacidad técnica y compromiso con la excelencia
              </p>
            </div>

            <div className="projects-grid-pro">
              <article className="project-card-pro fade-in-up">
                <div className="project-image-wrapper">
                  <img src="https://sensible-spoonbill-485.convex.cloud/api/storage/ca705595-c339-4558-af9f-907bb69d65a7" alt="Green Park" loading="lazy" />
                  <div className="project-overlay-gradient"></div>
                </div>
                <div className="project-content-abs">
                  <span className="project-category">Infraestructura Industrial</span>
                  <h3 className="project-title-abs">Green Park</h3>
                  <p className="project-desc-abs">Diseño y construcción de naves industriales con estudios geotécnicos integrales</p>
                </div>
              </article>

              <article className="project-card-pro fade-in-up">
                <div className="project-image-wrapper">
                  <img src="https://sensible-spoonbill-485.convex.cloud/api/storage/ace81e06-13ed-47c4-8b76-4901604a89c2" alt="Green Park Free Zone" loading="lazy" />
                  <div className="project-overlay-gradient"></div>
                </div>
                <div className="project-content-abs">
                  <span className="project-category">Zona Franca</span>
                  <h3 className="project-title-abs">Green Park Free Zone</h3>
                  <p className="project-desc-abs">Proyecto de zona franca con estudios completos de mecánica de suelos</p>
                </div>
              </article>

              <article className="project-card-pro fade-in-up">
                <div className="project-image-wrapper">
                  <img src="https://sensible-spoonbill-485.convex.cloud/api/storage/ad97dd66-e802-4f13-9e6a-a42f92700113" alt="Investigación de Campo" loading="lazy" />
                  <div className="project-overlay-gradient"></div>
                </div>
                <div className="project-content-abs">
                  <span className="project-category">Investigación</span>
                  <h3 className="project-title-abs">Estudio Geotécnico Urbano</h3>
                  <p className="project-desc-abs">Investigación exhaustiva para desarrollo de edificaciones en zona urbana</p>
                </div>
              </article>

              <article className="project-card-pro fade-in-up">
                <div className="project-image-wrapper">
                  <img src="https://sensible-spoonbill-485.convex.cloud/api/storage/d0568b34-3a2f-4356-95f4-6579c566265f" alt="Equipo Topográfico" loading="lazy" />
                  <div className="project-overlay-gradient"></div>
                </div>
                <div className="project-content-abs">
                  <span className="project-category">Topografía</span>
                  <h3 className="project-title-abs">Levantamiento de Precisión</h3>
                  <p className="project-desc-abs">Levantamiento topográfico con tecnología GNSS de última generación</p>
                </div>
              </article>

              <article className="project-card-pro fade-in-up">
                <div className="project-image-wrapper">
                  <img src="https://sensible-spoonbill-485.convex.cloud/api/storage/2c2e0315-a2c9-4e77-9c9c-d3063188d189" alt="Trabajo de Campo" loading="lazy" />
                  <div className="project-overlay-gradient"></div>
                </div>
                <div className="project-content-abs">
                  <span className="project-category">Sondeos</span>
                  <h3 className="project-title-abs">Perforación Geotécnica</h3>
                  <p className="project-desc-abs">Sondeos profundos para caracterización del subsuelo en proyectos críticos</p>
                </div>
              </article>

              <article className="project-card-pro fade-in-up">
                <div className="project-image-wrapper">
                  <img src="https://sensible-spoonbill-485.convex.cloud/api/storage/4ec9efb1-842a-4775-bed2-907b11e31d68" alt="Equipo en Campo" loading="lazy" />
                  <div className="project-overlay-gradient"></div>
                </div>
                <div className="project-content-abs">
                  <span className="project-category">Monitoreo</span>
                  <h3 className="project-title-abs">Instrumentación Geotécnica</h3>
                  <p className="project-desc-abs">Monitoreo continuo de estructuras con instrumentación de alta precisión</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about-professional" id="nosotros">
          <div className="container">
            <div className="about-grid-pro">
              <div className="about-images fade-in-up">
                <div className="about-image-main">
                  <img src="https://sensible-spoonbill-485.convex.cloud/api/storage/4ec9efb1-842a-4775-bed2-907b11e31d68" alt="Equipo D'GEO" loading="lazy" />
                </div>
                <div className="about-image-secondary">
                  <img src="https://sensible-spoonbill-485.convex.cloud/api/storage/d0568b34-3a2f-4356-95f4-6579c566265f" alt="Equipo Técnico" loading="lazy" />
                </div>
              </div>

              <div className="about-content-pro fade-in-up">
                <span className="section-badge">Sobre Nosotros</span>
                <h2 className="section-title-pro">Excelencia Técnica y Compromiso con Nuestros Clientes</h2>
                <p className="about-text-pro">
                  Somos una empresa especializada en el área de la geotecnia que busca entregar soluciones oportunas, correctas y eficaces. Nuestro equipo de profesionales expertos está comprometido con ofrecer la más alta calidad en cada uno de nuestros procesos.
                </p>
                <p className="about-text-pro">
                  Con más de 15 años de experiencia, hemos consolidado nuestra posición como líderes en Costa Rica, ofreciendo servicios integrales que van desde la investigación geotécnica hasta el diseño y supervisión de obras civiles de gran envergadura.
                </p>

                <div className="about-features">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg>
                    </div>
                    <div className="feature-text">
                      <h4>Tecnología Avanzada</h4>
                      <p>Equipos de última generación para resultados precisos</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div className="feature-text">
                      <h4>Equipo Experto</h4>
                      <p>Profesionales altamente calificados y certificados</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg>
                    </div>
                    <div className="feature-text">
                      <h4>Monitoreo Continuo</h4>
                      <p>Seguimiento exhaustivo en todas las etapas del proyecto</p>
                    </div>
                  </div>
                </div>

                <a href="#contacto" className="btn btn-primary">Conocer Más</a>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="process-professional">
          <div className="container">
            <div className="section-header-pro fade-in-up">
              <span className="section-badge">Nuestro Proceso</span>
              <h2 className="section-title-pro">Metodología Comprobada</h2>
              <p className="section-desc-pro">
                Un proceso estructurado que garantiza resultados excepcionales en cada proyecto
              </p>
            </div>

            <div className="process-grid-pro">
              <div className="process-step-pro fade-in-up">
                <div className="step-number-pro">01</div>
                <h3 className="step-title-pro">Consulta Inicial</h3>
                <p className="step-desc-pro">Reunión con el cliente para entender necesidades, objetivos y requerimientos técnicos específicos del proyecto.</p>
              </div>

              <div className="process-step-pro fade-in-up">
                <div className="step-number-pro">02</div>
                <h3 className="step-title-pro">Investigación</h3>
                <p className="step-desc-pro">Estudios de campo, sondeos geotécnicos, ensayos de laboratorio y evaluación exhaustiva de las condiciones del sitio.</p>
              </div>

              <div className="process-step-pro fade-in-up">
                <div className="step-number-pro">03</div>
                <h3 className="step-title-pro">Análisis y Diseño</h3>
                <p className="step-desc-pro">Procesamiento de datos, análisis técnico y desarrollo de soluciones geotécnicas personalizadas y optimizadas.</p>
              </div>

              <div className="process-step-pro fade-in-up">
                <div className="step-number-pro">04</div>
                <h3 className="step-title-pro">Implementación</h3>
                <p className="step-desc-pro">Ejecución del proyecto con supervisión continua, control de calidad riguroso y seguimiento de especificaciones.</p>
              </div>

              <div className="process-step-pro fade-in-up">
                <div className="step-number-pro">05</div>
                <h3 className="step-title-pro">Entrega y Seguimiento</h3>
                <p className="step-desc-pro">Presentación de informes técnicos detallados, recomendaciones y seguimiento post-proyecto para garantizar el éxito.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-professional" id="contacto">
          <div className="container">
            <div className="contact-grid-pro">
              <div className="contact-info-pro fade-in-up">
                <span className="section-badge">Contacto</span>
                <h2 className="section-title-pro">Iniciar un Proyecto</h2>
                <p className="contact-desc-pro">
                  Estamos listos para ayudarle con su proyecto geotécnico. Contáctenos para una consulta inicial sin compromiso.
                </p>

                <div className="contact-items">
                  <div className="contact-item-pro">
                    <div className="contact-icon-pro">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div className="contact-text-pro">
                      <div className="contact-label">Teléfono</div>
                      <a href="tel:+50622538047" className="contact-value">(506) 2253-8047</a>
                    </div>
                  </div>

                  <div className="contact-item-pro">
                    <div className="contact-icon-pro">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div className="contact-text-pro">
                      <div className="contact-label">Email</div>
                      <a href="mailto:info@dgeosoluciones.com" className="contact-value">info@dgeosoluciones.com</a>
                    </div>
                  </div>

                  <div className="contact-item-pro">
                    <div className="contact-icon-pro">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div className="contact-text-pro">
                      <div className="contact-label">Ubicación</div>
                      <div className="contact-value">Emma Gamboa, San Pedro<br />San José, Costa Rica</div>
                    </div>
                  </div>
                </div>

                <div className="contact-social-pro">
                  <a href="https://www.instagram.com/dgeo_soluciones/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="https://wa.me/50622538047" target="_blank" rel="noopener noreferrer" className="social-btn social-btn-whatsapp" aria-label="WhatsApp">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="contact-form-pro fade-in-up">
                <form className="form-pro" id="contactForm">
                  <div className="form-group-pro">
                    <label htmlFor="name" className="form-label-pro">Nombre completo</label>
                    <input type="text" id="name" name="name" className="form-input-pro" placeholder="Juan Pérez" required />
                  </div>

                  <div className="form-group-pro">
                    <label htmlFor="email" className="form-label-pro">Correo electrónico</label>
                    <input type="email" id="email" name="email" className="form-input-pro" placeholder="juan@empresa.com" required />
                  </div>

                  <div className="form-group-pro">
                    <label htmlFor="phone" className="form-label-pro">Teléfono</label>
                    <input type="tel" id="phone" name="phone" className="form-input-pro" placeholder="+506 2253-8047" required />
                  </div>

                  <div className="form-group-pro">
                    <label htmlFor="message" className="form-label-pro">Mensaje</label>
                    <textarea id="message" name="message" className="form-input-pro form-textarea-pro" rows="5" placeholder="Cuéntenos sobre su proyecto..." required></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-full">Enviar Mensaje</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer-professional">
        <div className="container">
          <div className="footer-grid-pro">
            <div className="footer-col-pro">
              <div className="footer-logo-pro">D'GEO</div>
              <p className="footer-desc-pro">
                Empresa líder en soluciones geotécnicas de alta calidad en Costa Rica, comprometidos con la excelencia técnica y la satisfacción del cliente.
              </p>
              <div className="footer-social">
                <a href="https://www.instagram.com/dgeo_soluciones/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://wa.me/50622538047" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="WhatsApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-col-pro">
              <h4 className="footer-title-pro">Enlaces</h4>
              <ul className="footer-links-pro">
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#proyectos">Proyectos</a></li>
                <li><a href="#nosotros">Nosotros</a></li>
                <li><a href="#contacto">Contacto</a></li>
              </ul>
            </div>

            <div className="footer-col-pro">
              <h4 className="footer-title-pro">Servicios</h4>
              <ul className="footer-links-pro">
                <li><a href="#servicios">Investigación Geotécnica</a></li>
                <li><a href="#servicios">Laboratorio Especializado</a></li>
                <li><a href="#servicios">Topografía y Geomática</a></li>
                <li><a href="#servicios">Diseño y Supervisión</a></li>
              </ul>
            </div>

            <div className="footer-col-pro">
              <h4 className="footer-title-pro">Contacto</h4>
              <ul className="footer-contact-list">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <a href="tel:+50622538047">(506) 2253-8047</a>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <a href="mailto:info@dgeosoluciones.com">info@dgeosoluciones.com</a>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>San José, Costa Rica</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-pro">
            <p>&copy; 2026 D'GEO Soluciones Geotécnicas. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
