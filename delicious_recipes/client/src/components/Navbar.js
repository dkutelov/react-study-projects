import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import Signout from './Auth/Signout'

const Navbar = ({ session }) => {
	return (
		<nav>{session && session.getCurrentUser ? <NavbarAuth user={session.getCurrentUser} /> : <NavbarUnAuth />}</nav>
	)
}

const NavbarUnAuth = () => (
	<ul>
		<li>
			<NavLink exact to="/">
				Home
			</NavLink>
		</li>
		<li>
			<NavLink to="/search">Search</NavLink>
		</li>
		<li>
			<NavLink to="/signin">Sign in</NavLink>
		</li>
		<li>
			<NavLink to="/signup">Sign up</NavLink>
		</li>
	</ul>
)

const NavbarAuth = ({ user }) => (
	<Fragment>
		<ul>
			<li>
				<NavLink exact to="/">
					Home
				</NavLink>
			</li>
			<li>
				<NavLink to="/search">Search</NavLink>
			</li>
			<li>
				<NavLink to="/recipe/add">Add recipe</NavLink>
			</li>
			<li>
				<NavLink to="/profile">Profile</NavLink>
			</li>
			<Signout />
		</ul>
		<h4>Welcome, {user.username}</h4>
	</Fragment>
)

export default Navbar
