import {
	useState,
	useEffect,
	useContext,
	createContext,
	FunctionComponent,
} from 'react'

import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator'

interface ISettingsContext {
	darkMode: boolean
	updateDarkMode: (bool: boolean) => void
	username: string
	updateUsername: (name: string) => void
}

export const SettingsContext = createContext<ISettingsContext>({
	darkMode: false,
	updateDarkMode: () => null,
	username: '',
	updateUsername: () => null,
})

export const SettingsProvider: FunctionComponent = ({
	children,
}): JSX.Element => {
	const [darkMode, setDarkMode] = useState<boolean>(false)
	const [username, setUsername] = useState<string>('')

	const updateDarkMode = (bool: boolean) => {
		setDarkMode(bool)
		localStorage.setItem(
			'userSettings',
			JSON.stringify({ darkMode: bool, username })
		)
	}
	const updateUsername = (name: string) => {
		setUsername(name)
		localStorage.setItem(
			'userSettings',
			JSON.stringify({ darkMode, username: name })
		)
	}

	useEffect(
		() => {
			if (localStorage.getItem('userSettings')) {
				// @ts-ignore
				const userSettings = JSON.parse(localStorage.getItem('userSettings'))
				setDarkMode(userSettings.darkMode)
				setUsername(userSettings.username)
			} else {
				const uniqueUser = uniqueNamesGenerator({
					dictionaries: [colors, animals],
					length: 1,
				})
				setUsername(uniqueUser)
				localStorage.setItem(
					'userSettings',
					JSON.stringify({ darkMode, username: uniqueUser })
				)
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

	return (
		<SettingsContext.Provider
			value={{
				darkMode,
				updateDarkMode,
				username,
				updateUsername,
			}}
		>
			{children}
		</SettingsContext.Provider>
	)
}

export function useSettings(): ISettingsContext {
	return useContext(SettingsContext)
}
