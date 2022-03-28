import { ButtonPropsVariantOverrides } from '@mui/material'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import createBreakpoints from '@mui/system/createTheme/createBreakpoints'

const breakpoints = createBreakpoints({})

let light = createTheme()

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		keyboard: true
	}
}

let lightThemeOptions = createTheme({
	palette: {
		background: {
			default: '#25ffdf',
		},
		primary: {
			main: '#25ffdf',
		},
		secondary: {
			main: '#011C26',
			light: 'hsla(213, 34%, 12%, .75)',
		},
		success: {
			main: '#008148',
			light: '#011C26',
		},
		warning: {
			main: '#FDE74C',
			light: '#FE7658',
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
						borderColor: '#011C26',
						backgroundColor: '#011C26',
						color: '#25ffdf',
						'&:hover': {
							color: '#011C26',
							backgroundColor: '#25ffdf',
							'& .eraseIcon': {
								fill: '#011C26',
							},
						},
						'& .eraseIcon': {
							fill: '#25ffdf',
						},
						[breakpoints.down('sm')]: {
							minWidth: 'unset',
							fontSize: '1rem!important',
							height: '6vh!important',
							width: '8vw!important',
							border: 'unset',
							borderRadius: 15,
							'&:hover': {
								color: '#25ffdf',
								backgroundColor: '#011C26',
								'& .eraseIcon': {
									fill: '#25ffdf',
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

light = responsiveFontSizes(lightThemeOptions)

export default light
