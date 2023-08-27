// pages/MesSequences.tsx

import React from 'react';
import Header from '../../components/Header/Header'; 
import Footer from '../../components/Footer/Footer'; 
import Sequences from '../../components/User/SequencesList/Sequences'; 

const Profil = () => {
    return (
        <div className="sequences">
            <Header logo="/logo.png" title="ABC Learning" subtitle="Mes Séquences" />

            <div className="sequences-content">
                <Sequences />
            </div>

            <Footer />
        </div>
    );
}

export default Profil;
