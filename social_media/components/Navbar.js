import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ShareOutlined from '@material-ui/icons/ShareOutlined'
import withStyles from '@material-ui/core/styles/withStyles'

import ActiveLink from './ActiveLink'
import { signoutUser } from '../lib/auth'

const Navbar = ({ classes, router, pageProps: { auth } }) => {
	const { user = {} } = auth || {}
	return (
		<AppBar className={classes.appBar} position={router.pathname === '/' ? 'fixed' : 'static'}>
			<Toolbar>
				<ActiveLink href="/">
					<ShareOutlined className={classes.icon} />
				</ActiveLink>
				<Typography variant="h5" component="h1" className={classes.toolbarTitle}>
					<ActiveLink href="/">NextSocialMedia</ActiveLink>
				</Typography>
				{user._id ? (
					// Auth  navigation
					<div>
						<Button>
							<ActiveLink href={`/profile/${user._id}`} applyColorChange={true}>
								Profile
							</ActiveLink>
						</Button>
						<Button onClick={signoutUser} className={classes.navButton} variant="outlined">
							Sign out
						</Button>
					</div>
				) : (
					// Unauth  navigation
					<div>
						<Button>
							<ActiveLink href="/signin" applyColorChange={true}>
								Sign in
							</ActiveLink>
						</Button>
						<Button>
							<ActiveLink href="/signup" applyColorChange={true}>
								Sign up
							</ActiveLink>
						</Button>
					</div>
				)}
			</Toolbar>
		</AppBar>
	)
}

const styles = (theme) => ({
	appBar       : {
		// z-index 1 higher than the fixed drawer in home page to clip it under the navigation
		zIndex : theme.zIndex.drawer + 1
	},
	toolbarTitle : {
		flex  : 1,
		color : '#fff'
	},
	icon         : {
		marginRight : theme.spacing.unit
	},
	navButton    : {
		color : '#fff'
	}
})

export default withStyles(styles)(Navbar)
