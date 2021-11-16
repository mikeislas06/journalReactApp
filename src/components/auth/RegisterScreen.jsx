import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../../actions/auth.actions';

import { removeError, setError } from '../../actions/ui.actions';

import { useForm } from '../../hooks/useForm';

const RegisterScreen = () => {
  const dispatch = useDispatch();

  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (validator.isEmpty(name)) {
      dispatch(setError('Name is required'));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'));
      return false;
    } else if (!validator.equals(password, password2) || password.length < 5) {
      dispatch(
        setError(
          'Password must be at least 6 characters or passwords do not match'
        )
      );
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className='auth__title'>Register</h3>

      <form onSubmit={handleRegister}>
        {msgError && <div className='auth__alert-error'>{msgError}</div>}

        <input
          className='auth__input'
          type='text'
          placeholder='Name'
          name='name'
          autoComplete='off'
          onChange={handleInputChange}
          value={name}
        />

        <input
          className='auth__input'
          type='text'
          placeholder='Email'
          name='email'
          autoComplete='off'
          onChange={handleInputChange}
          value={email}
        />

        <input
          className='auth__input'
          type='password'
          placeholder='Password'
          name='password'
          autoComplete='off'
          onChange={handleInputChange}
          value={password}
        />

        <input
          className='auth__input'
          type='password'
          placeholder='Confirm password'
          name='password2'
          autoComplete='off'
          onChange={handleInputChange}
          value={password2}
        />

        <button className='btn btn-primary btn-block mb-5' type='submit'>
          Register
        </button>

        <Link to='/auth/login' className='link'>
          Already registered?
        </Link>
      </form>
    </>
  );
};

export default RegisterScreen;
