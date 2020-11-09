import { firestore } from "./firebase.utils"

export const checkUserEmail = async email => {
  const usersRef = firestore.collection(`users`).where("email", "==", email)
  const snapshot = await usersRef.get()
  return !snapshot.empty
}
