import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBeKgolfsemLIN9DeU1k_bW-ktYQtv2e-4",
  authDomain: "codeswap-23d74.firebaseapp.com",
  projectId: "codeswap-23d74",
  storageBucket: "codeswap-23d74.appspot.com",
  messagingSenderId: "286165891638",
  appId: "1:286165891638:web:f6beee6448dae417cef697",
  measurementId: "G-1RM2GHTJ60",
};

const fire = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const analytics = firebase.analytics();

const checkLogin = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      return user;
    } else {
      return false;
    }
  });
};

export const generateUserDocument = async (user, dName) => {
  if (!user) return;
  const userRef = firebase.firestore().doc(`Users/${user.uid}`);
  const snapshot = userRef.get();
  const seed = Math.floor(Math.random() * Math.floor(5000));
  const photoURL = "https://picsum.photos/seed/" + seed + "/200";
  if (dName != undefined) {
    if (!snapshot.exists) {
      try {
        await userRef.set({
          email: user.email,
          displayName: dName,
          photoURL: photoURL,
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
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
