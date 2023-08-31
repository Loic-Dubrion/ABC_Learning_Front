import React, { useRef, useState } from 'react';
import axiosInstance from '../../../../utils/axios';
import '../Modals.scss';
import { CreateSequenceModalProps } from './CreateSequenceModalTypes';
import { useDispatch } from 'react-redux';
import { setSequenceData } from '../../../../globalRedux/store/reducers/createSequenceSlice';

const CreateSequenceModal: React.FC<CreateSequenceModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  const sequenceNameRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setError(null);

    if (sequenceNameRef.current) {
      const sequenceNameValue = sequenceNameRef.current.value;
      const userId = localStorage.getItem('userId');
      const accessToken = localStorage.getItem('accessToken');

      if (userId && accessToken) {
        try {
          const response = await axiosInstance.post(`/user/${userId}/sequence/`, 
            {
              name: sequenceNameValue,
              user_id: userId
            },
            {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              }
            }
          );

          console.log("Réponse reçue:", response.data[0]);
          console.log("Dispatching setSequenceData with:", response.data[0]);

          dispatch(setSequenceData(response.data[0]));
          onConfirm(sequenceNameValue);
         
        } catch (err) {
          console.error("Erreur lors de la création de la séquence:", err);
          setError("Une erreur est survenue lors de la tentative de création de la séquence.");
        } finally {
          setIsSubmitting(false);
        }
      } else {
        setError("UserId ou accessToken non trouvé.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">Créer une séquence</h2>
        {error && <div className="modal__error">{error}</div>}
        <form onSubmit={handleSubmit} className="modal__form">
          <div className="modal__form--input-group">
            <label htmlFor="sequenceName" className="modal__form--label">Nom de la séquence</label>
            <input 
              type="text" 
              name="sequenceName" 
              id="sequenceName" 
              placeholder="Nom de la séquence" 
              ref={sequenceNameRef} 
              className="modal__form--input"
            />
          </div>
          <div className="modal__actions">
            <button type="submit" className="modal__button modal__confirm" disabled={isSubmitting}>Créer</button>
            <button type="button" className="modal__button modal__cancel" onClick={onCancel}>Annuler</button>
          </div>
        </form>
      </div>
      <div className="modal__overlay" onClick={onCancel}></div>
    </div>
  );
}

export default CreateSequenceModal;
