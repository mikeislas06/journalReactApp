import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Router
import AuthRouter from './AuthRouter';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

// Components
import JournalScreen from '../components/journal/JournalScreen';

// Firebase
import { getAuth } from '@firebase/auth';

// Actions
import { login } from '../actions/auth.actions';
import Loader from '../components/loader/Loader';
import { startLoadingNotes } from '../actions/notes.actions';

const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <Loader />;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path='/auth'
            component={AuthRouter}
            isLoggedIn={isLoggedIn}
          />

          <PrivateRoute
            exact
            path='/'
            component={JournalScreen}
            isLoggedIn={isLoggedIn}
          />

          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
