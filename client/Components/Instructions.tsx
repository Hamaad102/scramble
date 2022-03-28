import { Box, Typography } from '@mui/material'

function Instructions(): JSX.Element {
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

	return (
		// @ts-ignore
		<Box sx={modalStyle}>
			<Typography
				sx={{
					textAlign: 'center',
					fontWeight: 500,
					fontSize: 40,
					color: 'secondary.main',
				}}
			>
				How to Play
			</Typography>
			<ul>
				<li>
					<Typography color='secondary.main' variant='h6'>
						Keep guessing words until either the time runs out or you've run out
						of guesses.
					</Typography>
				</li>
				<li>
					<Typography color='secondary.main' variant='h6'>
						Use the least number of guesses for each word to score the most
						points.
					</Typography>
				</li>
				<li>
					<Typography color='secondary.main' variant='h6'>
						One guess gives you 10 points, two is 5, three is 4, four is 3, five
						is 2 and six is 1.
					</Typography>
				</li>
				<li>
					<Typography color='secondary.main' variant='h6'>
						Failing to guess the correct word will award no points and move you
						on to the next word.
					</Typography>
				</li>
			</ul>
		</Box>
	)
}

export default Instructions
