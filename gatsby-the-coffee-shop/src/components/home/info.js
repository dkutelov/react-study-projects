import React from 'react'
import { Link } from 'gatsby'
import Title from '../globals/title'

const Info = () => {
	return (
		<section className="py-5">
			<div className="container">
				<Title title="our story" />
				<div className="row">
					<div className="col-10 col-sm-8 mx-auto text-center">
						<p className="lead texed-muted mb-5">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam rem dicta quam accusamus
							earum assumenda veniam voluptate? Tempore dolor sunt, cupiditate earum unde aspernatur
							tenetur culpa facere veniam incidunt fuga quos, quis provident autem? Repellat vero esse
							necessitatibus enim, repudiandae sequi aperiam? Rerum ipsum recusandae tempora placeat
							itaque? Autem, culpa?
						</p>
						<Link to="/about/">
							<button className="btn text-uppercase btn-yellow" aria-label="link to about page">
								about us
							</button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Info
