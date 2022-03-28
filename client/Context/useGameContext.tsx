import socket from '../utility/Socket'
import { useRouter } from 'next/router'
import { useState, useContext, createContext, FunctionComponent } from 'react'

interface IGameContext {
	lobbyLoading: boolean
	updateLobbyLoading: (bool: boolean) => void
	opponent: string
	updateOpponent: (name: string) => void
	timeLimit: number
	updateTime: (time: number, lobby?: string) => void
	wordLimit: number
	updateWord: (word: number, lobby?: string) => void
	score: number
	updateScoreContext: (rows: number, lobbyName: string) => void
	opponentScore: number
	host: boolean
	updateHostContext: (bool: boolean) => void
	startGame: (lobby: string) => void
	targetWords: Array<string>
	currentTarget: number
	gameOver: (lobbyName: string) => void
	newGame: () => void
	playAgain: (lobbyName: string) => void
}

export const GameContext = createContext<IGameContext>({
	lobbyLoading: true,
	updateLobbyLoading: () => null,
	opponent: '',
	updateOpponent: () => null,
	timeLimit: 1,
	updateTime: () => null,
	wordLimit: 6,
	updateWord: () => null,
	score: 0,
	updateScoreContext: () => null,
	opponentScore: -1,
	host: false,
	updateHostContext: () => null,
	startGame: () => null,
	targetWords: [],
	currentTarget: 0,
	gameOver: () => null,
	newGame: () => null,
	playAgain: () => null,
})

export const GameProvider: FunctionComponent = ({ children }): JSX.Element => {
	const router = useRouter()
	const { asPath } = useRouter()

	// State
	const [lobbyLoading, setLobbyLoading] = useState<boolean>(true)
	const [opponent, setOpponent] = useState<string>('')
	const [timeLimit, setTimeLimit] = useState<number>(1)
	const [wordLimit, setWordLimit] = useState<number>(6)
	const [score, setScore] = useState<number>(0)
	const [opponentScore, setOpponentScore] = useState<number>(-1)
	const [host, setHost] = useState<boolean>(false)
	const [targetWords, setTargetWords] = useState<Array<string>>([])
	const [currentTarget, setCurrentTarget] = useState<number>(0)

	const updateLobbyLoading = (bool: boolean) => setLobbyLoading(bool)

	const updateOpponent = (name: string) => setOpponent(name)

	const updateTime = (time: number, lobby?: string) => {
		setTimeLimit(time)
		if (lobby && host)
			socket.off('update_time').emit('update_time', { time, lobby })
	}

	const updateWord = (word: number, lobby?: string) => {
		setWordLimit(word)
		if (lobby && host)
			socket.off('update_word').emit('update_word', { word, lobby })
	}

	const updateScoreContext = (rows: number, lobbyName: string) => {
		let newScore = score
		switch (rows) {
			case 0:
				newScore = score + 10
				setScore(newScore)
				break
			case 1:
				newScore = score + 5
				setScore(newScore)
				break
			case 2:
				newScore = score + 4
				setScore(newScore)
				break
			case 3:
				newScore = score + 3
				setScore(newScore)
				break
			case 4:
				newScore = score + 2
				setScore(newScore)
				break
			case 5:
				newScore = score + 1
				setScore(newScore)
				break
			default:
				break
		}
		if (wordLimit !== currentTarget + 1) setCurrentTarget(currentTarget + 1)
		else gameOver(lobbyName)
	}

	// Score is sent to server and user is redirected to scoreboard
	const gameOver = (lobbyName: string) => {
		socket.off('game_over').emit('game_over', { lobby: lobbyName, score, host })
		router.push(`${asPath}/scoreboard`)
	}

	// Player hits either start new game or return to lobby
	// If player hits return to lobby we don't want them to load in before opponent makes their mind otherwise they'll
	// Be able to start a new game with no one
	const playAgain = (lobbyName: string) =>
		socket.off('play_again').emit('play_again', { lobby: lobbyName })

	// Resets game variables to default
	const newGame = () => {
		setScore(0)
		setTargetWords([])
		setOpponentScore(-1)
		setCurrentTarget(0)
	}

	const updateHostContext = (bool: boolean) => setHost(bool)

	const startGame = (lobby: string) =>
		socket.off('start_game').emit('start_game', { lobby })

	// Triggered when host changes time limit
	socket.off('update_time_opponent').on('update_time_opponent', (data: any) => {
		if (!host) updateTime(data.time)
	})

	// Triggered when host changes word limit
	socket.off('update_word_opponent').on('update_word_opponent', (data: any) => {
		if (!host) updateWord(data.word)
	})

	// Triggered when host clicks start
	socket
		.off('update_start_requirements')
		.on('update_start_requirements', (data: any) => {
			setTargetWords(data.wordList)
			router.push(`/lobby/${data.lobby}_${data.password}/${data.gameId}`)
		})

	// Triggered when scoreboard is updated
	socket
		.off('update_opponent_score')
		.on('update_opponent_score', (data: any) => {
			host
				? setOpponentScore(data.scores.guest)
				: setOpponentScore(data.scores.host)
		})

	return (
		<GameContext.Provider
			value={{
				lobbyLoading,
				updateLobbyLoading,
				opponent,
				updateOpponent,
				timeLimit,
				updateTime,
				wordLimit,
				updateWord,
				score,
				updateScoreContext,
				opponentScore,
				host,
				updateHostContext,
				startGame,
				targetWords,
				currentTarget,
				gameOver,
				newGame,
				playAgain,
			}}
		>
			{children}
		</GameContext.Provider>
	)
}

export function useGame(): IGameContext {
	return useContext(GameContext)
}
