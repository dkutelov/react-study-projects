import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import { config } from "./dbconfig"

import { createUserProfileDocument } from "./firebase.create-user"
import { addCollectionAndDocuments } from "./firestore.add-collection-and-items"
import { convertCollectionsSnapshotToMap } from "./firestore.convert-collections-snapshot-to-map"
import { checkUserEmail } from "./firebase.check-if-user-email-exists"

firebase.initializeApp(config)

const auth = firebase.auth()
const firestore = firebase.firestore()

// Google sign in pop up
export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: "select_account" })
const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

// Get current user
const getCurrentUser = () => {
  // saga needs to yield a promise
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe()
      resolve(userAuth)
    }, reject)
  })
}

// Save user to db
export {
  auth,
  firestore,
  signInWithGoogle,
  createUserProfileDocument,
  addCollectionAndDocuments,
  convertCollectionsSnapshotToMap,
  getCurrentUser,
  checkUserEmail,
  firebase as default
}
