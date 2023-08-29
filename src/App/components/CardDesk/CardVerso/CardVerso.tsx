import React from 'react';
import './CardVerso.scss';
import { CardVersoData, Tool, ToolCategory } from './CardVersoTypes';

interface CardVersoProps {
  data: CardVersoData | null;  // Ajusté pour potentiellement gérer des données nulles
  onToolClick: (cardId: number, toolId: number) => void;
}

const CardVerso: React.FC<CardVersoProps> = ({ data, onToolClick }) => {
  if (!data) {
    return <p>Loading data or data not available...</p>;
  }

  return (
    <div className="card-verso" >
      <h1>{data.card_name}</h1>

      <div className="tool-categories"> {/* Conteneur pour toutes les catégories d'outils */}
        {data.tool_categories.map((category) => (
          <div key={category.tool_category_id} className="tool-category"> {/* Chaque catégorie dans une div */}
            <h2>{category.tool_category_name}</h2>
            <ul>
              {category.tools.map((tool) => (
                <li key={tool.tool_id}>
                  <button 
                    onClick={() => onToolClick(data.card_id, tool.tool_id)}
                  >
                    {tool.tool_name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardVerso;
