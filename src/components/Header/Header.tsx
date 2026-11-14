

import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__contenedor">
        {/* Logotipo, teléfonos e idioma */}
        <div className="header__encabezado">
          <a className="header__logo" href="#inicio">
            <img src="/img/logo.jpg" alt="Hound Express" />
          </a>

          <div className="header__telefono">
            <p>
              <span>MX</span> +52(55) 4000 1920
            </p>
          </div>

          <div className="header__telefono">
            <p>
              <span>USA</span> +(95) 6568 3443
            </p>
          </div>

          <div className="header__idioma">
            <select name="idioma" defaultValue="ES" aria-label="Idioma">
              <option value="ES">Español</option>
              <option value="EN">English</option>
            </select>
          </div>
        </div>

        {/* Barra de navegación */}
        <div className="header__navegacion">
          <nav
            className="header__menu"
            aria-label="Navegación principal"
          >
            <a href="#inicio">Inicio</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#servicios">Servicios</a>
            <a href="#preguntas">Preguntas</a>
            <a href="#noticias">Noticias</a>
            <a href="#blog">Blog</a>
            <a href="#contacto">Contacto</a>
          </nav>

          <div className="header__portales">
            <a href="#rastreo">
              <span aria-hidden="true">🔎</span> Rastrear paquete
            </a>

            <a href="#portal">Portal Cliente</a>
          </div>
        </div>

        {/* Banner promocional original */}
        <section className="header__banner">
          <p>
            Contamos con amplia experiencia e infraestructura internacional.
          </p>

          <a href="#contacto">Contáctanos</a>
        </section>

        {/* Accesos a las secciones de la práctica */}
        <section className="header__acciones">
          <p className="header__acciones-titulo">Acciones &gt;&gt;</p>

          <nav
            className="header__acciones-menu"
            aria-label="Accesos a las guías"
          >
            <a href="#registro">Registro Guías</a>
            <a href="#estado">Estado General</a>
            <a href="#listado">Lista Guías</a>
            <a href="#buscador">Busca Guías</a>
          </nav>
        </section>
      </div>
    </header>
  );
}

export default Header;
