const styles = (theme) => ({
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
	}
})

export { styles as default }
