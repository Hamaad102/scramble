import { FormEvent, useState } from 'react'
import {
	Box,
	Button,
	InputBase,
	Stack,
	Switch,
	Typography,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'

// Context
import { useSettings } from '../Context/useSettingsContext'

// Style
import { CustomInputColors, AltButtonColors } from '../styles/colors'
import { CustomInput, SmallButton } from '../styles/size'

function Settings(): JSX.Element {
	// Context
	const { darkMode, updateDarkMode, username, updateUsername } = useSettings()

	// State
	const [newName, setName] = useState<string>(username)

	const modalStyle = {
		position: 'absolute',
		top: { sm: '30%', xs: '40%' },
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: { sm: 600, xs: 350 },
		bgcolor: 'primary.main',
		color: 'secondary.main',
		p: 4,
		borderRadius: '20px',
	}

	// @ts-ignore
	const updateName = (e: ChangeEvent) => setName(e.target.value)

	const saveName = (e: FormEvent) => {
		e.preventDefault()
		updateUsername(newName)
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateDarkMode(event.target.checked)
	}

	return (
		// @ts-ignore
		<Box sx={modalStyle}>
			<Stack spacing={3} pb={2}>
				<Typography
					sx={{
						textAlign: 'center',
						fontWeight: 500,
						fontSize: 50,
						color: 'secondary.main',
					}}
				>
					Settings
				</Typography>

				<form onSubmit={saveName}>
					<Stack
						direction='row'
						spacing={3}
						mt={5}
						mb={4}
						px={{ sm: 6, xs: 0 }}
					>
						<InputBase
							required
							onChange={updateName}
							placeholder='Username'
							sx={{ ...CustomInput, ...CustomInputColors }}
						/>
						<Button type='submit' sx={{ ...AltButtonColors, ...SmallButton }}>
							<CheckIcon sx={{ pl: '0!important' }} className='chevron' />
						</Button>
					</Stack>
				</form>

				<Stack
					direction='row'
					spacing={{ sm: 15, xs: 8 }}
					alignItems='center'
					justifyContent='space-evenly'
				>
					<Typography variant='h4' sx={{ fontSize: '1.5rem!important' }}>
						Dark Theme
					</Typography>
					<Switch
						checked={darkMode}
						onChange={handleChange}
						sx={{
							'& .MuiSwitch-switchBase.Mui-checked': { color: 'success.main' },
							'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
								background: '#616161',
							},
						}}
						inputProps={{ 'aria-label': 'controlled' }}
					/>
				</Stack>
			</Stack>
		</Box>
	)
}

export default Settings
