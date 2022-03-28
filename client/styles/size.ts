const MainButton = {
	width: {
		sm: '540px',
		xs: '320px',
	},
}

const SettingsButton = {
	width: {
		sm: '423px',
		xs: '224px',
	},
}

const SmallButton = {
	fontSize: {
		sm: '48px',
		xs: '30px',
	},
	width: {
		sm: '101px',
		xs: '80px',
	},
	'& .chevron': {
		color: 'primary.main',
		fontSize: {
			sm: '67px',
			xs: '44px',
		},
		pl: '14px',
	},
}

const LobbyName = {
	py: '1rem',
	width: {
		sm: '571px',
		xs: '250px',
	},
}

const PlayerName = {
	py: '1rem',
	width: {
		sm: '282px',
	},
}

const SettingsStyle = {
	width: {
		sm: '388px',
		xs: '338px',
	},
	py: '2rem',
	px: '2rem',
}

const CustomInput = {
	border: {
		sm: '10px solid',
		xs: '8px solid',
	},
	borderRadius: '32px',
	fontSize: {
		sm: '48px',
		xs: '30px',
	},
	height: {
		sm: '104px',
		xs: '73px',
	},
	width: {
		sm: '423px',
		xs: '224px',
	},
	lineHeight: 1.5,
	'& .MuiInputBase-input': {
		pl: '25px',
		pr: '10px',
		'&::placeholder': {
			opacity: 1,
		},
	},
}

const BoxSize = {
	width: {
		sm: '3.813rem',
		xs: '3.065rem',
	},
	height: {
		sm: '3.813rem',
		xs: '3.065rem',
	},
	border: '5px solid',
	textAlign: 'center',
	paddingTop: {
		md: '0px',
		sm: '5px',
		xs: '2px',
	},
}

export {
	MainButton,
	SettingsButton,
	SmallButton,
	LobbyName,
	PlayerName,
	SettingsStyle,
	CustomInput,
	BoxSize,
}
