import Link from 'next/link'
import {
	withStyles,
	Card,
	CardHeader,
	Avatar,
	CardContent,
	Typography,
	CardActions,
	IconButton,
	Badge,
	Divider
} from '@material-ui/core'
import { Comment, DeleteTwoTone, Favorite, FavoriteBorder, CreditCardSharp } from '@material-ui/icons'
import { formatTimeCreated } from '../../util/helpers'

import Comments from './Comments'

class Post extends React.PureComponent {
	state = {
		isLiked  : false,
		numLikes : 0,
		comments : []
	}

	componentDidMount () {
		this.setState({
			isLiked  : this.checkLiked(this.props.post.likes),
			numLikes : this.props.post.likes.length,
			comments : this.props.post.comments
		})
	}

	componentDidUpdate (prevProps) {
		if (prevProps.post.likes.length !== this.props.post.likes.length) {
			this.setState({
				isLiked  : this.checkLiked(this.props.post.likes),
				numLikes : this.props.post.likes.length
			})
		}

		if (prevProps.post.comments.length !== this.props.post.comments.length) {
			this.setState({
				comments : this.props.post.comments
			})
		}
	}

	checkLiked = (likes) => likes.includes(this.props.auth.user._id)

	render () {
		const { numLikes, isLiked, comments } = this.state
		const {
			classes,
			post,
			auth,
			isDeletingPost,
			handleDeletePost,
			handleToggleLike,
			handleAddComment,
			handleDeleteComment
		} = this.props
		const isPostCreator = post.postedBy._id === auth.user._id
		return (
			<Card className={classes.card}>
				<CardHeader
					avatar={
						<Link href={`/profile/${post.postedBy._id}`}>
							<a>
								<Avatar src={post.postedBy.avatar} />
							</a>
						</Link>
					}
					action={
						isPostCreator && (
							<IconButton disabled={isDeletingPost} onClick={() => handleDeletePost(post)}>
								<DeleteTwoTone className={classes.deleteButton} />
							</IconButton>
						)
					}
					title={
						<Link href={`/profile/${post.postedBy._id}`}>
							<a>{post.postedBy.name}</a>
						</Link>
					}
					subheader={formatTimeCreated(post.createdAt)}
					className={classes.cardHeader}
				/>
				<CardContent className={classes.cardContent}>
					<Typography variant="body1" className={classes.text}>
						{post.text}
					</Typography>
					{post.image && (
						<div className="imageContainer">
							<img className={classes.image} src={post.image} />
						</div>
					)}
				</CardContent>
				<CardActions>
					<IconButton onClick={() => handleToggleLike(post)} className={classes.button}>
						<Badge badgeContent={numLikes} color="secondary">
							{isLiked ? (
								<Favorite className={classes.favoriteIcon} />
							) : (
								<FavoriteBorder className={classes.favoriteIcon} />
							)}
						</Badge>
					</IconButton>
					<IconButton className={classes.button}>
						<Badge badgeContent={comments.length} color="primary">
							<Comment className={classes.commentIcon} />
						</Badge>
					</IconButton>
				</CardActions>
				<Divider />
				<Comments
					auth={auth}
					postId={post._id}
					comments={comments}
					handleAddComment={handleAddComment}
					handleDeleteComment={handleDeleteComment}
				/>
			</Card>
		)
	}
}

const styles = (theme) => ({
	card           : {
		marginBottom : theme.spacing.unit * 3
	},
	cardContent    : {
		backgroundColor : 'white'
	},
	cardHeader     : {
		paddingTop      : theme.spacing.unit,
		paddingBottom   : theme.spacing.unit,
		backgroundColor : 'rgba(11, 61, 130, 0.06)'
	},
	imageContainer : {
		textAlign : 'center',
		padding   : theme.spacing.unit
	},
	image          : {
		width : '100%'
	},
	favoriteIcon   : {
		color : theme.palette.favoriteIcon
	},
	commentIcon    : {
		color : theme.palette.commentIcon
	},
	deleteButton   : {
		color : '#DB324D'
	}
})

export default withStyles(styles)(Post)
