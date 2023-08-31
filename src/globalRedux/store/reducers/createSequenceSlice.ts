// createequenceSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

interface CreateSequenceData {
  id: number;
  name: string;
}

interface CreateSequenceState {
  data: CreateSequenceData | null;
}

const initialState: CreateSequenceState = {
  data: null,
};

const sequenceSlice = createSlice({
  name: 'sequence',
  initialState,
  reducers: {
    setSequenceData: (state, action: PayloadAction<CreateSequenceData>) => {
      state.data = action.payload;
      console.log("setSequenceData action received with payload:", action.payload);
    },
    clearSequenceData: state => {
      state.data = null;
    }
  },
});

export const selectSequence = (state: RootState) => state.createSequence.data;

export const { setSequenceData, clearSequenceData } = sequenceSlice.actions;

export default sequenceSlice.reducer;
