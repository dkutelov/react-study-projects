import React from 'react'

const Error = ({ error }) => {
	return <p>{error.message.substr(15)}</p>
}

export default Error
