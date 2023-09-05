import './Footer.scss';

interface FooterProps {
  copyright: string;
}

function Footer() {
  return (
    <div className="footer">
      <p className="footer-copyright">Castor copyright</p>
    </div>
  );
}

export default Footer;
