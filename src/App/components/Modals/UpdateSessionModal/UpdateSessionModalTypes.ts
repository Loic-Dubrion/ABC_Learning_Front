// UpdateSessionModalTypes.ts
import { Session } from '../../User/SequenceDetail/SequenceTypes'

export interface FormModalProps {
  isOpen: boolean;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  initialData?: Session | null;
}

export interface FormData {
  sequence_id: number;
  card_id: number;
  activity_id: number;
  name: string;
  comments: string;
  time: number;
  is_face_to_face: boolean;
  is_group_work: boolean;
  equipment: string;
}
