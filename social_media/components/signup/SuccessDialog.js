import Link from 'next/link'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Fade from '@material-ui/core/Fade'
import VerifiedUserTwoTone from '@material-ui/icons/VerifiedUserTwoTone'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'

function Transition (props) {
	return <Fade in={true} {...props} />
}

const SuccessDialog = ({ openSuccess, classes, createdUser }) => {
	return (
		<Dialog open={openSuccess} disableBackdropClick={true} TransitionComponent={Transition}>
			<DialogTitle>
				<VerifiedUserTwoTone className={classes.icon} />
				New Account
			</DialogTitle>
			<DialogContent>
				<DialogContentText>User {createdUser} successfully created!</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color="primary" variant="contained">
					<Link href="/signin">
						<a className={classes.signinLink}>Sign in</a>
					</Link>
				</Button>
			</DialogActions>
		</Dialog>
	)
}

const styles = (theme) => ({
	signinLink : {
		textDecoration : 'none',
		color          : 'white'
	},
	icon       : {
		padding       : '0px 2px 2px 0px',
		verticalAlign : 'middle',
		color         : 'green',
		marginRight   : '.5em'
	}
})

export default withStyles(styles)(SuccessDialog)
