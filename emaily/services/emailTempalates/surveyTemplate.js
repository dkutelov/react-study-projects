const keys = require('../../config/keys')

module.exports = survey => {
	return
	;`<html>
			<body>
				<div style="text-align:center;">
					<h3>We would like your input!</h3>
					<p>Please, answer the following question:</p>
					<p>${survey.body}</p>
					<div>
						<a href="${keys.redirectDomain}/api/survey/${survey.id}/yes">Yes</a>
					</div>
					<div>
						<a href="${keys.redirectDomain}/api/survey/${survey.id}/no">No</a>
					</div>
					<div>
						<p>If you do not like to receive emails from us in the future, please click unsubscribe!</p>
							<a href="${keys.redirectDomain}/api/survey/${
		survey.id
	}/unsubscribe">UNSUBSCRIBE</a>
					</div>
				</div>
			</body>
		</html>`
}
