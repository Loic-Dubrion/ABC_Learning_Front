import React, { useState, useEffect } from 'react';
import DeleteModal from '../../Modals/DeleteModal/DeleteModal'; // Assurez-vous d'importer le bon chemin
import './Sequence.scss';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../../../utils/axios';
import { SequenceDetail } from './SequenceTypes';
import { RootState } from '../../../../globalRedux/store/reducers/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

import { fetchSequenceDetailStart, fetchSequenceDetailSuccess, fetchSequenceDetailFailure } from '../../../../globalRedux/store/reducers/sequenceDetailSlice';

const Sequence: React.FC = () => {
  const dispatch = useDispatch();
  const sequenceDetail = useSelector((state: RootState) => state.sequenceDetail.sequence);
  const userId = localStorage.getItem('userId');
  const sequenceId = window.location.pathname.split('/').pop();

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentModalType, setCurrentModalType] = useState<'DELETE_SEQUENCE' | 'DELETE_SESSION' | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  useEffect(() => {
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
    }

    fetchSequenceDetail();
  }, [userId, sequenceId, dispatch]);

  const openModal = (type: 'DELETE_SEQUENCE' | 'DELETE_SESSION', sessionId?: string) => {
    setCurrentModalType(type);
    if (sessionId) setCurrentSessionId(sessionId);
    setModalOpen(true);
  }

  const closeModal = () => {
    setCurrentModalType(null);
    setCurrentSessionId(null);
    setModalOpen(false);
  }

  const handleConfirm = async () => {
    if (!userId) return;

    if (currentModalType === 'DELETE_SEQUENCE' && sequenceId) {
      await axiosInstance.delete(`/user/${userId}/sequence/${sequenceId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
    } else if (currentModalType === 'DELETE_SESSION' && currentSessionId) {
      await axiosInstance.delete(`/user/${userId}/session/${currentSessionId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
    }
    closeModal();
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
                <h3 className="sequence__session-name">{session.session_name}</h3>
                <button className="sequence__edit-btn">
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <button className="sequence__delete-btn" onClick={() => openModal('DELETE_SESSION', String(session.session_id))}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <h4 className="sequence__session-tool">Outil: {session.tool_name}</h4>
              <ul>
                {/* ... autres détails de la session ... */}
              </ul>
            </div>
          ))}
          <div>
            <button className="sequence__add-btn">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <DeleteModal
            isOpen={isModalOpen}
            itemName={currentModalType === 'DELETE_SEQUENCE' ? 'la séquence' : 'la session'}
            modalType={currentModalType}
            onConfirm={handleConfirm}
            onCancel={closeModal}
          />
        </>
      ) : (
        <p>Loading sequence details...</p>
      )}
    </div>
  );
}

export default Sequence;
