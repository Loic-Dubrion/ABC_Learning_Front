import React from 'react';
import { DeleteModalProps } from './DeleteModalTypes';

import '../Modals.scss';

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, itemName, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <p>Êtes-vous sûr de vouloir supprimer {itemName}?</p>
        <div className="modal__actions">
          <button className="modal__cancel" onClick={onCancel}>Annuler</button>
          <button className="modal__confirm" onClick={onConfirm}>Supprimer</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
