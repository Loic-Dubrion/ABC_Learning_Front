// redux/slices/menuSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    isOpen: false
  },
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeMenu: (state) => {
      state.isOpen = false;
    },
    openMenu: (state) => {
      state.isOpen = true;
    }
  }
});

export const { toggleMenu, closeMenu, openMenu } = menuSlice.actions;
export default menuSlice.reducer;
