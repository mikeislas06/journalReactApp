import React from 'react';
import { useSelector } from 'react-redux';

// Components
import NoteScreen from '../notes/NoteScreen';
import NothingSelected from './NothingSelected';
import Sidebar from './Sidebar';

const JournalScreen = () => {
  const { active } = useSelector((state) => state.notes);

  return (
    <div className='journal__main-content'>
      <Sidebar />

      <main>{active ? <NoteScreen /> : <NothingSelected />}</main>
    </div>
  );
};

export default JournalScreen;