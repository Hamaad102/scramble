import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Box, Stack, Typography } from '@mui/material'

// Style
import { BoxSize } from '../styles/size'

// Context
import { useGuess } from '../Context/useGuessContext'

export interface Props {
	guessRow: number
}

function Board(props: Props): JSX.Element {
	const { row, wrongWord, guessHistory, updateWrongWord } = useGuess()

	useEffect(() => {
		if (wrongWord) {
			setTimeout(function () {
				updateWrongWord()
			}, 500)
		}
	}, [wrongWord])

	return (
		<motion.div
			animate={
				wrongWord && row === props.guessRow
					? {
							x: [0, -5, 0, 5, 0, -5, 0, 5, 0],
					  }
					: {}
			}
			transition={{ duration: 0.3 }}
		>
			<Stack direction='row' spacing={{ sm: 2, xs: 1 }}>
				<Box
					// @ts-ignore
					sx={{
						...BoxSize,
						transition: '0.3s 0s ease;',
						backgroundColor: guessHistory[props.guessRow][0]
							? guessHistory[props.guessRow][0].color
							: 'primary.main',
						borderColor: guessHistory[props.guessRow][0]
							? guessHistory[props.guessRow][0].borderColor
							: 'secondary.light',
					}}
				>
					<Typography
						variant='h4'
						sx={{
							color: 'success.light',
						}}
					>
						{guessHistory[props.guessRow][0]
							? guessHistory[props.guessRow][0].letter
							: ''}
					</Typography>
				</Box>
				<Box
					// @ts-ignore
					sx={{
						...BoxSize,
						transition: '0.3s 0s ease;',
						backgroundColor: guessHistory[props.guessRow][1]
							? guessHistory[props.guessRow][1].color
							: 'primary.main',
						borderColor: guessHistory[props.guessRow][1]
							? guessHistory[props.guessRow][1].borderColor
							: 'secondary.light',
					}}
				>
					<Typography
						variant='h4'
						sx={{
							color: 'success.light',
						}}
					>
						{guessHistory[props.guessRow][1]
							? guessHistory[props.guessRow][1].letter
							: ''}
					</Typography>
				</Box>
				<Box
					// @ts-ignore
					sx={{
						...BoxSize,
						transition: '0.3s 0s ease;',
						backgroundColor: guessHistory[props.guessRow][2]
							? guessHistory[props.guessRow][2].color
							: 'primary.main',
						borderColor: guessHistory[props.guessRow][2]
							? guessHistory[props.guessRow][2].borderColor
							: 'secondary.light',
					}}
				>
					<Typography
						variant='h4'
						sx={{
							color: 'success.light',
						}}
					>
						{guessHistory[props.guessRow][2]
							? guessHistory[props.guessRow][2].letter
							: ''}
					</Typography>
				</Box>
				<Box
					// @ts-ignore
					sx={{
						...BoxSize,
						transition: '0.3s 0s ease;',
						backgroundColor: guessHistory[props.guessRow][3]
							? guessHistory[props.guessRow][3].color
							: 'primary.main',
						borderColor: guessHistory[props.guessRow][3]
							? guessHistory[props.guessRow][3].borderColor
							: 'secondary.light',
					}}
				>
					<Typography
						variant='h4'
						sx={{
							color: 'success.light',
						}}
					>
						{guessHistory[props.guessRow][3]
							? guessHistory[props.guessRow][3].letter
							: ''}
					</Typography>
				</Box>
				<Box
					// @ts-ignore
					sx={{
						...BoxSize,
						transition: '0.3s 0s ease;',
						backgroundColor: guessHistory[props.guessRow][4]
							? guessHistory[props.guessRow][4].color
							: 'primary.main',
						borderColor: guessHistory[props.guessRow][4]
							? guessHistory[props.guessRow][4].borderColor
							: 'secondary.light',
					}}
				>
					<Typography
						variant='h4'
						sx={{
							color: 'success.light',
						}}
					>
						{guessHistory[props.guessRow][4]
							? guessHistory[props.guessRow][4].letter
							: ''}
					</Typography>
				</Box>
			</Stack>
		</motion.div>
	)
}

export default Board
