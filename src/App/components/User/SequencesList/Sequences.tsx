import React, { useEffect } from 'react';
import './Sequences.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../../utils/axios';
import { Sequence } from './SequencesTypes';
import { RootState } from '../../../../globalRedux/store/reducers/index';
import { fetchSequencesStart, fetchSequencesSuccess, fetchSequencesFailure } from '../../../../globalRedux/store/reducers/sequencesSlice';

const Sequences: React.FC = () => {
  const dispatch = useDispatch();
  const sequences = useSelector((state: RootState) => state.sequences.sequences);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchSequences = async () => {
      if (userId) {
        dispatch(fetchSequencesStart());
        try {
          const response = await axiosInstance.get(`/user/${userId}/sequence`);
          dispatch(fetchSequencesSuccess(response.data));
        } catch (error) {
          dispatch(fetchSequencesFailure(error.message));
        }
      }
    }

    fetchSequences();
  }, [userId, dispatch]);

  return (
    <div className="sequences">
      <h2 className="sequences__title">Mes séquences</h2>
      {sequences.map((sequence: Sequence) => (
        <Link key={sequence.id} to={`/sequence/${sequence.id}`} className="sequences__link">
          <div className="sequences__item">
            <h3 className="sequences__item-name">{sequence.name}</h3>
            <p className="sequences__item-created">Created: {new Date(sequence.created_at).toLocaleString()}</p>
            <p className="sequences__item-updated">Updated: {sequence.updated_at ? new Date(sequence.updated_at).toLocaleString() : "Not updated"}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Sequences;
