import React from 'react';
import { useSelector } from 'react-redux';
import { selectSequence } from '../../../../globalRedux/store/reducers/createSequenceSlice';
import './CreateSequence.scss'

const CreateSequenceDisplay: React.FC = () => {
  const sequence = useSelector(selectSequence);
  console.log( 'SEQUENCE:', sequence)

  if (!sequence) return null;

  return (
    <div className="sequence-display">
      <h2 className="sequence-display__title">{sequence.name}</h2>
    </div>
  );
}

export default CreateSequenceDisplay;
