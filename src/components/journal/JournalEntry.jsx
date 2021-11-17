import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { activeNote } from '../../actions/notes.actions';

const JournalEntry = ({ id, date, title, body, url }) => {
  const dispatch = useDispatch();

  const noteDate = moment(date);

  const handleEntryClick = () => {
    // dispatch
    dispatch(activeNote(id, { date, title, body, url }));
  };

  return (
    <div
      className='journal__entry animate__animated animate__fadeIn animate__faster'
      onClick={handleEntryClick}>
      {url && (
        <div className="journal__entry-picture">
          <img src={`${url}`} alt="journal miniature picture" />
        </div>
      )}
      <div className='journal__entry-body'>
        <p className='journal__entry-title'>{title}</p>
        <p className='journal__entry-content'>{body}</p>
      </div>

      <div className='journal__entry-date-box'>
        <span>{noteDate.format('dddd')}</span>
        <h4>{noteDate.format('Do')}</h4>
      </div>
    </div>
  );
};

export default JournalEntry;
