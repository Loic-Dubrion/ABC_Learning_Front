// Footer.tsx

import './Footer.scss'; // Import du style SASS

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
