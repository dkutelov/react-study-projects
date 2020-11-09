import {
	withStyles,
	Card,
	CardHeader,
	Avatar,
	Typography,
	CardContent,
	TextField,
	IconButton,
	CardActions,
	Button,
	CardMedia
} from '@material-ui/core'
import AddAPhoto from '@material-ui/icons/AddAPhoto'

const NewPost = ({ classes, auth, text, image, handleChange, imagePreview, handleAddPost, isAddingPost }) => (
	<Card className={classes.card}>
		<CardHeader
			avatar={<Avatar src={auth.user.avatar} />}
			title={
				<Typography variant="h6" component="h2" color="primary">
					{auth.user.name}
				</Typography>
			}
			className={classes.cardHeader}
		/>
		<CardContent className={classes.CardContent}>
			<TextField
				label="Create Post"
				placeholder={`What is on your mind, ${auth.user.name}?`}
				value={text}
				name="text"
				multiline={true}
				rows="2"
				fullWidth
				margin="normal"
				onChange={handleChange}
				variant="outlined"
				InputLabelProps={{ shrink: true }}
			/>
			<input
				name="image"
				type="file"
				accept="image/*"
				className={classes.input}
				id="image"
				onChange={handleChange}
			/>
			<label htmlFor="image">
				<IconButton color="secondary" component="span">
					<AddAPhoto color="primary" />
				</IconButton>
			</label>

			<span>{image && image.name}</span>
		</CardContent>
		{imagePreview && <CardMedia className={classes.media} image={imagePreview} />}
		<CardActions className={classes.cardActions}>
			<Button color="primary" variant="contained" disabled={!text || isAddingPost} onClick={handleAddPost}>
				{!isAddingPost ? 'Post' : 'Submitting'}
			</Button>
		</CardActions>
	</Card>
)

const styles = (theme) => ({
	card        : {
		marginBottom    : theme.spacing.unit * 3,
		backgroundColor : '#FCFFFF'
	},
	cardContent : {
		backgroundColor : 'white'
	},
	input       : {
		display : 'none'
	},
	cardActions : {
		display       : 'flex',
		flexDirection : 'row-reverse'
	},
	media       : {
		width  : 100,
		height : 100,
		margin : '0 2em'
	},
	cardHeader  : {
		paddingTop      : theme.spacing.unit,
		paddingBottom   : theme.spacing.unit,
		backgroundColor : 'rgba(11, 61, 130, 0.06)'
	}
})

export default withStyles(styles)(NewPost)
