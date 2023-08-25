import './App.scss';
import { Provider } from 'react-redux';
import store from '../../globalRedux/store'; // Votre chemin d'accès au store peut varier
import Header from './Header/Header';
import Footer from './Footer/Footer';
import CardDesk from './CardDesk/CardDesk';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header logo="/logo.png" title="ABC Learning" subtitle="Création de scénario" />
        <CardDesk />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
