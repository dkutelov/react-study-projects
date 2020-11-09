import { Typography, withStyles } from '@material-ui/core'
import NewPost from './NewPost'
import { addPost, getPostFeed, deletePost, likePost, unlikePost, addComment, deleteComment } from '../../../lib/api'
import Post from './Post'

class PostFeed extends React.Component {
	state = {
		posts          : [],
		text           : '',
		image          : '',
		imagePreview   : '',
		isAddingPost   : false,
		isDeletingPost : false
	}

	async componentDidMount () {
		this.postData = new FormData()
		this.getPosts()
	}

	getPosts = async () => {
		const { auth } = this.props

		const posts = await getPostFeed(auth.user._id)
		this.setState({ posts })
	}

	handleChange = (event) => {
		let inputValue

		if (event.target.name === 'image') {
			inputValue = event.target.files[0]
			this.setState({ imagePreview: this.createPreviewImage(inputValue) })
		}
		else {
			inputValue = event.target.value
		}
		this.postData.set(event.target.name, inputValue)
		this.setState({ [event.target.name]: inputValue })
	}

	createPreviewImage = (file) => URL.createObjectURL(file)

	handleAddPost = () => {
		const { auth } = this.props
		this.setState({ isAddingPost: true })
		addPost(auth.user._id, this.postData)
			.then((post) => {
				const updatedPosts = [
					post,
					...this.state.posts
				]
				this.setState({ isAddingPost: false, posts: updatedPosts, text: '', image: '', imagePreview: '' })
				this.postData.delete('image')
			})
			.catch((err) => {
				console.error(err)
				this.setState({ isAddingPost: false })
			})
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
		const { text, image, imagePreview, isAddingPost, posts, isDeletingPost } = this.state
		return (
			<div className={classes.root}>
				{/* <Typography variant="h4" component="h1" align="center" color="primary" className={classes.title}>
					What is on your mind, {auth.user.name}?
        </Typography> */}
				<NewPost
					text={text}
					image={image}
					auth={auth}
					handleChange={this.handleChange}
					imagePreview={imagePreview}
					handleAddPost={this.handleAddPost}
					isAddingPost={isAddingPost}
				/>
				{posts.map((post) => (
					<Post
						key={post._id}
						post={post}
						auth={auth}
						isDeletingPost={isDeletingPost}
						handleDeletePost={this.handleDeletePost}
						handleToggleLike={this.handleToggleLike}
						handleAddComment={this.handleAddComment}
						handleDeleteComment={this.handleDeleteComment}
					/>
				))}
			</div>
		)
	}
}

const styles = (theme) => ({
	root  : {
		paddingBottom : theme.spacing.unit * 2
	},
	title : {
		padding : theme.spacing.unit * 2
	}
})

export default withStyles(styles)(PostFeed)
