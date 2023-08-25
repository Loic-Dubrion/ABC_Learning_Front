// Import des outils nécessaires de redux-toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Définition du type pour l'état de l'authentification
type AuthState = {
  accessToken: string | null;    // Token pour l'accès
  refreshToken: string | null;   // Token pour le rafraîchissement de l'accès
};

// État initial pour la partie authentification du store Redux
const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
};

// Création d'une "slice" pour l'authentification. 
// Une "slice" inclut les réducteurs et les actions.
const authSlice = createSlice({
  name: 'auth',                          // Nom de la slice
  initialState,                          // État initial
  reducers: {
    // Action pour définir les tokens (d'accès et de rafraîchissement)
    setTokens: (state: AuthState, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    // Action pour effacer/clear les tokens
    clearTokens: (state: AuthState) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

// Export des actions pour être utilisées dans les composants ou autres parties de l'application
export const { setTokens, clearTokens } = authSlice.actions;

// Export du réducteur pour être ajouté au store Redux global
export default authSlice.reducer;
