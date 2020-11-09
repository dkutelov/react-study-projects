import React from 'react'
import Title from '../globals/title'
const Contact = () => {
	return (
		<section className="py-5">
			<Title title="your message" />
			<div className="row">
				<div className="col-10 col-sm-8 col-md-6 col-lg-4 mx-auto">
					<form action="https://formspree.io/d8d8@mail.bg" method="POST">
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input type="text" id="name" name="name" className="form-control" />
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input type="email" id="email" email="email" className="form-control" />
						</div>
						<div className="form-group">
							<label htmlFor="message">Message</label>
							<textarea name="message" id="message" className="form-control" rows="5" />
						</div>
						<button type="submit" className="btn btn-yellow btn-block text-capitalize mt-5">
							Send
						</button>
					</form>
				</div>
			</div>
		</section>
	)
}

export default Contact
