import React from 'react'

const MatchesBlock = ({ date, final, localThmb, local, resultLocal, awayThmb, away, resultAway }) => {
	return (
		<div className="match_block">
			<div className="match_date">{final ? date : `Match not played yet: ${date}`}</div>

			<div className="match_wrapper">
				<div className="match_top">
					<div className="left">
						<div className="icon" style={{ background: `url(/images/team_icons/${localThmb}.png)` }} />
						<div className="team_name">{local}</div>
					</div>
					<div className="right">{final ? resultLocal : '-'}</div>
				</div>
				<div className="match_bottom">
					<div className="left">
						<div className="icon" style={{ background: `url(/images/team_icons/${awayThmb}.png)` }} />
						<div className="team_name">{away}</div>
					</div>
					<div className="right">{final ? resultAway : '-'}</div>
				</div>
			</div>
		</div>
	)
}

export default MatchesBlock
