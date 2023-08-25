import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import './CardDesk.scss';

// Components
import CardRecto from './CardRecto/CardRecto';
import CardVerso from './CardVerso/CardVerso';

// Redux
import { useAppDispatch, useAppSelector } from '../../../globalRedux/hooks';
import { setData } from '../../../globalRedux/store/reducers/cardRectoSlice';
import { setActiveCard } from '../../../globalRedux/store/reducers/cardVersoSlice';
import { CardData } from '../../../globalRedux/store/reducers/cardRectoSlice';

function CardDesk() {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cardRecto.data) as CardData[];
  const isCardVersoActive = useAppSelector((state) => state.cardVerso.active);
  const cardVersoData = useAppSelector((state) => state.cardVerso.data); // Déplacé ici
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/storyBoard/cards');
        console.log('Data récupérée:', response.data);
        dispatch(setData(response.data));
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setError('Une erreur s\'est produite lors de la récupération des cartes.');
      }
    }

    fetchData();
  }, [dispatch]);

  const handleCardClick = async (cardId: number) => {
    try {
      const response = await axios.get(`/storyboard/cards/${cardId}`);
      console.log(response.data);
      // Si la réponse est structurée comme `[ { get_activities: { ... } } ]`,
      // alors, extraire `get_activities` avant de l'envoyer au reducer :
      dispatch(setActiveCard(response.data[0].get_activities));
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      setError('Une erreur s\'est produite lors du changement de carte.');
    }
};


  let content;

  if (isCardVersoActive) {
    content = <CardVerso data={cardVersoData} onToolClick={(cardId, toolId) => console.log(`Card ID: ${cardId}, Tool ID: ${toolId}`)} />;
  } else {
    content = (
      <div className="card-desk">
        {error && <p className="error-message">{error}</p>}
        {cards.map((item) => (
          <div key={item.id} onClick={() => handleCardClick(item.id)}>
            <CardRecto
              name={item.name}
              activities={item.activities}
              comments={item.comments}
              className={`card-desk--cardId=${item.id}`}
            />
          </div>
        ))}
      </div>
    );
  }

  return content;
}

export default CardDesk;
