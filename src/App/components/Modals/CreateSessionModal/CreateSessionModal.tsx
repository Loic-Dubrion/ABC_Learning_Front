// CreateSessionModal.tsx
import React, { useState } from 'react';
import { CreateSessionModalProps, CreateSessionModalData } from './CreateSessionModalTypes';

const CreateSessionModal: React.FC<CreateSessionModalProps> = ({ isOpen, onClose, onConfirm, cardId, toolId, toolName }) => {
  const [formData, setFormData] = useState<CreateSessionModalData>({
    name: toolName,
    sequence_id: 8,  // TODO: Find a way to provide this dynamically
    card_id: cardId,
    tool_id: toolId,
    comments: "",
    time: 0,
    is_face_to_face: false,
    is_group_work: false,
    equipment: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(formData);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="tool-modal">
      <div className="modal-content">
        <h2>{toolName}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Comments</label>
            <textarea name="comments" onChange={handleChange} value={formData.comments}></textarea>
          </div>

          <button type="submit">Confirm</button>
          <button type="button" onClick={onClose}>Close</button>
          
        </form>
      </div>
      <div className="modal-overlay" onClick={onClose}></div>
    </div>
  );
}

export default CreateSessionModal;
