import React from 'react'
import { connect } from 'react-redux'

import {
	startLogin,
	startLoginFacebook,
	startRegister,
	startUserLogin
} from '../actions/auth'
import UserForm from './UserForm'

export const Login = ({
	startLogin,
	startLoginFacebook,
	startRegister,
	startUserLogin
}) => (
	<div className="box-layout">
		<div className="box-layout__box">
			<div className="box-layout__menu">
				<h2 className="box-layout__title">Social Login</h2>
				<button className="button" onClick={startLogin}>
					Google
				</button>
				<button className="button" onClick={startLoginFacebook}>
					Facebook
				</button>
			</div>
			<div className="box-layout__menu">
				<h3 className="box-layout__title">Username Login</h3>
				<UserForm
					onSubmit={userData => {
						startUserLogin(userData.email, userData.password)
					}}
				/>
			</div>
			<div className="box-layout__menu">
				<h3 className="box-layout__title">Register</h3>
				<UserForm
					onSubmit={userData => {
						startRegister(userData.email, userData.password)
					}}
				/>
			</div>
		</div>
	</div>
)

const mapDispatchToProps = dispatch => ({
	startLogin: () => dispatch(startLogin()),
	startLoginFacebook: () => dispatch(startLoginFacebook()),
	startRegister: (email, password) => dispatch(startRegister(email, password)),
	startUserLogin: (email, password) => dispatch(startUserLogin(email, password))
})

export default connect(undefined, mapDispatchToProps)(Login)
