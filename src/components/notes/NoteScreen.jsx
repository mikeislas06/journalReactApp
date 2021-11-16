import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { activeNote } from '../../actions/notes.actions';
import { useForm } from '../../hooks/useForm';
import NotesAppbar from './NotesAppbar';

const NoteScreen = () => {
  const dispatch = useDispatch();

  const { active: note } = useSelector((state) => state.notes);

  const [formValues, handleInputChange, reset] = useForm(note);

  const { title, body } = formValues;

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      activeId.current = note.id;
      reset(note);
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  return (
    <div className='notes__main-content'>
      <NotesAppbar />

      <div className='notes__content'>
        <input
          type='text'
          placeholder='Some awesome title'
          className='notes__title-input'
          autoComplete='off'
          name='title'
          id='title'
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          placeholder='What happened today'
          className='notes__textarea'
          name='body'
          id='body'
          value={body}
          onChange={handleInputChange}></textarea>

        {note.url && (
          <div className='notes__image'>
            <img
              src='https://www.viajarsanfrancisco.com/img/que-visitar-en-san-francisco.jpg'
              alt='imagen de San Fracisco'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteScreen;
