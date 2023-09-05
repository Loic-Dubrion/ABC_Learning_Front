export interface CreateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: CreateSessionModalData) => void;
  cardId: number;
  toolId: number;
  toolName: string;
}

export interface CreateSessionModalData {
  name: string;
  sequence_id: number;
  card_id: number;
  tool_id: number;
  comments: string;
  time: number;
  is_face_to_face: boolean;
  is_group_work: boolean;
  equipment: string;
}
