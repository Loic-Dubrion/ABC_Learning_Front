import React from 'react';
import Header from '../../components/Header/Header'; 
import Footer from '../../components/Footer/Footer'; 
import Sequences from '../../components/User/SequencesList/Sequences'; 
import ProfilInfos from '../../components/User/Profil/Profil';
import Tabs from '../../components/User/Tabs/Tabs';

const username = localStorage.getItem('username');

const Profil = () => {
    const tabs = [
      { label: "Mes Scénarii", component: <Sequences /> },
      { label: "Profil Infos", component: <ProfilInfos /> },
    ];

    return (
        <div className="profil">
            <Header logo="/logo.png" title="ABC Learning" subtitle={`Hi, ${username}!`} />

            <div className='profil-content'>
                <Tabs tabs={tabs} />
            </div>

            <Footer />
        </div>
    );
}

export default Profil;
