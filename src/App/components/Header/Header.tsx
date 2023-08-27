import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Header.scss';
import LoginModal from '../../components/Modals/LoginModal/LoginModal'; // Ajustez le chemin d'accès
import { toggleMenu } from '../../../globalRedux/store/reducers/menuSlice';
import { HeaderProps } from './HeaderTypes';

function Header({ logo, title, subtitle }: HeaderProps) {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector(state => state.menu.isOpen);

  // Etat pour le contrôle de l'affichage de la modal
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Gestionnaire pour ouvrir la modal de connexion
  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  // Gestionnaire pour fermer la modal de connexion
  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="header">
      <Link to="/" className="header-logoLink">
        <img src={logo} alt="Logo" className="header-logo" />
      </Link>
      <div className="header-content">
        <h1 className="header-title">{title}</h1>
        <h2 className="header-subtitle">{subtitle}</h2>
      </div>
      <div 
        className={`burger-menu-icon ${isMenuOpen ? 'cross' : ''}`} 
        onClick={() => dispatch(toggleMenu())}
      >
        {isMenuOpen ? '✖' : '☰'}
      </div>

      {isMenuOpen && (
        <div className="burger-menu">
          <Link to="#" onClick={handleLoginClick}>Se connecter</Link>
          <Link to="/create-session">Créer un scénario</Link>
          <Link to="/profil">Profil</Link>
        </div>
      )}

      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </div>
  );
}

export default Header;