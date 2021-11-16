import { types } from '../types/types';

/*
  {
    uid: ijasbhidhgai8sdg13e13e,
    name: 'Miguel'
  }
*/

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
      };

    case types.logout:
      return {};

    default:
      return state;
  }
};
