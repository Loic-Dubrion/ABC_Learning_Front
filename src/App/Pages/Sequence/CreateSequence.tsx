import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CardDesk from '../../components/CardDesk/CardDesk';
import Sequence from '../../components/User/SequenceDetail/Sequence';

function CreateSequence() {

  return (
    <div className="create-sequence">
      <Header logo="/logo.png" title="ABC Learning" subtitle="Création de scénario" />
      <CardDesk />
      <Sequence />

      <Footer />
    </div>
  );
}


export default CreateSequence;
