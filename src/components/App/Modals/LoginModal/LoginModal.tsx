import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTokens } from '../../../../globalRedux/store/reducers/authSlice'; // Remplacez par le chemin correct vers votre fichier authSlice
import { LoginModalProps } from './LoginModalTypes';

import '../Modals.scss';

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const dispatch = useDispatch();

  // Initialisation du state
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

    // Ici, effectuez la requête de connexion. Si elle réussit, dispatchez setTokens
    // Pour le moment, je vais simuler une réponse réussie après un délai.

    setTimeout(() => {
      setIsSubmitting(false);
      dispatch(setTokens({ accessToken: 'mockAccessToken', refreshToken: 'mockRefreshToken' }));
      onLoginSuccess && onLoginSuccess({ accessToken: 'mockAccessToken', refreshToken: 'mockRefreshToken' });
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit" disabled={isSubmitting}>Login</button>
        </form>
      </div>
      <div className="modal-overlay" onClick={onClose}></div>
    </div>
  );
}

export default LoginModal;
