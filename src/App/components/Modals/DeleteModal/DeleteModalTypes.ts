export interface DeleteModalProps {
  isOpen: boolean;
  itemName?: string;
  modalType?: 'DELETE_SEQUENCE' | 'DELETE_SESSION' | null;
  onConfirm: () => void;
  onCancel: () => void;
}
