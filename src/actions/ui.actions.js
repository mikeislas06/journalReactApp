import { types } from '../types/types';

export const setError = (err) => {
  return {
    type: types.uiSetError,
    payload: err,
  };
};

export const removeError = () => {
  return {
    type: types.uiRemoveError,
  };
};

export const startLoading = () => {
  return {
    type: types.uiStartLoading,
    payload: true,
  };
};

export const finishLoading = () => {
  return {
    type: types.uiFinishLoading,
    payload: false,
  };
};
