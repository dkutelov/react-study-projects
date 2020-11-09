import React from 'react'
import UserInfo from './UserInfo'
import UserRecipes from './UserRecipes'
import withAuth from '../withAuth'
//import AuthRoute from '../AuthRoute'
const Profile = ({ session }) => {
	return (
		<div className="App">
			<UserInfo session={session} />
			<UserRecipes username={session.getCurrentUser.username} />
		</div>
	)
}

//export default Profile
// gets session from withAuth and runs the function
export default withAuth((session) => session && session.getCurrentUser)(Profile)
