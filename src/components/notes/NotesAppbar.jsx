import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { startSaveNote } from '../../actions/notes.actions';

const NotesAppbar = () => {
  const dispatch = useDispatch();

  const { active } = useSelector((state) => state.notes);

  const noteDate = moment(active.date);

  const handleSaveNote = () => {
    // console.log(active);
    dispatch(startSaveNote(active));
  };

  return (
    <div className='notes__appbar'>
      <span>{noteDate.format('Do MMMM yyyy')}</span>

      <div>
        <button className='btn'>Picture</button>
        <button className='btn' onClick={handleSaveNote}>
          Save
        </button>
      </div>
    </div>
  );
};

export default NotesAppbar;
