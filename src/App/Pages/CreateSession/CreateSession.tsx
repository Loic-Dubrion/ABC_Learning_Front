import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CardDesk from '../../components/CardDesk/CardDesk';

function CreateSession() {
  return (
    <div className="create-session">
      <Header logo="/logo.png" title="ABC Learning" subtitle="Création de scénario" />
      <CardDesk />
      <Footer />
    </div>
  );
}

export default CreateSession;
