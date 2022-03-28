import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import createBreakpoints from '@mui/system/createTheme/createBreakpoints'

const breakpoints = createBreakpoints({})

let dark = createTheme()

let darkThemeOptions = createTheme({
	palette: {
		background: {
			default: '#011C26',
		},
		primary: {
			main: '#011C26',
		},
		secondary: {
			main: '#616161',
			light: '#616161',
		},
		success: {
			main: '#14FC9C',
		},
		warning: {
			main: '#FFBC42',
			light: '#E84855',
		},
	},
	shape: {
		borderRadius: 32,
	},
	components: {
		MuiButton: {
			variants: [
				{
					props: { variant: 'keyboard' },
					style: {
						width: '2.75rem!important',
						height: '3.75rem!important',
						fontSize: '1.625rem!important',
						fontWeight: 500,
						borderRadius: 20,
						border: '5px solid',
						borderColor: '#616161',
						backgroundColor: '#616161',
						color: '#011C26',
						'&:hover': {
							color: '#616161',
							backgroundColor: '#011C26',
							'& .eraseIcon': {
								fill: '#616161',
							},
						},
						'& .eraseIcon': {
							fill: '#011C26',
						},
						[breakpoints.down('sm')]: {
							minWidth: 'unset',
							fontSize: '1rem!important',
							height: '6vh!important',
							width: '8vw!important',
							border: 'unset',
							borderRadius: 15,
							'&:hover': {
								color: '#011C26',
								backgroundColor: '#616161',
								'& .eraseIcon': {
									fill: '#011C26',
								},
							},
						},
					},
				},
			],
		},
	},
	typography: {
		fontFamily: 'Fira Sans',
		button: {
			boxShadow: 'none',
			textTransform: 'none',
			fontSize: '3rem',
			fontWeight: 500,
			lineHeight: 1.5,
			border: '0.625rem solid',
			[breakpoints.down('sm')]: {
				border: '0.5rem solid',
			},
			'&:hover': {
				boxShadow: 'none',
			},
		},
		h3: {
			fontWeight: 500,
			fontFamily: 'Fira Sans',
			fontSize: 42,
		},
		h4: {
			fontWeight: 500,
			fontFamily: 'Fira Sans',
			fontSize: 42,
		},
		h6: {
			fontWeight: 300,
			fontSize: 20,
			fontFamily: 'Fira Sans',
		},
	},
})

dark = responsiveFontSizes(darkThemeOptions)

export default dark
