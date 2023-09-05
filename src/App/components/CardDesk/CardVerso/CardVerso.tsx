import React, { useState } from 'react';
import './CardVerso.scss';
import { CardVersoData } from './CardVersoTypes';
import CreateSessionModal from '../../Modals/CreateSessionModal/CreateSessionModal';

interface CardVersoProps {
  data: CardVersoData | null;
}

const CardVerso: React.FC<CardVersoProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [selectedToolId, setSelectedToolId] = useState<number | null>(null);

  const handleToolClick = (cardId: number, toolId: number) => {
    setSelectedCardId(cardId);
    setSelectedToolId(toolId);
    setIsModalOpen(true);
  }

  const handleModalConfirm = (formData: any) => {
      console.log('ouverture modal');
    setIsModalOpen(false);
  }

  if (!data) {
    return <p>Loading data or data not available...</p>;
  }

  return (
    <div className="card-verso">
      <h1>{data.card_name}</h1>

      <div className="tool-categories">
        {data.tool_categories.map((category) => (
          <div key={category.tool_category_id} className="tool-category">
            <h2>{category.tool_category_name}</h2>
            <ul>
              {category.tools.map((tool) => (
                <li key={tool.tool_id}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToolClick(data.card_id, tool.tool_id);
                    }}
                  >
                    {tool.tool_name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {selectedCardId && selectedToolId && (
        <CreateSessionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleModalConfirm}
          cardId={selectedCardId}
          toolId={selectedToolId}
          toolName={(data.tool_categories.flatMap(cat => cat.tools).find(tool => tool.tool_id === selectedToolId) || {}).tool_name || ''}
        />
      )}
    </div>
  );
};

export default CardVerso;
