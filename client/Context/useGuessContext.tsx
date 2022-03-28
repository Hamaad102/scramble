import { useState, useContext, createContext, FunctionComponent } from 'react'

// Context
import { useGame } from './useGameContext'
import { useSocket } from './useSocketContext'

// Utility
import { dictionary } from '../utility/dictionary'

interface IGuessContext {
	row: number
	updateRowContext: () => void
	guessHistory: Array<any>
	updateWord: (letter: string) => void
	deleteWord: () => void
	submit: () => void
	defaultGuess: () => void
	wrongWord: boolean
	updateWrongWord: () => void
}

export const GuessContext = createContext<IGuessContext>({
	row: 0,
	updateRowContext: () => null,
	guessHistory: [[], [], [], [], [], []],
	updateWord: () => null,
	deleteWord: () => null,
	submit: () => null,
	defaultGuess: () => null,
	wrongWord: false,
	updateWrongWord: () => null,
})

export const GuessProvider: FunctionComponent = ({ children }): JSX.Element => {
	// Game Constants
	const MAX_ROWS = 5
	const WORD_LENGTH = 5
	// Context
	const { lobbyName } = useSocket()
	const { updateScoreContext, targetWords, currentTarget } = useGame()
	// State
	const [row, setRow] = useState<number>(0)
	const [guessHistory, setGuessHistory] = useState<Array<any>>([
		[],
		[],
		[],
		[],
		[],
		[],
	])
	const [wrongWord, setWrongWord] = useState<boolean>(false)

	const updateRowContext = () => setRow(row + 1)

	// Triggered after every letter is entered
	const updateWord = (letter: string) => {
		if (guessHistory[row] !== undefined && guessHistory[row].length !== 5) {
			let guessHistoryCopy = [...guessHistory]
			guessHistoryCopy[row].push({
				letter,
				color: 'primary.main',
				borderColor: 'secondary.light',
			})
			setGuessHistory(guessHistoryCopy)
		}
	}

	const deleteWord = () => {
		if (
			guessHistory[row] !== undefined &&
			guessHistory[row].length !== 0 &&
			row <= MAX_ROWS
		) {
			let guessHistoryCopy = [...guessHistory]
			guessHistoryCopy[row].pop()
			setGuessHistory(guessHistoryCopy)
		}
	}

	const successTimer = () => {
		setTimeout(() => {
			setRow(0)
			setGuessHistory([[], [], [], [], [], []])
		}, 700)
	}

	const updateWrongWord = () => setWrongWord(false)

	const submit = () => {
		if (guessHistory[row] !== undefined) {
			let checkTarget: string = targetWords[currentTarget]
			let currentMetaData = [...guessHistory[row]]

			if (currentMetaData.length === WORD_LENGTH) {
				let currentWord: string = ''
				currentMetaData.forEach((item) => {
					currentWord = `${currentWord}${item.letter}`.toLowerCase()
				})
				// Checks if word is real
				if (dictionary.includes(currentWord)) {
					// Checks if word is a direct match
					if (currentWord === checkTarget) {
						currentMetaData.forEach((item) => {
							item.color = 'success.main'
							item.borderColor = 'success.main'
						})
						updateScoreContext(row, lobbyName)
						successTimer()
					} else {
						// Inital run through the word to determine letters that are both correct and in the right spot
						currentMetaData.forEach((item, index) => {
							if (currentWord[index] === checkTarget[index]) {
								item.color = 'success.main'
								item.borderColor = 'success.main'
								checkTarget = checkTarget.replace(currentWord[index], '0')
							}
						})
						// Second through to determine the right letters in the wrong spot
						currentMetaData.forEach((item, index) => {
							if (
								checkTarget.includes(currentWord[index]) &&
								item.color !== 'success.main'
							) {
								item.color = 'warning.main'
								item.borderColor = 'warning.main'
								checkTarget = checkTarget.replace(currentWord[index], '0')
							}
						})
						currentMetaData.forEach((item) => {
							if (item.color === 'primary.main') {
								item.color = 'secondary.light'
								item.borderColor = 'hsla(213, 34%, 12%, -0.25)'
							}
						})

						let guessHistoryCopy = [...guessHistory]
						guessHistoryCopy[row] = currentMetaData
						setGuessHistory(guessHistoryCopy)

						if (row === MAX_ROWS) {
							updateScoreContext(6, lobbyName)
							successTimer()
						} else updateRowContext()
					}
				} else {
					setWrongWord(true)
				}
			}
		}
	}

	const defaultGuess = () => {
		setRow(0)
		setGuessHistory([[], [], [], [], [], []])
	}

	return (
		<GuessContext.Provider
			value={{
				row,
				updateRowContext,
				guessHistory,
				updateWord,
				deleteWord,
				submit,
				defaultGuess,
				wrongWord,
				updateWrongWord,
			}}
		>
			{children}
		</GuessContext.Provider>
	)
}

export function useGuess(): IGuessContext {
	return useContext(GuessContext)
}
