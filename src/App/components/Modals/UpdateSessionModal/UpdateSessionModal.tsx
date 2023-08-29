// UpdateSessionModal.tsx
import React, { useState } from 'react';
import { FormModalProps, FormData } from './UpdateSessionModalTypes';

import '../Modals.scss';

const FormModal: React.FC<FormModalProps> = ({ isOpen, onSubmit, onCancel }) => {
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

  if (!isOpen) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">Modification de la session</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__form--input-group">
            <label className="modal__form--label" htmlFor="name">Nom</label>
            <input className="modal__form--input" type="text" name="name" value={data.name} onChange={handleChange} />
          </div>
          <div className="modal__form--input-group">
            <label className="modal__form--label" htmlFor="comments">Commentaires</label>
            <textarea className="modal__form--input" name="comments" value={data.comments} onChange={handleChange}></textarea>
          </div>
          <div className="modal__form--input-group">
            <label className="modal__form--label" htmlFor="duration">Durée</label>
            <input className="modal__form--input" type="number" name="duration" value={data.time} onChange={handleChange} />
          </div>
          <div className="modal__form--input-group">
            <label className="modal__form--label">
              <input type="checkbox" name="is_face_to_face" checked={data.is_face_to_face} onChange={handleChange} />
              Présentiel
            </label>
          </div>
          <div className="modal__form--input-group">
            <label className="modal__form--label">
              <input type="checkbox" name="is_group_work" checked={data.is_group_work} onChange={handleChange} />
              Travail de groupe
            </label>
          </div>
          <div className="modal__form--input-group">
            <label className="modal__form--label" htmlFor="equipment">Equipement</label>
            <input className="modal__form--input" type="text" name="equipment" value={data.equipment} onChange={handleChange} />
          </div>
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
