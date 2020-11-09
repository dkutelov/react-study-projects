import React from 'react'
import PromotionAnimation from './Animation.jsx'
import Enroll from './Enroll'

const Promotion = () => {
	return (
		<div className="promotion_wrapper" style={{ background: '#ffffff' }}>
			<div className="container">
				<PromotionAnimation />
				<Enroll />
			</div>
		</div>
	)
}

export default Promotion
