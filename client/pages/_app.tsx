import * as React from 'react'
import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import createEmotionCache from '../utility/createEmotionCache'

// Context Provider
import { SettingsProvider } from '../Context/useSettingsContext'
import { SocketProvider } from '../Context/useSocketContext'
import { GameProvider } from '../Context/useGameContext'
import { GuessProvider } from '../Context/useGuessContext'

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache
}

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const clientSideEmotionCache = createEmotionCache()

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
		router,
	} = props

	return (
		<SettingsProvider>
			<CacheProvider value={emotionCache}>
				<GameProvider>
					<SocketProvider>
						<GuessProvider>
							<CssBaseline />
							<AnimatePresence initial={false} exitBeforeEnter>
								<Component {...pageProps} key={router.route} />
							</AnimatePresence>
						</GuessProvider>
					</SocketProvider>
				</GameProvider>
			</CacheProvider>
		</SettingsProvider>
	)
}

export default MyApp
