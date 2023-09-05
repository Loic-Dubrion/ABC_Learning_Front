export type Session = {
  session_id: number;
  session_name: string;
  activity_id: number;
  card_name: string;
  tool_name: string;
  comments: string;
  time: number;
  is_face_to_face: boolean;
  is_group_work: boolean;
  equipment: string;
  level_name: string;
};

export type Sequence = {
  sequence_id: number;
  sequence_name: string;
  sessions: Session[];
};

export type SequenceState = {
  sequences: Sequence[];
  currentSequence?: Sequence;
  loading: boolean;
  error?: string;
};