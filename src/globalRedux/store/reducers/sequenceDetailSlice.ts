import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index'; 
import { SequenceDetail } from '../../../App/components/User/SequenceDetail/SequenceTypes';

interface SequenceDetailState {
  sequence: SequenceDetail | null;
  newSequenceId: number | null;
  newSequenceName: string; 
  loading: boolean;
  error: string | null;
}

const initialState: SequenceDetailState = {
  sequence: null,
  newSequenceId: null,
  newSequenceName: '',
  loading: false,
  error: null
};

const sequenceDetailSlice = createSlice({
  name: 'sequenceDetail',
  initialState,
  reducers: {
    setNewSequenceIdAndName: (state, action: PayloadAction<{ id: number, name: string }>) => {
      state.newSequenceId = action.payload.id;
      state.newSequenceName = action.payload.name; 
    },
    fetchSequenceDetailStart: (state) => {
      state.loading = true;
      state.error = null;
      state.sequence = null;
    },
    fetchSequenceDetailSuccess: (state, action: PayloadAction<SequenceDetail>) => {
      state.loading = false;
      state.sequence = action.payload;
      state.error = null;
    },
    fetchSequenceDetailFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.sequence = null;
      state.error = action.payload;
    },
  }
});

// Sélecteurs
export const selectSequenceDetail = (state: RootState) => state.sequenceDetail.sequence;

// Exportation des actions
export const {
  fetchSequenceDetailStart,
  fetchSequenceDetailSuccess,
  fetchSequenceDetailFailure,
  setNewSequenceIdAndName, 
} = sequenceDetailSlice.actions;

// Exportation du reducer
export default sequenceDetailSlice.reducer;
