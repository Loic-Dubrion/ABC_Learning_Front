// Import React
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Import css
import './Header.scss';

// Import modals
import LoginModal from '../../components/Modals/LoginModal/LoginModal';
import CreateSequenceModal from '../../components/Modals/CreateSequenceModal/CreateSequenceModal';

// Import Redux
import { toggleMenu } from '../../../globalRedux/store/reducers/menuSlice';
import { clearTokens } from '../../../globalRedux/store/reducers/authSlice';

// Import typage
import { HeaderProps } from './HeaderTypes';

// Composant
function Header({ logo, title, subtitle }: HeaderProps) {
  const dispatch = useDispatch(); // Utilise Redux
  const navigate = useNavigate(); // Utilise la redirection

  //! Gestion des états
  // Utilisation du hook useSelector pour récupérer l'état global
  const isMenuOpen = useSelector(state => state.menu.isOpen);
  const isUserLoggedIn = useSelector(state => state.auth.accessToken !== null);
  
  //Utilisation de useState pour attribuer un état local
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateSequenceModalOpen, setIsCreateSequenceModalOpen] = useState(false);

  //! Gestion des events
  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
    navigate('/profil');
  };

  const handleCreateSequenceClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setIsCreateSequenceModalOpen(true);
  };

  const handleCloseCreateSequenceModal = (sequenceName: string) => {
    setIsCreateSequenceModalOpen(false);
    navigate('/create-sequence');
  };

  const handleCancelCreateSequence = () => {
    setIsCreateSequenceModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(clearTokens()); 
  };

  //! Composant
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
          {!isUserLoggedIn ? (
            <>
              <Link to="#" onClick={handleLoginClick}>Se connecter</Link>
              <Link to="#">S'enregistrer</Link>
            </>
          ) : (
            <>
              <Link to="#" onClick={handleCreateSequenceClick}>Créer un scénario</Link>
              <Link to="/profil">Profil</Link>
              <Link to="#" onClick={handleLogout}>Se déconnecter</Link>
            </>
          )}
        </div>
      )}

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={handleCloseLoginModal} 
      />
      <CreateSequenceModal 
        isOpen={isCreateSequenceModalOpen} 
        onConfirm={handleCloseCreateSequenceModal} 
        onCancel={handleCancelCreateSequence} 
      />
    
    </div>
  );
}

export default Header;
