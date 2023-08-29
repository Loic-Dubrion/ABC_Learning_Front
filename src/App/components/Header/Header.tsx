import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Header.scss';
import LoginModal from '../../components/Modals/LoginModal/LoginModal';
import CreateSequenceModal from '../../components/Modals/CreateSequenceModal/CreateSequenceModal';
import { toggleMenu } from '../../../globalRedux/store/reducers/menuSlice';
import { HeaderProps } from './HeaderTypes';

function Header({ logo, title, subtitle }: HeaderProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMenuOpen = useSelector(state => state.menu.isOpen);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateSequenceModalOpen, setIsCreateSequenceModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
    navigate('/profil');
  };

  const handleCreateSequenceClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault(); // empêche le comportement par défaut du lien
    setIsCreateSequenceModalOpen(true);
  };

  const handleCloseCreateSequenceModal = (sequenceName: string) => {
    setIsCreateSequenceModalOpen(false);
    navigate('/create-sequence');
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
          <Link to="#" onClick={handleCreateSequenceClick}>Créer un scénario</Link>
          <Link to="/profil">Profil</Link>
        </div>
      )}

      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
      <CreateSequenceModal isOpen={isCreateSequenceModalOpen} onConfirm={handleCloseCreateSequenceModal} onCancel={() => setIsCreateSequenceModalOpen(false)} />
    </div>
  );
}

export default Header;
