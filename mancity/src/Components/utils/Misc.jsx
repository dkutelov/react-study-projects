import React from 'react'
import { Link } from 'react-router-dom'

export const Tag = ({ link, linkTo, bck, size, color, custom, children }) => {
	const template = (
		<div
			style={{
				background : bck,
				fontSize   : size,
				color,
				padding    : '5px 10px',
				display    : 'inline-block',
				fontFamily : 'Righteous',
				...custom
			}}>
			{children}
		</div>
	)

	if (link) {
		return <Link to={linkTo}>{template}</Link>
	}
	else {
		return template
	}
}

export const firebaseLooper = (snapshot) => {
	const data = []
	snapshot.forEach((childSnapshot) => {
		data.push({ ...childSnapshot.val(), id: childSnapshot.key })
	})
	return data
}

export const reverseArray = (array) => {
	let reversedArray = []
	for (let i = array.length - 1; i >= 0; i--) {
		reversedArray.push(array[i])
	}
	return reversedArray
}

export const validate = (element) => {
	let error = [
		true,
		''
	]

	if (element.validation.email) {
		const valid = /\S+@\S+\.\S+/.test(element.value)
		const message = `${!valid ? 'Please, enter valid email address!' : ''}`
		error = !valid
			? [
					valid,
					message
				]
			: error
	}

	if (element.validation.required) {
		const valid = element.value.trim() !== ''
		const message = `${!valid ? 'This field is required!' : ''}`
		error = !valid
			? [
					valid,
					message
				]
			: error
	}
	return error
}
