import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Gavel from '@material-ui/icons/Gavel'
import withStyles from '@material-ui/core/styles/withStyles'

import { signupUser } from '../../lib/auth'
import ErrorPopup from '../util/ErrorPopup'
import SuccessDialog from './SuccessDialog'

class Signup extends React.Component {
	state = {
		name        : '',
		email       : '',
		password    : '',
		error       : '',
		createdUser : '',
		openError   : false,
		openSuccess : false,
		isLoading   : false
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()

		const { name, email, password } = this.state
		const user = {
			name,
			email,
			password
		}
		this.setState({ isLoading: true, error: '' })
		signupUser(user)
			.then((createdUser) => {
				this.setState({
					openSuccess : true,
					createdUser,
					error       : '',
					isLoading   : false
				})
			})
			.catch(this.showError)
	}

	showError = (err) => {
		const error = (err.response && err.response.data) || err.message

		this.setState({
			openError : true,
			isLoading : false,
			error
		})
	}

	handleSnackbarClose = () => this.setState({ openError: false })

	render () {
		const { classes } = this.props
		const { error, openError, openSuccess, createdUser, isLoading } = this.state
		return (
			<div className={classes.root}>
				<Paper className={classes.paper}>
					<Avatar className={classes.avatar}>
						<Gavel color="primary" />
					</Avatar>
					<Typography content="h5" component="h1">
						Sign up
					</Typography>
					<form onSubmit={this.handleSubmit} className={classes.form}>
						<FormControl marin="normal" required fullWidth className={classes.formField}>
							<InputLabel htmlFor="name">Name</InputLabel>
							<Input name="name" type="text" onChange={this.handleChange} />
						</FormControl>
						<FormControl marin="normal" required fullWidth className={classes.formField}>
							<InputLabel htmlFor="name">Email</InputLabel>
							<Input name="email" type="email" onChange={this.handleChange} />
						</FormControl>
						<FormControl marin="normal" required fullWidth className={classes.formField}>
							<InputLabel htmlFor="password">Password</InputLabel>
							<Input name="password" type="password" onChange={this.handleChange} />
						</FormControl>
						<Button
							disabled={isLoading}
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}>
							{isLoading ? 'Siging up' : 'Sign up'}
						</Button>
					</form>
					{error && (
						<ErrorPopup
							error={error}
							openError={openError}
							handleSnackbarClose={this.handleSnackbarClose}
						/>
					)}
				</Paper>
				<SuccessDialog openSuccess={openSuccess} createdUser={createdUser} />
			</div>
		)
	}
}

const styles = (theme) => ({
	root      : {
		width                        : 'auto',
		display                      : 'block',
		marginLeft                   : theme.spacing.unit * 3,
		marginRight                  : theme.spacing.unit * 3,
		[theme.breakpoints.up('md')]: {
			width       : 400,
			marginLeft  : 'auto',
			marginRight : 'auto'
		}
	},
	paper     : {
		marginTop     : theme.spacing.unit * 8,
		display       : 'flex',
		flexDirection : 'column',
		alignItems    : 'center',
		padding       : theme.spacing.unit * 2
	},
	avatar    : {
		margin          : theme.spacing.unit,
		backgroundColor : theme.palette.secondary.main
	},
	form      : {
		width     : '100%',
		marginTop : theme.spacing.unit
	},
	formField : {
		marginTop : theme.spacing.unit * 3
	},
	submit    : {
		marginTop : theme.spacing.unit * 3
	}
})

export default withStyles(styles)(Signup)
