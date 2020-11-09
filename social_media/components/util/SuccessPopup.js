import withStyles from '@material-ui/core/styles/withStyles'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

const SuccessPopup = ({ openSuccess, handleSnackbarClose, classes, message }) => {
	return (
		<Snackbar
			anchorOrigin={{
				vertical   : 'bottom',
				horizontal : 'right'
			}}
			open={openSuccess}
			onClose={handleSnackbarClose}
			autoHideDuration={6000}>
			<SnackbarContent className={classes.snackBox} message={<span className={classes.snack}>{message}</span>} />
		</Snackbar>
	)
}

const styles = (theme) => ({
	snack    : {
		color : theme.palette.white
	},
	snackBox : {
		backgroundColor : '#8ED081'
	}
})

export default withStyles(styles)(SuccessPopup)
