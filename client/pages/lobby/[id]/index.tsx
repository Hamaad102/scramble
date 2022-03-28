import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
	useState,
	useEffect,
	forwardRef,
	ForwardedRef,
	RefAttributes,
} from 'react'
import { motion } from 'framer-motion'

import type { NextPage } from 'next'

import {
	Button,
	Card,
	CircularProgress,
	CssBaseline,
	Container,
	Stack,
	SvgIcon,
	ThemeProvider,
	Typography,
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import SelectUnstyled, {
	selectUnstyledClasses,
	SelectUnstyledProps,
} from '@mui/base/SelectUnstyled'
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled'
import PopperUnstyled from '@mui/base/PopperUnstyled'
import { styled } from '@mui/system'

// Context
import { useGame } from '../../../Context/useGameContext'
import { useSocket } from '../../../Context/useSocketContext'
import { useSettings } from '../../../Context/useSettingsContext'

// Themes
import light from '../../../styles/themes/lightThemeOptions'
import dark from '../../../styles/themes/darkThemeOptions'

// Style
import {
	SmallButton,
	LobbyName,
	PlayerName,
	SettingsStyle,
} from '../../../styles/size'
import { AltButtonColors, CardStyle, StartButton } from '../../../styles/colors'

const LobbyId: NextPage = () => {
	//Context
	const { darkMode, username } = useSettings()
	const { joinLobby, exitLobby, lobbyName: ln } = useSocket()
	const {
		lobbyLoading,
		updateLobbyLoading,
		opponent,
		host,
		timeLimit,
		updateTime,
		wordLimit,
		updateWord,
		startGame,
	} = useGame()

	const router = useRouter()

	const StyledButton = styled('button')(
		({ theme }) => `
		font-family: Fira Sans, sans-serif;
		font-weight: 300;
		font-size: 2.625rem;
		margin-top: 35px!important;
		box-sizing: border-box;
		height: 3.5rem;
		background: ${theme.palette.primary.main};
		border: none;
		border-bottom: 2px solid ${theme.palette.secondary.main};
		color: ${theme.palette.secondary.main};
		&:hover {
			cursor: pointer;
		  	border-color: ${theme.palette.primary.main};
		}
		&.${selectUnstyledClasses.disabled} {
			border-color: ${theme.palette.primary.main};
			&:hover {
				cursor: default;
			}
		}
		`
	)

	const StyledListbox = styled('ul')(
		({ theme }) => `
		font-family: Fira Sans, sans-serif;
		font-weight: 300;
		font-size: 2.625rem;
		box-sizing: border-box;
		background: ${theme.palette.primary.main};
		border: 1px solid ${theme.palette.secondary.main};
		border-radius: 0;
		color: ${theme.palette.secondary.main};
		overflow: auto;
		width: 8rem;
		padding: 5px;
  		margin: 10px 0;
		`
	)

	const StyledOption = styled(OptionUnstyled)(
		({ theme }) => `
		list-style: none;
		border-radius: 0px;
		cursor: pointer;
		&:last-of-type {
		  border-bottom: none;
		}
	  
		&.${optionUnstyledClasses.selected} {
		  background-color: ${theme.palette.secondary.main};
		  color: ${theme.palette.primary.main};
		}
	  
		&.${optionUnstyledClasses.highlighted} {
		  background-color: ${theme.palette.secondary.main};
		  color: ${theme.palette.primary.main};
		}
	  
		&.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
		  background-color: ${theme.palette.secondary.main};
		  color: ${theme.palette.primary.main};
		}
	  
		&.${optionUnstyledClasses.disabled} {
		  color: white;
		}
	  
		&:hover:not(.${optionUnstyledClasses.disabled}) {
		  background-color: ${theme.palette.secondary.main};
		  color: ${theme.palette.primary.main};
		}
		`
	)

	const StyledPopper = styled(PopperUnstyled)`
		z-index: 1;
	`

	const CustomSelect = forwardRef(function CustomSelect<TValue>(
		props: SelectUnstyledProps<TValue>,
		ref: ForwardedRef<HTMLUListElement>
	) {
		const components: SelectUnstyledProps<TValue>['components'] = {
			Root: StyledButton,
			Listbox: StyledListbox,
			Popper: StyledPopper,
			...props.components,
		}

		return <SelectUnstyled {...props} ref={ref} components={components} />
	}) as <TValue>(
		props: SelectUnstyledProps<TValue> & RefAttributes<HTMLUListElement>
	) => JSX.Element

	// @ts-ignore
	const updateTimer = (e: ChangeEvent) => updateTime(e, ln)
	// @ts-ignore
	const updateWordLimit = (e: ChangeEvent) => updateWord(e, ln)

	useEffect(() => {
		if (ln) updateLobbyLoading(false)
		else {
			if (router.isReady) {
				const outerRoute: string = router.asPath.split('/')[2]
				const innerRoute: Array<string> = outerRoute.split('_')
				if (innerRoute.length === 2) {
					joinLobby(innerRoute[0], innerRoute[1], false)
				} else router.push('/join')
			}
		}
	}, [router.isReady])

	const [back, setBack] = useState<boolean>(false)

	const container = {
		hidden: {
			opacity: 0,
			x: 150,
			transition: {
				duration: 0.3,
				ease: 'linear',
			},
		},
		show: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.3,
				ease: 'linear',
			},
		},
		hiddenExit: {
			opacity: 0,
			x: back ? 150 : -150,
			transition: {
				duration: 0.3,
				ease: 'linear',
			},
		},
	}

	const item = {
		hidden: { opacity: 0, x: 100 },
		show: { opacity: 1, x: 0 },
	}

	return (
		<ThemeProvider theme={darkMode ? dark : light}>
			<div>
				<Head>
					<title>Scramble - {ln}</title>
					<link
						rel='apple-touch-icon'
						sizes='180x180'
						href='/apple-touch-icon.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='32x32'
						href='/favicon-32x32.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='16x16'
						href='/favicon-16x16.png'
					/>
					<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
				</Head>
				<main>
					<CssBaseline />
					<Container sx={{ height: '100%', pb: '2rem' }}>
						{lobbyLoading ? (
							<Stack mt='30vh' alignItems='center'>
								<CircularProgress sx={{ color: 'secondary.main' }} size={150} />
							</Stack>
						) : (
							<Stack
								sx={{ height: 'inherit', marginTop: '3vh' }}
								spacing={6}
								alignItems='center'
							>
								<SvgIcon
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 598 148'
									sx={{
										width: {
											sm: '275px',
											xs: '155px',
										},
										height: 'auto',
									}}
								>
									<g id='Logo' transform='translate(-760 -246.538)'>
										<rect
											id='Rectangle_2'
											data-name='Rectangle 2'
											width='105'
											height='148'
											transform='translate(760 246.538)'
											fill={darkMode ? '#616161' : '#011C26'}
										/>
										<path
											id='Path_2'
											data-name='Path 2'
											d='M39.624,157.286a90.153,90.153,0,0,1-18.8-2.472q-11.21-2.472-17.742-7.591l9-20.3a62.507,62.507,0,0,0,12.446,4.237,53.291,53.291,0,0,0,11.917,1.765,11.791,11.791,0,0,0,5.3-1.059,3.183,3.183,0,0,0,2.118-2.825q0-1.059-2.383-2.56a28.334,28.334,0,0,0-6.091-2.736q-13.417-4.767-21.979-11.3A20.529,20.529,0,0,1,4.845,95.32q0-13.417,10.063-21.008T42.8,66.72a77.026,77.026,0,0,1,16.683,2.03A38.549,38.549,0,0,1,75.109,75.9l-9,20.3A71.579,71.579,0,0,0,55.248,92.5,41.543,41.543,0,0,0,45.1,91.083a16.271,16.271,0,0,0-6.355,1.059Q36.27,93.2,36.27,94.967q0,1.059,2.472,2.472a39.814,39.814,0,0,0,6.532,2.825q13.241,4.59,21.626,11.21a20.915,20.915,0,0,1,8.386,17.213q0,13.594-9,21.1T39.624,157.286Z'
											transform='translate(773.414 211.452)'
											fill={darkMode ? '#011C26' : '#25ffdf'}
										/>
										<path
											id='Path_3'
											data-name='Path 3'
											d='M38.537,55.192a44.683,44.683,0,0,1,11.652,1.942,39.9,39.9,0,0,1,11.652,5.132l-5.132,12.9A63.775,63.775,0,0,0,47.276,71.7a33.234,33.234,0,0,0-8.6-1.11,15.723,15.723,0,0,0-12.415,5.687Q21.337,81.963,21.337,90.7t4.855,14.287a15.832,15.832,0,0,0,12.484,5.548,33.233,33.233,0,0,0,8.6-1.11,63.773,63.773,0,0,0,9.432-3.468L61.841,119a30.883,30.883,0,0,1-11.236,5.132,48.92,48.92,0,0,1-12.068,1.8,39.86,39.86,0,0,1-18.934-4.3A29.868,29.868,0,0,1,7.119,109.359,38.23,38.23,0,0,1,2.75,90.7,38.633,38.633,0,0,1,7.119,71.976,30.192,30.192,0,0,1,19.6,59.561,39.341,39.341,0,0,1,38.537,55.192Zm75.736,16.229q-4.577,0-11.3,3.329a57.564,57.564,0,0,0-12.553,8.461V124.27H72.383V57h9.432L87.78,68.231a58.478,58.478,0,0,1,11.374-7.768Q105.674,57,110.667,57Zm35.094.416a44.142,44.142,0,0,0-10.126,1.318,50.034,50.034,0,0,0-9.432,3.121L124.955,61.3q3.606-2.358,11.513-4.231a57.94,57.94,0,0,1,12.623-1.873,33.583,33.583,0,0,1,14.7,3.19,26.665,26.665,0,0,1,10.611,8.878,21.838,21.838,0,0,1,3.953,12.761V124.27h-11.79l-3.052-7.213q-8.461,8.878-17.755,8.878-12.068,0-18.171-5.9t-6.1-15.882q0-10.265,6.936-15.882t18.587-5.618h13.178q-.139-5.132-2.982-7.976A10.591,10.591,0,0,0,149.368,71.837Zm-2.636,22.887a9.525,9.525,0,0,0-7.144,2.774,9.2,9.2,0,0,0-2.7,6.658,6.911,6.911,0,0,0,2.427,5.271,8.8,8.8,0,0,0,6.173,2.219q8.045,0,14.842-6.658V94.725Zm150.224-15.4V124.27H278.924V82.934q0-6.519-2.011-9.848a6.841,6.841,0,0,0-6.311-3.329,15.348,15.348,0,0,0-7.629,1.942,99.462,99.462,0,0,0-8.878,5.826V124.27H236.062V82.934q0-6.519-2.011-9.848a6.841,6.841,0,0,0-6.311-3.329A15.348,15.348,0,0,0,220.11,71.7a97.8,97.8,0,0,0-9.016,5.965V124.27H193.062V57h11.79l3.052,7.213a56.449,56.449,0,0,1,12.9-6.936,33.918,33.918,0,0,1,11.652-2.5q13.732,0,18.587,9.155A58.463,58.463,0,0,1,263.8,57.2a33.615,33.615,0,0,1,11.513-2.427q11.513,0,16.576,6.173T296.956,79.328Zm80.453,11.1a40.456,40.456,0,0,1-4.092,18.587,29.437,29.437,0,0,1-11.86,12.484q-7.768,4.439-18.449,4.439a23.836,23.836,0,0,1-8.739-1.8,39.227,39.227,0,0,1-8.461-4.577L322.2,124.27h-9.155v-96.4l17.894-1.526v31.9a27.9,27.9,0,0,1,12.623-3.052q15.674,0,24.76,9.5T377.409,90.425Zm-18.587,0q0-8.878-4.231-14.357a13.98,13.98,0,0,0-11.721-5.479,21.673,21.673,0,0,0-11.929,4.023v32.042a20.83,20.83,0,0,0,11.929,3.884,13.9,13.9,0,0,0,11.652-5.618Q358.822,99.3,358.822,90.425ZM407.787,26.34v97.93H389.893v-96.4Zm46.33,28.852q10.126,0,17.061,4.716A28.052,28.052,0,0,1,481.442,72.6a45.861,45.861,0,0,1,3.329,17.824v5.548H439.413q1.387,7.074,6.034,10.819t14.218,3.745a30.607,30.607,0,0,0,9.987-1.526,57.51,57.51,0,0,0,9.571-4.439l5.271,13.039a39.753,39.753,0,0,1-11.1,6.173,41.775,41.775,0,0,1-14.149,2.15q-19.142,0-29.06-9.363T420.271,90.7a40.777,40.777,0,0,1,4.092-18.726,29.24,29.24,0,0,1,11.721-12.415A35.674,35.674,0,0,1,454.116,55.192Zm-.416,15.4a13.315,13.315,0,0,0-9.294,3.4q-3.745,3.4-4.855,9.918H467.71q-1.387-6.658-4.924-9.987A12.723,12.723,0,0,0,453.7,70.589Z'
											transform='translate(872.948 243.787)'
											fill={darkMode ? '#616161' : '#011c26'}
										/>
									</g>
								</SvgIcon>
								<motion.div
									variants={container}
									initial='hidden'
									animate='show'
									exit='hiddenExit'
								>
									<Stack spacing={{ sm: 3, xs: 2 }} alignItems='center'>
										<Stack
											direction='row'
											spacing={{ sm: 2, xs: 1 }}
											justifyContent='center'
										>
											<Link href='/' passHref>
												<Button
													sx={{ ...AltButtonColors, ...SmallButton }}
													onClick={() => {
														setBack(true)
														exitLobby(ln)
													}}
												>
													<ArrowBackIosIcon className='chevron' />
												</Button>
											</Link>

											{/* @ts-ignore */}
											<Card sx={{ ...CardStyle, ...LobbyName }}>
												<Typography variant='h3'>{ln}</Typography>
											</Card>
										</Stack>
										<Stack
											direction={{
												sm: 'row',
												xs: 'column-reverse',
											}}
											spacing={{ sm: 2, xs: 2 }}
										>
											<Stack direction='column' spacing={{ sm: 2, xs: 2 }}>
												{/* @ts-ignore */}
												<Card sx={{ ...CardStyle, ...PlayerName }}>
													<Typography variant='h3'>{username}</Typography>
												</Card>
												{/* @ts-ignore */}
												{opponent ? (
													// @ts-ignore
													<Card sx={{ ...CardStyle, ...PlayerName }}>
														<Typography variant='h3'>{opponent}</Typography>
													</Card>
												) : (
													<></>
												)}
												<Button
													disabled={opponent ? false : true}
													sx={{
														...StartButton,
														display: host ? 'inline-flex' : 'none',
													}}
													onClick={() => startGame(ln)}
												>
													START
												</Button>
											</Stack>
											{/* @ts-ignore */}
											<Card sx={{ ...CardStyle, ...SettingsStyle }}>
												<Stack>
													<Typography variant='h3'>Settings</Typography>
													<Stack direction='row' spacing={8}>
														<Typography
															variant='h6'
															sx={{ fontSize: '42px !important' }}
															mt={4}
														>
															Timer:
														</Typography>
														<CustomSelect
															disabled={host ? false : true}
															value={timeLimit}
															onChange={updateTimer}
														>
															<StyledOption value={1}>1:00</StyledOption>
															<StyledOption value={2}>2:00</StyledOption>
															<StyledOption value={3}>3:00</StyledOption>
														</CustomSelect>
													</Stack>
													<Stack direction='row' spacing={7}>
														<Typography
															variant='h6'
															sx={{ fontSize: '42px !important' }}
															mt={4}
														>
															Words:
														</Typography>
														<CustomSelect
															disabled={host ? false : true}
															defaultValue={wordLimit}
															onChange={updateWordLimit}
														>
															<StyledOption value={1}>01</StyledOption>
															<StyledOption value={2}>02</StyledOption>
															<StyledOption value={3}>03</StyledOption>
															<StyledOption value={4}>04</StyledOption>
															<StyledOption value={5}>05</StyledOption>
															<StyledOption value={6}>06</StyledOption>
														</CustomSelect>
													</Stack>
													<Stack direction='row' justifyContent='center' mt={3}>
														<Typography
															variant='h3'
															align='center'
															sx={{
																fontSize: '30px !important',
																pt: '0.85rem',
																border: {
																	sm: '0.5rem solid',
																	xs: '0.5rem solid',
																},
																width: '80px',
																height: '80px',
																color: opponent
																	? 'success.main'
																	: 'secondary.main',
																borderRadius: 50,
															}}
														>
															{opponent ? '2/2' : '1/2'}
														</Typography>
													</Stack>
													<Typography
														variant='h6'
														sx={{
															fontSize: '42px !important',
															mt: 3,
															textDecoration: 'underline',
															display: host ? 'block' : 'none',
															'&:hover': {
																textDecoration: 'none',
																cursor: 'pointer',
															},
														}}
														onClick={() => {
															navigator.clipboard.writeText(location.href)
														}}
													>
														Share Link
													</Typography>
												</Stack>
											</Card>
										</Stack>
									</Stack>
								</motion.div>
							</Stack>
						)}
					</Container>
				</main>
			</div>
		</ThemeProvider>
	)
}

export default LobbyId
