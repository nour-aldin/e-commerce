import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });
// export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider)

export const handleUserProfile = async (userAuth, additionalData ) => {
  if (!userAuth) return;
  const { uid } = userAuth;

  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    // const timestamp = new Date();
    const userRoles = ['user'];

    try {
      await userRef.set({
        displayName,
        email,
        userRoles,
        // createdDate: timestamp,
        ...additionalData
      });
    } catch(err) {
      // console.log(err);
    }
  }

  return userRef;
};

export const handleAddProduct = product => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc()
      .set(product)
      .then(() => {
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const handleFetchProduct = productID => {
  return new Promise((resolve, reject) => {
    firestore
    .collection('products')
    .doc(productID)
    .get()
    .then(snapshot => {
      if(snapshot.exists) {
        resolve(snapshot.data())
      }
    })
    .catch(err =>{
      reject(err)
    })
  })

}
