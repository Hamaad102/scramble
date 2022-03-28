const ButtonColors = {
	color: 'secondary.main',
	backgroudColor: 'primary.main',
	'&:hover': {
		backgroundColor: 'secondary.main',
		borderColor: 'secondary.main',
		color: 'primary.main',
	},
	'&:disabled': {
		borderColor: 'secondary.main',
		backgroundColor: 'secondary.main',
		color: 'primary.main',
	},
}

const AltButtonColors = {
	color: 'secondary.main',
	backgroundColor: 'secondary.main',
	'& .buttonText': {
		color: 'primary.main',
	},
	'&:hover': {
		backgroundColor: 'primary.main',
		color: 'secondary.main',
		'& .chevron': {
			color: 'secondary.main',
		},
		'& .buttonText': {
			color: 'secondary.main',
		},
	},
	'&:disabled': {
		borderColor: 'secondary.main',
		backgroundColor: 'secondary.main',
		color: 'primary.main',
	},
}

const PlayAgain = {
	paddingLeft: '1rem',
	paddingRight: '1rem',
	color: 'success.main',
	backgroundColor: 'success.main',
	'& .butText': {
		color: 'primary.main',
	},
	'&:hover': {
		borderColor: 'success.main',
		color: 'success.main',
		'& .butText': {
			color: 'success.main',
		},
	},
}

const CardStyle = {
	border: {
		sm: '0.625rem solid',
		xs: '0.5rem solid',
	},
	color: 'secondary.main',
	backgroundColor: 'primary.main',
	textAlign: 'center',
}

const StartButton = {
	width: {
		sm: '282px',
	},
	borderColor: 'success.main',
	backgroundColor: 'success.main',
	color: 'primary.main',
	'&:hover': {
		backgroundColor: 'primary.main',
		color: 'success.main',
	},
	'&:disabled': {
		borderColor: 'secondary.main',
		backgroundColor: 'secondary.main',
		color: 'primary.main',
	},
}

const CustomInputColors = {
	color: 'secondary.main',
	backgroundColor: 'primary.main',
	borderColor: 'secondary.main',
}

export {
	ButtonColors,
	AltButtonColors,
	CardStyle,
	StartButton,
	CustomInputColors,
	PlayAgain,
}
