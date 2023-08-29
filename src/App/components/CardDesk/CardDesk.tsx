import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axios';

// Components
import CardRecto from './CardRecto/CardRecto';
import CardVerso from './CardVerso/CardVerso';

// Redux
import { useAppDispatch, useAppSelector } from '../../../globalRedux/hooks';
import { setData } from '../../../globalRedux/store/reducers/cardRectoSlice';
import { setActiveCard } from '../../../globalRedux/store/reducers/cardVersoSlice';
import { CardRectoData } from './CardRecto/CardRectoTypes';

function CardDesk() {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cardRecto.data);
  const cardVersoData = useAppSelector((state) => state.cardVerso.data);
  
  const [error, setError] = useState<string | null>(null);
  
  // Cette variable d'état suit l'identifiant de la carte active.
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/storyBoard/cards');
        dispatch(setData(response.data));
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setError('Une erreur s\'est produite lors de la récupération des cartes.');
      }
    }

    fetchData();
  }, [dispatch]);

  const handleCardClick = async (cardId: number) => {
    if (activeCardId === cardId) {
      setActiveCardId(null);
    } else {
      try {
        const response = await axios.get(`/storyboard/cards/${cardId}`);
        dispatch(setActiveCard(response.data[0].get_activities));
        setActiveCardId(cardId);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setError('Une erreur s\'est produite lors du changement de carte.');
      }
    }
  };

  return (
    <div className="card-desk">
      {error && <p className="error-message">{error}</p>}
      {cards.map((item : CardRectoData) => (
        <div key={item.id} onClick={() => handleCardClick(item.id)}>
          {(activeCardId === item.id) ? (
            <CardVerso 
            data={cardVersoData} 
            onToolClick={(cardId, toolId) => console.log(`Card ID: ${cardId}, Tool ID: ${toolId}`)} 
            />
          ) : (
            <CardRecto
              name={item.name}
              activities={item.activities}
              comments={item.comments}
              className={`card-desk--cardId=${item.id} ${item.name.toLowerCase()}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default CardDesk;
