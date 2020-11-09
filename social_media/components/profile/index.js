import Link from 'next/link'
import Router from 'next/router'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'
import Edit from '@material-ui/icons/Edit'
import withStyles from '@material-ui/core/styles/withStyles'
import { formatDate } from '../util/helpers'

import { getUser, getPostsByUser, unlikePost, deletePost, likePost, addComment, deleteComment } from '../../lib/api'

import ProfileTabs from './ProfileTabs'
import DeleteUser from './DeleteUser'
import FollowUser from './FollowUser'

class Profile extends React.Component {
	state = {
		user           : null,
		posts          : [],
		isAuth         : false,
		isLoading      : true,
		isDeletingPost : false,
		isFollowing    : false
	}
	componentDidMount () {
		// comes from getInitialProps
		const userId = Router.query.userId

		const { auth } = this.props

		getUser(userId).then(async (user) => {
			// checks if user visits own profile or other user's profile - for edit, delite button
			const isAuth = auth.user._id === userId
			const isFollowing = this.checkFollow(auth, user)
			const posts = await getPostsByUser(userId)
			this.setState({
				user,
				posts,
				isAuth,
				isFollowing,
				isLoading   : false
			})
		})
	}

	checkFollow = (auth, user) => {
		return user.followers.findIndex((follower) => follower._id === auth.user._id) > -1
	}

	toggleFollow = async (sendRequest) => {
		const userId = this.state.user._id
		const { isFollowing } = this.state
		await sendRequest(userId)
		this.setState({ isFollowing: !isFollowing })
	}

	handleDeletePost = async (post) => {
		this.setState({ isDeletingPost: true })
		try {
			const deletedPost = await deletePost(post._id)
			const postIndex = this.state.posts.findIndex((post) => post._id === deletedPost._id)

			const updatedPosts = [
				...this.state.posts.slice(0, postIndex),
				...this.state.posts.slice(postIndex + 1)
			]
			this.setState({ posts: updatedPosts, isDeletingPost: false })
		} catch (err) {
			error.log(err)
			this.setState({ isDeletingPost: false })
		}
	}

	handleToggleLike = async (post) => {
		const { auth } = this.props
		const isPostLiked = post.likes.includes(auth.user._id)
		const sendRequest = isPostLiked ? unlikePost : likePost

		try {
			const updatedLike = await sendRequest(post._id)
			const postIndex = this.state.posts.findIndex((post) => post._id === updatedLike._id)
			console.log(postIndex)

			const updatedPosts = [
				...this.state.posts.slice(0, postIndex),
				updatedLike,
				...this.state.posts.slice(postIndex + 1)
			]
			this.setState({ posts: updatedPosts, isDeletingPost: false })
		} catch (err) {
			error.log(err)
			this.setState({ isDeletingPost: false })
		}
	}

	handleAddComment = async (postId, text) => {
		const comment = { text }
		try {
			const updatedPost = await addComment(postId, comment)
			const postIndex = this.state.posts.findIndex((post) => post._id === updatedPost._id)
			const updatedPosts = [
				...this.state.posts.slice(0, postIndex),
				updatedPost,
				...this.state.posts.slice(postIndex + 1)
			]
			this.setState({
				posts : updatedPosts
			})
		} catch (err) {
			console.error(err)
		}
	}

	handleDeleteComment = async (postId, comment) => {
		try {
			const updatedPost = await deleteComment(postId, comment)
			const postIndex = this.state.posts.findIndex((post) => post._id === updatedPost._id)
			const updatedPosts = [
				...this.state.posts.slice(0, postIndex),
				updatedPost,
				...this.state.posts.slice(postIndex + 1)
			]
			this.setState({
				posts : updatedPosts
			})
		} catch (err) {
			console.error(err)
		}
	}

	render () {
		const { classes, auth } = this.props
		const { isLoading, user, isAuth, posts, isDeletingPost, isFollowing } = this.state
		return (
			<Paper className={classes.root} elevation={4}>
				<Typography variant="h4" component="h1" align="center" className={classes.title} gutterBottom>
					Profile
				</Typography>
				{isLoading ? (
					<div className={classes.progressContainer}>
						<CircularProgress className={classes.progress} size={55} thickness={5} />
					</div>
				) : (
					<List dense>
						<ListItem>
							<ListItemAvatar>
								<Avatar src={user.avatar} className={classes.bigAvatar} />
							</ListItemAvatar>
							<ListItemText primary={user.name} secondary={user.email} />

							{/* Auth - Edit Buttons / UnAuth - Follow Buttons */}
							{isAuth ? (
								<ListItemSecondaryAction>
									<Link href="/edit-profile">
										<a>
											<IconButton color="primary">
												<Edit />
											</IconButton>
										</a>
									</Link>
									<DeleteUser user={user} />
								</ListItemSecondaryAction>
							) : (
								<FollowUser isFollowing={isFollowing} toggleFollow={this.toggleFollow} />
							)}
						</ListItem>
						<Divider />
						<ListItem>
							<ListItemText primary={user.about} secondary={`Joined: ${formatDate(user.createdAt)}`} />
						</ListItem>

						{/* Display User's Posts, Following, and Followers */}
						<ProfileTabs
							auth={auth}
							posts={posts}
							user={user}
							isDeletingPost={isDeletingPost}
							handleDeletePost={this.handleDeletePost}
							handleToggleLike={this.handleToggleLike}
							handleAddComment={this.handleAddComment}
							handleDeleteComment={this.handleDeleteComment}
						/>
					</List>
				)}
			</Paper>
		)
	}
}

const styles = (theme) => ({
	root              : {
		padding                      : theme.spacing.unit * 3,
		marginTop                    : theme.spacing.unit * 5,
		margin                       : 'auto',
		[theme.breakpoints.up('sm')]: {
			width : 600
		}
	},
	title             : {
		color : theme.palette.primary.main
	},
	progress          : {
		margin : theme.spacing.unit * 2
	},
	progressContainer : {
		display        : 'flex',
		alignItems     : 'center',
		justifyContent : 'center',
		flexDirection  : 'column'
	},
	bigAvatar         : {
		width  : 60,
		height : 60,
		margin : 10
	}
})

export default withStyles(styles)(Profile)
