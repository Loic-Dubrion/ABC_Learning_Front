// UpdateSessionModal.tsx
import React, { useEffect, useState } from 'react';
import { FormModalProps, FormData } from './UpdateSessionModalTypes';

import '../Modals.scss';

// Composant représentant un formulaire modal pour la mise à jour des données de la session.
const FormModal: React.FC<FormModalProps> = ({ isOpen, onSubmit, onCancel, initialData }) => {
  const [data, setData] = useState<FormData>({
    name: '',
    sequence_id: 0,
    card_id: 0,
    activity_id: 0,
    comments: '',
    time: 0,
    is_face_to_face: false,
    is_group_work: false,
    equipment: '',
  });

  // Met à jour l'état local lorsque les données initiales changent
  useEffect(() => {
    if (initialData) {
      const adaptedData: FormData = {
        activity_id: initialData.activity_id,
        name: initialData.session_name,
        comments: initialData.comments,
        time: initialData.time,
        is_face_to_face: initialData.is_face_to_face,
        is_group_work: initialData.is_group_work,
        equipment: initialData.equipment,
        sequence_id: 0,
        card_id: 0
      };
      setData(adaptedData);    }
  }, [initialData]);

  // Si la modal n'est pas ouverte, ne renvoyez rien.
  if (!isOpen) {
    return null;
  }

  // Gestionnaire pour mettre à jour l'état lorsqu'un champ de formulaire est modifié.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // Gestionnaire pour la soumission du formulaire.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">Modification de la session</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          {/* Champ pour le nom de la session */}
          <div className="modal__form--input-group">
            <label className="modal__form--label" htmlFor="name">Nom</label>
            <input className="modal__form--input" type="text" name="name" value={data.name} onChange={handleChange} />
          </div>
          {/* Champ pour les commentaires de la session */}
          <div className="modal__form--input-group">
            <label className="modal__form--label" htmlFor="comments">Commentaires</label>
            <textarea className="modal__form--input" name="comments" value={data.comments} onChange={handleChange}></textarea>
          </div>
          {/* Champ pour la durée de la session */}
          <div className="modal__form--input-group">
            <label className="modal__form--label" htmlFor="time">Durée</label>
            <input className="modal__form--input" type="number" name="time" value={data.time} onChange={handleChange} />
          </div>
          {/* Checkbox pour déterminer si la session est en présentiel */}
          <div className="modal__form--input-group">
            <label className="modal__form--label">
              <input type="checkbox" name="is_face_to_face" checked={data.is_face_to_face} onChange={handleChange} />
              Présentiel
            </label>
          </div>
          {/* Checkbox pour déterminer si la session est un travail de groupe */}
          <div className="modal__form--input-group">
            <label className="modal__form--label">
              <input type="checkbox" name="is_group_work" checked={data.is_group_work} onChange={handleChange} />
              Travail de groupe
            </label>
          </div>
          {/* Champ pour l'équipement nécessaire pour la session */}
          <div className="modal__form--input-group">
            <label className="modal__form--label" htmlFor="equipment">Equipement</label>
            <input className="modal__form--input" type="text" name="equipment" value={data.equipment} onChange={handleChange} />
          </div>
          {/* Boutons pour soumettre ou annuler la mise à jour */}
          <div className="modal__actions">
            <button className="modal__cancel" onClick={onCancel}>Annuler</button>
            <button className="modal__confirm" type="submit">Soumettre</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormModal;
