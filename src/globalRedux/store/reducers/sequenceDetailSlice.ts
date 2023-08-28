import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index'; // Assurez-vous d'avoir le bon chemin d'importation
import { SequenceDetail } from '../../../App/components/User/SequenceDetail/SequenceTypes'; // Ajustez le chemin si nécessaire

// État initial pour la tranche 'sequenceDetail'
interface SequenceDetailState {
  sequence: SequenceDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: SequenceDetailState = {
  sequence: null,
  loading: false,
  error: null
};

const sequenceDetailSlice = createSlice({
  name: 'sequenceDetail',
  initialState,
  reducers: {
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
} = sequenceDetailSlice.actions;

// Exportation du reducer
export default sequenceDetailSlice.reducer;
