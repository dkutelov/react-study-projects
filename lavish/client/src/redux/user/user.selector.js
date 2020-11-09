import { createSelector } from "reselect"

const selectUser = state => state.user

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
)
export const emailExists = createSelector(
  [selectUser],
  user => user.emailExists
)

export const selectIsChecking = createSelector(
  [selectUser],
  user => user.isChecking
)
