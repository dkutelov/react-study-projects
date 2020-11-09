import Link from 'next/link'
import withStyles from '@material-ui/core/styles/withStyles'
import { getUserFeed, followUser } from '../../../lib/api'
import {
	Typography,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemSecondaryAction,
	Button,
	IconButton
} from '@material-ui/core'
import AccountBox from '@material-ui/icons/AccountBox'
import SuccessPopup from '../../util/SuccessPopup'
class UserFeed extends React.Component {
	state = {
		users            : [],
		openSuccess      : false,
		followingMessage : ''
	}

	componentDidMount () {
		const { auth } = this.props

		getUserFeed(auth.user._id).then((users) => this.setState({ users }))
	}

	handleFollow = (user, userIndex) => {
		followUser(user._id).then((user) => {
			const updatedUsers = [
				...this.state.users.slice(0, userIndex),
				...this.state.users.slice(userIndex + 1)
			]
			this.setState({ users: updatedUsers, openSuccess: true, followingMessage: `Followin ${user.name}` })
		})
	}

	handleSnackbarClose = () => this.setState({ openSuccess: false })

	render () {
		const { users, openSuccess, followingMessage } = this.state
		const { classes } = this.props
		return (
			<div>
				<Typography variant="h6" component="h2" type="title" align="center">
					Browse users
				</Typography>
				<Divider />
				<List>
					{users.map((user, i) => (
						<span key={user._id}>
							<ListItem>
								<ListItemAvatar className={classes.avatar}>
									<Avatar src={user.avatar} />
								</ListItemAvatar>
								<ListItemText primary={user.name} />
								<ListItemSecondaryAction className={classes.follow}>
									<Link href={`/profile/${user._id}`}>
										<a>
											<IconButton
												variant="contained"
												color="secondary"
												className={classes.viewButton}>
												<AccountBox />
											</IconButton>
										</a>
									</Link>
									<Button
										size="small"
										variant="contained"
										color="primary"
										onClick={() => this.handleFollow(user, i)}>
										Follow
									</Button>
								</ListItemSecondaryAction>
							</ListItem>
						</span>
					))}
				</List>
				<SuccessPopup
					openSuccess={openSuccess}
					handleSnackbarClose={this.handleSnackbarClose}
					message={followingMessage}
				/>
			</div>
		)
	}
}

const styles = (theme) => ({
	root       : {
		padding : theme.spacing.unit
	},
	avatar     : {
		marginRight : theme.spacing.unit
	},
	follow     : {
		right : theme.spacing.unit * 2
	},
	snack      : {
		color : theme.palette.primary.light
	},
	viewButton : {
		verticalAlign : 'middle'
	}
})

export default withStyles(styles)(UserFeed)
