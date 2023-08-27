// Import des outils nécessaires de redux-toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Définition du type pour l'état de l'authentification
type AuthState = {
  accessToken: string | null;    // Token pour l'accès
  refreshToken: string | null;   // Token pour le rafraîchissement de l'accès
};

// Récupération initiale du refreshToken depuis le localStorage
const initialState: AuthState = {
  accessToken: null,
  refreshToken: localStorage.getItem('refreshToken'),
};

// Création d'une "slice" pour l'authentification. 
// Une "slice" inclut les réducteurs et les actions.
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state: AuthState, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      // Sauvegarde du refreshToken dans le localStorage lors de la mise à jour
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    clearTokens: (state: AuthState) => {
      state.accessToken = null;
      state.refreshToken = null;
      // Suppression des tokens du localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});

// Export des actions pour être utilisées dans les composants ou autres parties de l'application
export const { setTokens, clearTokens } = authSlice.actions;

// Export du réducteur pour être ajouté au store Redux global
export default authSlice.reducer;
