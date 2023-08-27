// types/SequenceTypes.ts

export type Sequence = {
  id: number;
  name: string;
  user_id: number;
  created_at: string;
  updated_at: string | null;
};

export type SequenceState = {
  sequences: Sequence[];
  loading: boolean;
  error: string | null;
};
