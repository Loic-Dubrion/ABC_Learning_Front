// Importation des modules nécessaires
import React from 'react';

// Importations pour le routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importations pour Redux
import { Provider } from 'react-redux';
import store from '../globalRedux/store'; 

// Importations des composants de pages
import Home from './Pages/Home/Home'; 
import CreateSequence from './Pages/Sequence/CreateSequence';
import Profil from './Pages/Profil/Profil'; 
import Sequence from './Pages/Sequence/Sequence';

// Composant principal App
function App() {
  return (
    // Fournit le store Redux à l'ensemble de l'application
    <Provider store={store}>

      {/* Initialisation du routing avec React Router */}
      <Router>

        {/* Définition des routes */}
        <Routes>

          {/* Route pour la page d'accueil */}
          <Route path="/" element={<Home />} />
          {/* Route pour la page de création de session */}
          <Route path="/create-sequence" element={<CreateSequence />} />
          {/* Route pour la page profil */}
          <Route path='/profil' element={<Profil />} />
          {/* Route pour la page de détails de la séquence */}
          <Route path="profil/user/:userId/sequence/:sequenceId" element={<Sequence />} />

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
