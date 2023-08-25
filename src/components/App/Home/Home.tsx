import React from 'react';
import Header from '../Header/Header'; // Assurez-vous d'avoir le bon chemin d'importation
import Footer from '../Footer/Footer'; // Assurez-vous d'avoir le bon chemin d'importation

const Home = () => {
    return (
        <div className="home">
          <Header logo="/logo.png" title="ABC Learning" subtitle="Création de scénario" />
            
            <div className="home-content">
                <p>
                  Vous devez préparer un nouveau cours et vous aimeriez innover 
                  en intégrant des activités d’apprentissage, mais vous ne savez
                   pas quoi et comment faire? Ou alors vous êtes responsable 
                   d’une formation, d’un module dont vous aimeriez repenser 
                  l’organisation avec les enseignants, mais vous ne savez pas 
                  comment vous y prendre ? Alors l’application en ligne 
                  « ABC Learning » peuvent vous aider.
                </p>
            </div>
            
            <Footer />
        </div>
    );
}

export default Home;
