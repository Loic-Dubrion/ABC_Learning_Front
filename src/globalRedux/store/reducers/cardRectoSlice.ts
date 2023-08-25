// Importation des dépendances nécessaires depuis la bibliothèque Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Importation du type RootState qui donne accès au type global de l'état de l'application
import { RootState } from './index';

// Importation du type spécifique pour la data de la carte recto depuis les types de composant
import { CardRectoData } from '../../../components/App/CardDesk/CardRecto/CardRectoTypes';

// Définition de la forme de l'état pour la tranche 'cardRecto' du store Redux
interface CardRectoState {
  data: CardRectoData[];
}

// État initial pour la tranche 'cardRecto'
const initialState: CardRectoState = {
  data: [], // La donnée est initialement un tableau vide
};

// Création de la tranche 'cardRecto' en utilisant 'createSlice' de Redux Toolkit
const cardRectoSlice = createSlice({
  name: 'cardRecto', // Nom de la tranche
  initialState, // État initial
  reducers: { // Reducers pour cette tranche
    setData: (state, action: PayloadAction<CardRectoData[]>) => {
      // Met à jour l'état avec les données fournies
      state.data = action.payload;
    },
  },
});

// Un sélecteur qui permet de récupérer une carte par son ID
export const selectCardById = (state: RootState, cardId: number) => 
  state.cardRecto.data.find(card => card.id === cardId);

// Exportation des actions pour être utilisées dans les composants
export const { setData } = cardRectoSlice.actions;

// Exportation du reducer par défaut pour être combiné à d'autres reducers dans le store
export default cardRectoSlice.reducer;
