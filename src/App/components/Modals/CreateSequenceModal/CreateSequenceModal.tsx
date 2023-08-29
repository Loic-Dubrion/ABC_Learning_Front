import React, { useState } from 'react';
import { CreateSequenceModalProps } from './CreateSequenceModalTypes';

import '../Modals.scss';

const InputModal: React.FC<CreateSequenceModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  const [name, setName] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm(name);
    setName(''); // Réinitialise le champ de saisie après confirmation
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <form onSubmit={e => e.preventDefault()}>
          <label>
            Nom:
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Entrez un nom"
            />
          </label>
          <div className="modal__actions">
            <button className="modal__cancel" onClick={onCancel}>Annuler</button>
            <button className="modal__confirm" onClick={handleConfirm}>Confirmer</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InputModal;
