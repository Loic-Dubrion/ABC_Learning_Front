// slices/sequenceSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';  // Importez le RootState depuis l'emplacement approprié

// Type pour une séquence individuelle
export interface Sequence {
  id: number;
  name: string;
  user_id: number;
  created_at: string;
  updated_at: string | null;
}

// État initial pour la tranche 'sequences'
interface SequencesState {
  sequences: Sequence[];
  loading: boolean;
  error: string | null;
}

const initialState: SequencesState = {
  sequences: [],
  loading: false,
  error: null
};

const sequencesSlice = createSlice({
  name: 'sequences',
  initialState,
  reducers: {
    fetchSequencesStart: (state) => {
      state.loading = true;
      state.error = null;
      state.sequences = [];
    },
    fetchSequencesSuccess: (state, action: PayloadAction<Sequence[]>) => {
      state.loading = false;
      state.sequences = action.payload;
      state.error = null;
    },
    fetchSequencesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.sequences = [];
      state.error = action.payload;
    },
  }
});

// Sélecteurs
export const selectAllSequences = (state: RootState) => state.sequences.sequences;
export const selectSequenceById = (state: RootState, sequenceId: number) => 
  state.sequences.sequences.find(sequence => sequence.id === sequenceId);

// Exportation des actions
export const {
  fetchSequencesStart,
  fetchSequencesSuccess,
  fetchSequencesFailure
} = sequencesSlice.actions;

// Exportation du reducer
export default sequencesSlice.reducer;
