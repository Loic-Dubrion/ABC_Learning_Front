import React from 'react';
import { DeleteModalProps } from './DeleteModalTypes';

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, itemName, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="delete-modal">
      <div className="delete-modal__content">
        <p>Êtes-vous sûr de vouloir supprimer {itemName}?</p>
        <div className="delete-modal__actions">
          <button className="delete-modal__cancel" onClick={onCancel}>Annuler</button>
          <button className="delete-modal__confirm" onClick={onConfirm}>Supprimer</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
