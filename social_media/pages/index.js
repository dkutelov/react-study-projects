import withStyles from '@material-ui/core/styles/withStyles'
import { authInitialProps } from '../lib/auth'
import Splash from '../components/home/Splash'
import AuthHome from '../components/home/auth-home'

const Index = ({ classes, auth }) => (
	<main className={classes.root}>
		{auth.user && auth.user._id ? (
			// auth user page
			<AuthHome auth={auth} />
		) : (
			// Splash page for unauth users
			<Splash />
		)}
	</main>
)

Index.getInitialProps = authInitialProps()

const styles = (theme) => ({
	root              : {
		paddingTop                     : theme.spacing.unit * 10,
		paddingLeft                    : theme.spacing.unit * 5,
		[theme.breakpoints.down('sm')]: {
			paddingRight : theme.spacing.unit * 5
		}
	},
	progressContainer : {
		height : '80vh'
	},
	progress          : {
		margin : theme.spacing.unit * 2,
		color  : theme.palette.secondary.light
	},
	drawerContainer   : {
		[theme.breakpoints.down('sm')]: {
			display : 'none'
		}
	},
	drawer            : {
		width : 350
	},
	drawerPaper       : {
		marginTop : 70,
		width     : 350
	},
	fabButton         : {
		margin : theme.spacing.unit * 3
	},
	heroContent       : {
		maxWidth      : 600,
		paddingTop    : theme.spacing.unit * 8,
		paddingBottom : theme.spacing.unit * 6,
		margin        : '0 auto'
	}
})

export default withStyles(styles)(Index)
