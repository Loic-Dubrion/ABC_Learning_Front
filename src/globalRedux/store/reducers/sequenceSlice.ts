// SequenceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sequence, SequenceState, Session } from '../../../App/components/User/CreateSequence/CreateSequenceType';

const initialState: SequenceState = {
  sequences: [],
  loading: false
};

const sequenceSlice = createSlice({
  name: 'sequence',
  initialState,
  reducers: {
    // Ajouter une séquence
    addSequence: (state, action: PayloadAction<Sequence>) => {
      state.sequences.push(action.payload);
    },

    // Supprimer une séquence par ID
    removeSequence: (state, action: PayloadAction<number>) => {
      state.sequences = state.sequences.filter(seq => seq.sequence_id !== action.payload);
    },

    // Ajouter une session à une séquence spécifique
    addSessionToSequence: (state, action: PayloadAction<{ sequenceId: number, session: Session }>) => {
      const sequence = state.sequences.find(seq => seq.sequence_id === action.payload.sequenceId);
      if (sequence) {
        sequence.sessions.push(action.payload.session);
      }
    },

    // Supprimer une session d'une séquence spécifique
    removeSessionFromSequence: (state, action: PayloadAction<{ sequenceId: number, sessionId: number }>) => {
      const sequence = state.sequences.find(seq => seq.sequence_id === action.payload.sequenceId);
      if (sequence) {
        sequence.sessions = sequence.sessions.filter(session => session.session_id !== action.payload.sessionId);
      }
    },

    // Définir une séquence actuelle pour consultation ou édition
    setCurrentSequence: (state, action: PayloadAction<number>) => {
      state.currentSequence = state.sequences.find(seq => seq.sequence_id === action.payload);
    },

    // Effacer la séquence actuelle
    clearCurrentSequence: (state) => {
      state.currentSequence = undefined;
    },

    startLoading: (state) => {
      state.loading = true;
    },

    loadingFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Exporter les actions pour utilisation dans des composants ou d'autres fichiers
export const { 
  addSequence, 
  removeSequence, 
  addSessionToSequence, 
  removeSessionFromSequence, 
  setCurrentSequence, 
  clearCurrentSequence,
  startLoading,
  loadingFailed, 
} = sequenceSlice.actions;

// Exporter le reducer pour l'ajouter au store global
export default sequenceSlice.reducer;
