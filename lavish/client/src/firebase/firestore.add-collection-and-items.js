import { firestore } from "./firebase.utils"

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  // create reference object with collectionKye 'collections'
  const collectionRef = firestore.collection(collectionKey)
  // batch write
  const batch = firestore.batch()
  objectsToAdd.forEach(obj => {
      //  creates doc reference object with unique id for each collection
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, obj)
  })

  return await batch.commit()
}
