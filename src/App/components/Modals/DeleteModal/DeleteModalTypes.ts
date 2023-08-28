export interface DeleteModalProps {
  isOpen: boolean;
  itemName?: string; // rendu optionnel
  modalType?: 'DELETE_SEQUENCE' | 'DELETE_SESSION' | null;
  onConfirm: () => void;
  onCancel: () => void;
}
