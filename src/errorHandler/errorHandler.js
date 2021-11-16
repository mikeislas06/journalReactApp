export const errorHandler = (message) => {
  switch (message) {
    case 'auth/email-already-in-use':
      return 'The provided email is already in use by an existing user';

    case 'auth/id-token-expired':
      return 'The provided Firebase ID token is expired';

    case 'auth/internal-error':
      return 'The Authentication server encountered an unexpected error while trying to process the request';

    case 'auth/wrong-email':
      return 'The provided value for the email user property is invalid';

    case 'auth/wrong-password':
      return 'The provided value for the password is invalid';

    case 'auth/user-not-found':
      return 'There is no existing user record corresponding to the provided identifier';

    default:
      return message;
  }
};
