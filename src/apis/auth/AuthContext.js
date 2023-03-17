import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onIdTokenChanged,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  confirmPasswordReset,
  updatePassword,
} from "firebase/auth";
import { createContext, useContext, useEffect } from "react";
import { auth } from "./firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const sendEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // change user password to the new one through the link from the email
  const confirmResetPassword = (oobCode, newPassword) => {
    return confirmPasswordReset(auth, oobCode, newPassword);
  };

  const changePassword = (newPassword) => {
    return updatePassword(auth.currentUser, newPassword);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    googleProvider.addScope("email");
    googleProvider.addScope("profile");
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    onIdTokenChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        localStorage.setItem(
          "token",
          JSON.stringify(currentUser.stsTokenManager.accessToken)
        );
        localStorage.setItem(
          "email",
          JSON.stringify(currentUser.providerData[0].email)
        );
        localStorage.setItem(
          "name",
          JSON.stringify(currentUser.providerData[0].displayName)
        );
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        createUser,
        sendEmail,
        login,
        loginWithGoogle,
        resetPassword,
        confirmResetPassword,
        changePassword,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
