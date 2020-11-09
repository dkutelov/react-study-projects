import React from 'react'

const Location = () => {
	return (
		<div className="location_wrapper">
			<iframe
				title="The venue location on Google maps"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7374.954228339145!2d23.364027352091313!3d42.67149140067835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa85d910a63bbd%3A0xc094b60f1656296a!2sArena+Armeets+Sofia!5e0!3m2!1sen!2sbg!4v1538836939207"
				width="100%"
				height="500px"
				frameBorder="0"
				allowFullScreen
			/>
			<div className="location_tag">
				<div>Location</div>
			</div>
		</div>
	)
}

export default Location
