import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth.actions';
import { startNewNote } from '../../actions/notes.actions';
import JournalEntries from './JournalEntries';

const Sidebar = () => {
  const dispatch = useDispatch();

  const { name } = useSelector((state) => state.auth);

  const handleNewEntry = () => {
    dispatch(startNewNote());
  };

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <aside className='journal__sidebar'>
      <div className='journal__sidebar-navbar'>
        <h3 className='mt-5'>
          <i className='far fa-moon'></i>
          <span> {name}</span>
        </h3>

        <button
          className='btn'
          style={{ marginTop: '17px' }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className='journal__new-entry' onClick={handleNewEntry}>
        <i className='far fa-calendar-plus fa-5x'></i>
        <p className='mt-5'>New Entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
};

export default Sidebar;
