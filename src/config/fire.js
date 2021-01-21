import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyD9JtiQAg1S4D_Z81bhT9dUliNZZtYZjrQ",
  authDomain: "cashgroup-3f175.firebaseapp.com",
  projectId: "cashgroup-3f175",
  storageBucket: "cashgroup-3f175.appspot.com",
  messagingSenderId: "1070156153858",
  appId: "1:1070156153858:web:acc8b0c5768f2a1876131b",
  measurementId: "G-NK68SZ749L",
};

const fire = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const checkLogin = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      return user;
    } else {
      return false;
    }
  });
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firebase.firestore().doc(`Users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    //console.log("at document creation: ", displayName, photoURL);
    try {
      await userRef.set({
        email,
        displayName,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firebase.firestore().doc(`Users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export default fire;
