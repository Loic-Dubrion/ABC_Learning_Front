import React, { useEffect, useState } from 'react';
import './Profil.scss';
import axiosInstance from '../../../../utils/axios';
import { ProfilData, UserInfo } from './ProfilTypes';

const Profil: React.FC = () => {
  const userId = localStorage.getItem('userId');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userId) {
        try {
          const response = await axiosInstance.get(`/user/${userId}`);
          setUserInfo(response.data[0].get_user_info);
        } catch (error) {
          console.error("Erreur lors de la récupération des données:", error);
        }
      }
    };

    fetchUserInfo();
  }, [userId]);

  if (!userInfo) {
    return <div>Chargement...</div>;
  }

  const maskEmail = (email: string) => {
    const parts = email.split('@');
    return `${parts[0].substring(0, 3)}***@${parts[1]}`;
  };

  return (
    <div className="profil">
      <h3>Mon profil</h3>
      <div className="profil__info">
        <h4>Pseudo</h4>
        <span>{userInfo.username}</span>
        <button>Modifier</button>
      </div>
      <div className="profil__info">
        <h4>Mail</h4>
        <span>{maskEmail(userInfo.email)}</span>
        <button>Modifier</button>
      </div>
      <div className="profil__info">
        <h4>Etablissement</h4>
        <span>{userInfo.establishment}</span>
        <button>Modifier</button>
      </div>

      <div className="profil__info">
        <h4>Mot de passe</h4>
        <span>*******</span>
        <button>Modifier</button>
      </div>
      
    </div>
  );
}

export default Profil;
