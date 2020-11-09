import React, { Component } from 'react'
import Stripes from '../../../Resources/images/stripes.png'
import { Tag } from '../../utils/Misc'
import Reveal from 'react-reveal/Reveal'
import HomeCard from './Cards'

class MeetPlayers extends Component {
	state = {
		text : [
			'Meet',
			'The',
			'Players'
		],
		show : false
	}

	renderText = (text) =>
		text.map((word, i) => (
			<div key={i}>
				<Tag
					bck="#0e1731"
					size="100px"
					color="#ffffff"
					custom={{ display: 'inline-block', marginBottom: '20px' }}>
					{word}
				</Tag>
			</div>
		))
	render () {
		return (
			<Reveal fraction={0.7} onReveal={() => this.setState({ show: true })}>
				<div className="home_meetplayers" style={{ background: `#ffffff url(${Stripes})` }}>
					<div className="container">
						<div className="home_meetplayers_wrapper">
							<div className="home_card_wrapper">
								<HomeCard show={this.state.show} />
							</div>
							<div className="home_text_wrapper">
								{this.renderText(this.state.text)}
								<Tag
									link={true}
									linkTo="/the_team"
									bck="#ffffff"
									size="27px"
									color="#0e1731"
									custom={{
										display      : 'inline-block',
										marginBottom : '27px',
										border       : '1px solid #0e1731'
									}}>
									Meet them here
								</Tag>
							</div>
						</div>
					</div>
				</div>
			</Reveal>
		)
	}
}

export default MeetPlayers
