import Router from 'next/router'
import withStyles from '@material-ui/core/styles/withStyles'
import { Grid, Typography, Button } from '@material-ui/core'

const Splash = ({ classes }) => {
	return (
		<Grid justify="center" alignItems="center" direction="row" container className={classes.heroContent}>
			<Typography variant="h2" component="h1" align="center" gutterBottom color="textPrimary">
				The social media of the future
			</Typography>
			<Typography variant="h6" component="p" align="center" color="textSecondary">
				Welcome to a new cool social media which stands out with its simplicity and functionality. You and your
				experience only matter. No advertising or sponsored content
			</Typography>
			<Button
				className={classes.fabButton}
				color="primary"
				variant="extendedFab"
				onClick={() => Router.push('/signup')}>
				Get Started
			</Button>
		</Grid>
	)
}

const styles = (theme) => ({
	fabButton   : {
		margin : theme.spacing.unit * 3
	},
	heroContent : {
		maxWidth      : 600,
		paddingTop    : theme.spacing.unit * 8,
		paddingBottom : theme.spacing.unit * 6,
		margin        : '0 auto'
	}
})

export default withStyles(styles)(Splash)
