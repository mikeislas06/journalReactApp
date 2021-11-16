import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { types } from '../types/types';
import { loadNotes } from '../helpers/loadNotes';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    try {
      const docRef = await addDoc(
        collection(db, `${uid}/journal/notes`),
        newNote
      );
      console.log(docRef);

      dispatch(activeNote(docRef.id, newNote));
    } catch (e) {
      console.log(e);
    }
  };
};

export const activeNote = (id, note) => {
  return {
    type: types.notesActive,
    payload: {
      id,
      ...note,
    },
  };
};

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => {
  return {
    type: types.notesLoad,
    payload: notes,
  };
};

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url;
    }

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);
    await updateDoc(noteRef, noteToFirestore);

    dispatch(refreshNote(note.id, noteToFirestore));
    Swal.fire('Saved', note.title, 'success');
  };
};

export const refreshNote = (id, note) => {
  return {
    type: types.notesUpdated,
    payload: {
      id,
      note: {
        id,
        ...note,
      },
    },
  };
};

// react-journal
