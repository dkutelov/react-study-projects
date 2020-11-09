import React from 'react'
import { Link } from 'react-router-dom'

const formatDate = (date) => {
	const newDate = new Date(Number(date)).toLocaleDateString('bg-BG')
	const newTime = new Date(Number(date)).toLocaleTimeString('bg-BG')
	return `${newDate} at ${newTime}`
}

const UserInfo = ({ session }) => {
	const { getCurrentUser } = session
	return (
		<div>
			<h3>User info</h3>
			<p>Username: {getCurrentUser.username}</p>
			<p>Email: {getCurrentUser.email}</p>
			<p>Join date: {formatDate(getCurrentUser.joinDate)}</p>
			<h3>{getCurrentUser.username}'s Favourites</h3>

			{!getCurrentUser.favorites.length && <p>No favorites to show.</p>}
			<ul>
				{getCurrentUser.favorites.map((favorite) => (
					<li key={favorite.id}>
						<Link to={`/recipe/${favorite.id}`}>
							<p>{favorite.name}</p>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default UserInfo
