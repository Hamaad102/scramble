import socket from '../utility/Socket'
import { useRouter } from 'next/router'
import { useState, useContext, createContext, FunctionComponent } from 'react'

// Context
import { useSettings } from './useSettingsContext'
import { useGame } from './useGameContext'

interface ISocketContext {
	lobbyName: string
	lobbyPassword: string
	updateLobbyName: (lobby: string) => void
	updateLobbyPassword: (password: string) => void
	createLobby: (lobby: string, password: string) => void
	lobbyInUse: boolean
	updateLobbyInUse: (lobby: boolean) => void
	lobbyList: any
	joinLobby: (lobby: string, password: string, method: boolean) => void
	exitLobby: (lobby: string) => void
	filter: string
	updateFilter: (filt: string) => void
	joinError: string
	updateJoinError: (err: string) => void
	transition: boolean
	updateTransition: (bool: boolean) => void
}

export const SocketContext = createContext<ISocketContext>({
	lobbyName: '',
	lobbyPassword: '',
	updateLobbyName: () => null,
	updateLobbyPassword: () => null,
	createLobby: () => null,
	lobbyInUse: false,
	updateLobbyInUse: () => null,
	lobbyList: {},
	joinLobby: () => null,
	exitLobby: () => null,
	filter: '',
	updateFilter: () => null,
	joinError: '',
	updateJoinError: () => null,
	transition: false,
	updateTransition: () => null,
})

export const SocketProvider: FunctionComponent = ({
	children,
}): JSX.Element => {
	const router = useRouter()

	// Context
	const { username } = useSettings()
	const {
		updateOpponent,
		updateTime,
		updateWord,
		updateLobbyLoading,
		updateHostContext,
		newGame,
	} = useGame()

	// State
	const [lobbyName, setLobbyName] = useState<string>('')
	const [lobbyPassword, setLobbyPassword] = useState<string>('')
	const [lobbyInUse, setLobbyInUse] = useState<boolean>(false)
	const [lobbyList, setLobbyList] = useState<any>({})
	const [filter, setFilter] = useState<string>('')
	const [joinError, setJoinError] = useState<string>('')
	const [transition, setTransition] = useState<boolean>(false)

	const updateLobbyName = (lobby: string) => setLobbyName(lobby)

	const updateLobbyPassword = (password: string) => setLobbyPassword(password)

	const createLobby = (lobby: string, password: string) => {
		updateLobbyInUse(false)
		setLobbyName(lobby)
		setLobbyPassword(password)
		socket.emit(
			'create_lobby',
			{ lobby, password, username },
			(res: boolean) => {
				if (res) {
					updateHostContext(true)
					const url = `/lobby/${lobby}_${password}`
					router.push(url)
				} else {
					// If name in use we want this to be true to alert the user
					updateLobbyInUse(true)
				}
			}
		)
	}

	// This updates the state of whether the chosen lobby name is in use by another party or not
	const updateLobbyInUse = (nameUsed: boolean) => setLobbyInUse(nameUsed)

	const updateFilter = (filt: string) => setFilter(filt)

	const joinLobby = (lobby: string, password: string, method: boolean) => {
		socket
			.off('join_lobby')
			.emit(
				'join_lobby',
				{ username, lobby, password },
				(success: boolean, res: any) => {
					if (success) {
						updateLobbyName(lobby)
						updateLobbyPassword(password)
						updateTime(res.time_limit)
						updateWord(res.word_limit)
						updateOpponent('bob')
						updateOpponent(res.players[Object.keys(res.players)[0]].username)
						if (method) {
							const url = `/lobby/${lobby}_${password}`
							router.push(url)
						} else {
							updateLobbyLoading(false)
						}
					} else {
						setJoinError(res)
						updateLobbyLoading(false)
						router.push('/join')
					}
				}
			)
	}

	const updateJoinError = (err: string) => setJoinError(err)

	const exitLobby = (lobby: string) => {
		updateHostContext(false)
		updateOpponent('')
		updateLobbyInUse(false)
		updateLobbyName('')
		updateLobbyPassword('')
		updateHostContext(false)
		updateTime(1, lobby)
		updateWord(6, lobby)
		socket.emit('leave_lobby', { lobby, username })
	}

	const updateTransition = (bool: boolean) => setTransition(bool)

	// Triggered when a player is joining the users lobby
	socket
		.off('new_player')
		.on('new_player', (data) => updateOpponent(data.opponent))

	// Triggered when player leaves lobby
	socket.off('remove_player').on('remove_player', () => {
		updateOpponent('')
		updateHostContext(true)
	})

	// Triggered when lobby list is updated
	socket.off('lobby_list').on('lobby_list', (data) => {
		let list: any = {}
		if (Object.keys(data.activeLobbies).length) {
			for (const key in data.activeLobbies) {
				const name = key.split('-')
				list[name[1]] = data.activeLobbies[key]
			}
		}
		setLobbyList(list)
	})

	// Triggered when player who selects play again is redirected to lobby
	socket.off('change_to_lobby').on('change_to_lobby', () => {
		newGame()
		if (lobbyName !== '') {
			setTransition(false)
			router.push(`/lobby/${lobbyName}_${lobbyPassword}`)
		}
	})

	return (
		<SocketContext.Provider
			value={{
				lobbyName,
				lobbyPassword,
				updateLobbyName,
				updateLobbyPassword,
				createLobby,
				lobbyInUse,
				updateLobbyInUse,
				joinLobby,
				exitLobby,
				lobbyList,
				filter,
				updateFilter,
				joinError,
				updateJoinError,
				transition,
				updateTransition,
			}}
		>
			{children}
		</SocketContext.Provider>
	)
}

export function useSocket(): ISocketContext {
	return useContext(SocketContext)
}
