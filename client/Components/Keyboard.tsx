import React from 'react'
import { Button, Stack } from '@mui/material'

// Context
import { useGuess } from '../Context/useGuessContext'

function Keyboard(): JSX.Element {
	const { updateWord, deleteWord, submit } = useGuess()

	return (
		<>
			{/* Top Row */}
			<Stack
				sx={{ height: 'inherit', marginTop: { sm: '-20px', xs: '-10px' } }}
				spacing={{ sm: 1, xs: 0.5 }}
				alignItems='center'
				direction='row'
			>
				<Button variant='keyboard' onClick={() => updateWord('Q')}>
					Q
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('W')}>
					W
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('E')}>
					E
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('R')}>
					R
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('T')}>
					T
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('Y')}>
					Y
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('U')}>
					U
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('I')}>
					I
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('O')}>
					O
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('P')}>
					P
				</Button>
			</Stack>

			{/* Middle Row */}
			<Stack
				sx={{ height: 'inherit', marginTop: '1vh' }}
				spacing={{ sm: 1, xs: 0.5 }}
				alignItems='center'
				direction='row'
			>
				<Button variant='keyboard' onClick={() => updateWord('A')}>
					A
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('S')}>
					S
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('D')}>
					D
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('F')}>
					F
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('G')}>
					G
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('H')}>
					H
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('J')}>
					J
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('K')}>
					K
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('L')}>
					L
				</Button>
			</Stack>

			{/* Bottom Row */}
			<Stack
				sx={{ height: 'inherit', marginTop: '1vh' }}
				spacing={{ sm: 1, xs: 0.5 }}
				alignItems='center'
				direction='row'
			>
				<Button
					variant='keyboard'
					sx={{ width: { sm: '6.188rem!important', xs: '14.5vw!important' } }}
					onClick={() => submit()}
				>
					ENTER
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('Z')}>
					Z
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('X')}>
					X
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('C')}>
					C
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('V')}>
					V
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('B')}>
					B
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('N')}>
					N
				</Button>
				<Button variant='keyboard' onClick={() => updateWord('M')}>
					M
				</Button>
				<Button
					variant='keyboard'
					sx={{ width: { sm: '6.188rem!important', xs: '13vw!important' } }}
					onClick={() => deleteWord()}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						height='24'
						viewBox='0 0 24 24'
						width='24'
					>
						<path
							className='eraseIcon'
							d='M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z'
						></path>
					</svg>
				</Button>
			</Stack>
		</>
	)
}

export default Keyboard
