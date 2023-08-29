import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../Modals/DeleteModal/DeleteModal';
import './Sequence.scss';
import { SequenceDetail, Session } from './SequenceTypes';
import { FormData } from '../../Modals/UpdateSessionModal/UpdateSessionModalTypes';
import UpdateSessionModal from '../../Modals/UpdateSessionModal/UpdateSessionModal'
import { RootState } from '../../../../globalRedux/store/reducers/index';
import axiosInstance from '../../../../utils/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { fetchSequenceDetailStart, fetchSequenceDetailSuccess, fetchSequenceDetailFailure } from '../../../../globalRedux/store/reducers/sequenceDetailSlice';

const Sequence: React.FC = () => {
  // Hooks et utilitaires Redux
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Utilisé pour naviguer entre les pages

  // Sélectionne les détails de la séquence depuis le state Redux
  const sequenceDetail = useSelector((state: RootState) => state.sequenceDetail.sequence);
  console.log(sequenceDetail);

  // Récupère l'ID utilisateur depuis le localStorage
  const userId = localStorage.getItem('userId');

  // Extrait l'ID de la séquence depuis l'URL
  const sequenceId = window.location.pathname.split('/').pop();

  // État local pour gérer l'ouverture/fermeture de la modale de suppression
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentModalType, setCurrentModalType] = useState<'DELETE_SEQUENCE' | 'DELETE_SESSION' | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const fetchSequenceDetail = async () => {
    if (userId && sequenceId) {
      dispatch(fetchSequenceDetailStart());
      try {
        const response = await axiosInstance.get(`/user/${userId}/sequence/${sequenceId}`);
        dispatch(fetchSequenceDetailSuccess(response.data[0]));
      } catch (error) {
        dispatch(fetchSequenceDetailFailure(error.message));
      }
    }
  };

  // Effect pour récupérer les détails de la séquence dès le montage du composant
  useEffect(() => {
    fetchSequenceDetail();
}, [userId, sequenceId, dispatch]);

//! Gestion de l'update
  // États pour la modal de mise à jour
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [currentSessionData, setCurrentSessionData] = useState<Session | undefined>();

  // Ouvrir la modal de mise à jour
  const openUpdateModal = (session: Session) => {
    setCurrentSessionData(session); 
    setUpdateModalOpen(true);
  };

  // Fermer la modal de mise à jour
  const closeUpdateModal = () => {
    setCurrentSessionData(undefined);
    setUpdateModalOpen(false);
  };

  // Gérer la mise à jour des données
  const handleUpdate = async (updatedData: FormData) => {
    if (!userId || !currentSessionData) return;

    try {
      // Création de l'objet session mis à jour
      const sessionUpdate = {
        name: updatedData.name,
        activity_id: updatedData.activity_id,
        comments: updatedData.comments,
        time: updatedData.time,
        is_face_to_face: updatedData.is_face_to_face,
        is_group_work: updatedData.is_group_work,
        equipment: updatedData.equipment
      };
    
    console.log(sessionUpdate);

    // Effectuer la requête PUT
    await axiosInstance.put(`/user/${userId}/session/${currentSessionData.session_id}`, sessionUpdate, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });

    // Rafraîchissez vos données et fermez la modal une fois la mise à jour terminée
    fetchSequenceDetail();
    closeUpdateModal();
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la session:", error);
  }
  };

  //! Fin gestion de l'update


  // Fonction pour ouvrir la modale de suppression avec le bon type et ID de session (si nécessaire)
  const openModal = (type: 'DELETE_SEQUENCE' | 'DELETE_SESSION', sessionId?: string) => {
    setCurrentModalType(type);
    if (sessionId) setCurrentSessionId(sessionId);
    setModalOpen(true);
  }

  // Fonction pour fermer la modale de suppression
  const closeModal = () => {
    setCurrentModalType(null);
    setCurrentSessionId(null);
    setModalOpen(false);
  }

  // Gère la suppression lors de la confirmation dans la modale
  const handleConfirm = async () => {
    if (!userId) return;

    try {
      if (currentModalType === 'DELETE_SEQUENCE' && sequenceId) {
        await axiosInstance.delete(`/user/${userId}/sequence/${sequenceId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });

        // Redirige l'utilisateur vers la page /profil après suppression
        navigate('/profil');
      } else if (currentModalType === 'DELETE_SESSION' && currentSessionId) {
        await axiosInstance.delete(`/user/${userId}/session/${currentSessionId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });

        // Actualise les détails de la séquence après suppression d'une session
        fetchSequenceDetail();
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      closeModal();
    }
  }

  return (
    <div className="sequence">
      {sequenceDetail ? (
        <>

          <div className="sequence__header">
            <h2 className="sequence__title">{sequenceDetail.sequence_name}</h2>
            <button className="sequence__delete-btn" onClick={() => openModal('DELETE_SEQUENCE')}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>

          {sequenceDetail.sessions && sequenceDetail.sessions.map((session) => (
            <div key={session.session_id} className={`sequence__session sequence__session--${session.card_name.toLowerCase()}`}>
              <div className="sequence__session-header">
                <h3 className="sequence__session-name">{session.session_name} - <span>{session.card_name}</span></h3>

                <button className="sequence__edit-btn" onClick={() => openUpdateModal(session)}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>

                <button className="sequence__delete-btn" onClick={() => openModal('DELETE_SESSION', String(session.session_id))}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>

              </div>

              <h4 className="sequence__session-tool">Outil: {session.tool_name}</h4>
              <ul>
                <li>Commentaire: {session.comments}</li>
                <li>Durée (en min): {session.time}</li>
                <li>Equipement: {session.equipment} </li>
                <li>Difficulté: {session.level_name} </li>
                <li>Présentiel: {session.is_face_to_face?"OUI":"NON"} </li>
                <li>Travail de groupe: {session.is_group_work?"OUI":"NON"} </li>
              </ul>

            </div>
          ))}

          <div>
            <button className="sequence__add-btn">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          {/* Modal de supression */}
          <DeleteModal
            isOpen={isModalOpen}
            itemName={currentModalType === 'DELETE_SEQUENCE' ? 'la séquence' : 'la session'}
            modalType={currentModalType}
            onConfirm={handleConfirm}
            onCancel={closeModal}
          />

          {/* Modal de mise à jour */}
          <UpdateSessionModal
            isOpen={isUpdateModalOpen}
            onSubmit={handleUpdate}
            onCancel={closeUpdateModal}
            {...(currentSessionData ? { initialData: currentSessionData } : {})}
          />

        </>

      ) : (
        <p>Loading sequence details...</p>
      )}

    </div>
  );
}

export default Sequence;
