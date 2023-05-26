/* eslint-disable @typescript-eslint/no-explicit-any */

export interface FirebaseSignInError {
  code: 'auth/invalid-email' | 'auth/user-disabled' | 'auth/user-not-found' | 'auth/wrong-password';
}

export interface FirebaseSignUpError {
  code: 'auth/email-already-in-use' | 'auth/invalid-email' | 'auth/operation-not-allowed' | 'auth/weak-password';
}

export const isFirebaseSignInError = (error: any): error is FirebaseSignInError => {
  return (
    error.code === 'auth/invalid-email' ||
    error.code === 'auth/user-disabled' ||
    error.code === 'auth/user-not-found' ||
    error.code === 'auth/wrong-password'
  );
};

export const isFirebaseSignUpError = (error: any): error is FirebaseSignUpError => {
  return (
    error.code === 'auth/email-already-in-use' ||
    error.code === 'auth/invalid-email' ||
    error.code === 'auth/operation-not-allowed' ||
    error.code === 'auth/weak-password'
  );
};
