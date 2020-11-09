import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import Delete from '@material-ui/icons/Delete'
import withStyles from '@material-ui/core/styles/withStyles'

import { deleteUser } from '../../lib/api'
import { signoutUser } from '../../lib/auth'
import { Typography } from '@material-ui/core'

class DeleteUser extends React.Component {
	state = {
		open       : false,
		isDeleting : false
	}

	handleDeleteUser = () => {
		const { user } = this.props
		this.setState({ isDeleting: true })
		deleteUser(user._id)
			.then((user) => {
				signoutUser()
			})
			.catch((err) => {
				console.error(err)
				this.setState({ isDeleting: false })
			})
	}

	handleOpen = () => this.setState({ open: true })
	handleClose = () => this.setState({ open: false })

	render () {
		const { open, isDeleting } = this.state
		const { classes } = this.props
		return (
			<div>
				<IconButton onClick={this.handleOpen} style={{ color: '#DB324D' }}>
					<Delete />
				</IconButton>
				<Dialog open={open} onClose={this.handleClose}>
					<MuiDialogTitle disableTypography>
						<Typography variant="h5" component="h6" className={classes.title}>
							Delete Acount
						</Typography>
					</MuiDialogTitle>
					<DialogContent>
						<DialogContentText>Are you sure, you want to delete your account?</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							color="primary"
							onClick={this.handleClose}
							className={classes.cancelButton}
							disabled={isDeleting}>
							Cancel
						</Button>
						<Button onClick={this.handleDeleteUser} className={classes.deleteButton}>
							{isDeleting ? 'Deleeting' : 'CONFIRM'}
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

const styles = (theme) => ({
	title        : {
		color : '#DB324D'
	},
	deleteButton : {
		color      : '#DB324D',
		fontWeight : 'bold'
	},
	cancelButton : {
		fontWeight : 'bold'
	}
})

export default withStyles(styles)(DeleteUser)
