import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Header.scss';
import { toggleMenu } from '../../../globalRedux/store/reducers/menuSlice';
import { HeaderProps } from './HeaderTypes';

function Header({ logo, title, subtitle }: HeaderProps) {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector(state => state.menu.isOpen); // Sélectionnez l'état du menu à partir du store Redux

  return (
    <div className="header">
      {/* <Link to="/" className="header-logoLink"> */}
        <img src={logo} alt="Logo" className="header-logo" />
      {/* </Link> */}
      <div className='header-content'>
        <h1 className="header-title">{title}</h1>
        <h2 className="header-subtitle">{subtitle}</h2>
      </div>
      <div className="burger-menu-icon" onClick={() => dispatch(toggleMenu())}>
        ☰  {/* Vous pouvez remplacer cela par une icône ou une image */}
      </div>

      {isMenuOpen && (
        <div className="burger-menu">
          <Link to="/">Se connecter</Link>
          <Link to="/about">À propos</Link>
        </div>
      )}
    </div>
  );
}

export default Header;
