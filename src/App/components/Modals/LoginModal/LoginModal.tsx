import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTokens } from '../../../../globalRedux/store/reducers/authSlice';
import { LoginModalProps } from './LoginModalTypes';
import jwtDecode from 'jwt-decode';
import axiosInstance from '../../../../utils/axios';

import '../Modals.scss';

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/log/in', formData);
      console.log("Réponse reçue:", response.data);
  
      if (response.data && response.data.status === 'success') {
        const { accessToken, refreshToken } = response.data.data;
  
        // Décodage du token d'accès
        const decodedToken: any = jwtDecode(accessToken);
        const { id, username, roles, permissions } = decodedToken.data;
  
        // Stockage des tokens et des données d'utilisateur dans le localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', id.toString());
        localStorage.setItem('username', username);
        localStorage.setItem('roles', JSON.stringify(roles));
        localStorage.setItem('permissions', JSON.stringify(permissions));
  
        dispatch(setTokens({ accessToken, refreshToken }));
        onLoginSuccess && onLoginSuccess({ accessToken, refreshToken });
        onClose();
      } else {
        setError("Erreur lors de la connexion");
      }
    } catch (err) {
      console.error("Erreur lors de la requête:", err);
      setError("Une erreur est survenue lors de la tentative de connexion");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">Se connecter</h2>
        {error && <div className="modal__error">{error}</div>}
        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__form--input-group">
            <label className="modal__form--label">Pseudo</label>
            <input className="modal__form--input" type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div className="modal__form--input-group">
            <label className="modal__form--label">Mot de passe</label>
            <input className="modal__form--input" type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <button className="modal__button" type="submit" disabled={isSubmitting}>Login</button>
        </form>
      </div>
      <div className="modal__overlay" onClick={onClose}></div>
    </div>
  );
}

export default LoginModal;
