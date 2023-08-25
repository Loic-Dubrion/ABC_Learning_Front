// Importation des modules nécessaires
import React from 'react';

// Importations pour le routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importations pour Redux
import { Provider } from 'react-redux';
import store from '../../globalRedux/store'; 

// Importations des composants de pages
import Home from './Home/Home'; 
import CreateSession from './CreateSession/CreateSession'; 

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

          {/* Autres routes peuvent être ajoutées ici si nécessaire */}

        </Routes>
      </Router>
    </Provider>
  );
}

// Exportation par défaut du composant App pour l'utiliser ailleurs dans l'application
export default App;
