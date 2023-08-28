import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Sequence from '../../components/User/SequenceDetail/Sequence';

function CreateSession() {
  return (
    <div className="create-session">
      <Header logo="/logo.png" title="ABC Learning" subtitle="Modifier ou imprimer un Scénario" />
      <Sequence />
      <Footer />
    </div>
  );
}

export default CreateSession;
