// slices/sequenceSlice.ts
import { Sequence, SequencesState } from '../../../App/components/User/SequencesList/SequencesTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

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
  fetchSequencesFailure,
} = sequencesSlice.actions;

// Exportation du reducer
export default sequencesSlice.reducer;
