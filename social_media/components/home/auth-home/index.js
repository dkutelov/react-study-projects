import { Grid, withStyles, Drawer } from '@material-ui/core'
import styles from './styles'
import PostFeed from './PostFeed'
import UserFeed from './UserFeed'

const AuthHome = ({ auth, classes }) => {
	return (
		<Grid container>
			<Grid item xs={12} sm={12} md={7}>
				<PostFeed auth={auth} />
			</Grid>
			<Grid item className={classes.drawerContainer}>
				<Drawer
					className={classes.drawer}
					variant="permanent"
					anchor="right"
					classes={{ paper: classes.drawerPaper }}>
					<UserFeed auth={auth} />
				</Drawer>
			</Grid>
		</Grid>
	)
}

export default withStyles(styles)(AuthHome)
