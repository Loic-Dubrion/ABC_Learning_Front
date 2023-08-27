// Importation des modules nécessaires
import React from 'react';

// Importations pour le routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importations pour Redux
import { Provider } from 'react-redux';
import store from '../globalRedux/store'; 

// Importations des composants de pages
import Home from './Pages/Home/Home'; 
import CreateSession from './Pages/CreateSession/CreateSession';
import Profil from './Pages/Profil/Profil'; 

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
          <Route path="/create-session" element={<CreateSession />} />

          {/* Route pour la page profil */}
          <Route path='/profil' element={<Profil />} />

        </Routes>
      </Router>
    </Provider>
  );
}

// Exportation par défaut du composant App pour l'utiliser ailleurs dans l'application
export default App;
