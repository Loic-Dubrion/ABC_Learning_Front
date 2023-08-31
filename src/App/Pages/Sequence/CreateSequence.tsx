import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CardDesk from '../../components/CardDesk/CardDesk';
import CreateSequenceDisplay from '../../components/User/CreateSequence/CreateSequence';
import './Sequence.scss';

function CreateSequence() {
  return (
    <div className="create-sequence">
      <Header logo="/logo.png" title="ABC Learning" subtitle="Création de scénario" />
      <div className="content">
        <CardDesk />
        <CreateSequenceDisplay />
      </div>
      <Footer />
    </div>
  );
}

export default CreateSequence;
