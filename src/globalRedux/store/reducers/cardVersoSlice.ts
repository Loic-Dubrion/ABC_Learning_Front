import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Import des interfaces pour les données du verso des cartes
import { CardVersoData } from '../../../App/CardDesk/CardVerso/CardVersoTypes';

// L'interface pour l'état de la tranche (slice) 'cardVerso'
interface CardVersoState {
  data: CardVersoData | null; // Les données du verso de la carte actuellement active ou null si aucune n'est active
  active: boolean; // Indique si le verso de la carte est actuellement affiché
}

// État initial pour la tranche (slice) 'cardVerso'
const initialState: CardVersoState = {
  data: null, // Aucune carte active au départ
  active: false, // Le verso de la carte n'est pas affiché au départ
};

export const cardVersoSlice = createSlice({
  name: 'cardVerso', // Le nom de la tranche (slice)
  initialState, // Utilisation de l'état initial défini précédemment
  reducers: {
    // L'action pour définir et activer le verso d'une carte spécifique
    setActiveCard: (state, action: PayloadAction<CardVersoData>) => { 
      state.data = action.payload; // Mise à jour des données avec celles fournies
      state.active = true; // Indique que le verso de la carte est maintenant actif
    },
    // L'action pour réinitialiser et désactiver le verso de la carte
    resetActiveCard: (state) => {
      state.data = null; // Suppression des données actuelles
      state.active = false; // Indique que le verso de la carte est maintenant inactif
    }
  },
});

// Export des actions pour être utilisées dans les composants ou autres parties de l'application
export const { setActiveCard, resetActiveCard } = cardVersoSlice.actions;

// Export du reducer pour être combiné avec d'autres reducers dans le store
export default cardVersoSlice.reducer;
