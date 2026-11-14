
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__principal">

        <div className="footer__marca">
          <img
            src="/img/logo_oscuro.jpg"
            alt="Hound Express"
            className="footer__logo"
          />

          <div className="footer__redes">
            <img src = "img/facebook.png" />
            <img src = "img/instagram.png" />
            <img src = "img/linkedin.png" />
          </div>
        </div>

        <nav className="footer__navegacion">
          <h2>Hound Express</h2>
          <a href="#">Inicio</a>
          <a href="#">Nosotros</a>
          <a href="#">Servicios</a>
          <a href="#">Preguntas</a>
          <a href="#">Noticias</a>
          <a href="#">Blog</a>
          <a href="#">Contacto</a>
        </nav>

        <div className="footer__contacto">
          <h3>Contáctanos</h3>

          <div className="footer__whatsapp">
            <img src = "img/whatsapp.png" alt = "WhatsApp" />
          </div>

          <p>Lunes a viernes de 09:00 a 18:00 hrs.</p>

          <div className="footer__telefonos">
            <p>MX</p>
            <a href="tel:+525540001920">📞 +52 55 4000 1920</a>

            <p>USA</p>
            <a href="tel:+9565683443">📞 +95 6568 3443</a>
          </div>
        </div>

      </div>

      <div className="footer__inferior">
        <p>Copyright © Hound Express. Todos los derechos reservados.</p>
        <a href="#">Política de Privacidad</a>
      </div>
    </footer>
  );
}

export default Footer;
