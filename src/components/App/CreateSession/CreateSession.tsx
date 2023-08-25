import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CardDesk from '../CardDesk/CardDesk';

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
