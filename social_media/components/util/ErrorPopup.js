import withStyles from '@material-ui/core/styles/withStyles'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

const ErrorPopup = ({ openError, handleSnackbarClose, error, classes }) => {
	return (
		<Snackbar
			anchorOrigin={{
				vertical   : 'bottom',
				horizontal : 'right'
			}}
			open={openError}
			onClose={handleSnackbarClose}
			autoHideDuration={6000}>
			<SnackbarContent className={classes.snackBox} message={<span className={classes.snack}>{error}</span>} />
		</Snackbar>
	)
}

const styles = (theme) => ({
	snack    : {
		color : theme.palette.white
	},
	snackBox : {
		backgroundColor : '#DB324D'
	}
})

export default withStyles(styles)(ErrorPopup)
