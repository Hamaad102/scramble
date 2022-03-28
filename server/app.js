const colors = require('colors')
const express = require('express')
const http = require('http')
const cors = require('cors')
const app = express()
const { Server } = require('socket.io')
const { v4: uuidv4 } = require('uuid')

// Utility
const targetWords = require('./utility/targetWords')

app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
	cors: {
		origin: ['http://localhost:3000'],
		methods: ['GET', 'POST'],
	},
})

const activeLobbies = {}

io.on('connection', (socket) => {
	const room = io.sockets.adapter.rooms

	socket.emit('lobby_list', { activeLobbies })

	socket.on('disconnect', () => {
		for (const key of Object.keys(activeLobbies)) {
			if (socket.id in activeLobbies[key].players) {
				if (Object.keys(activeLobbies[key].players).length === 1)
					delete activeLobbies[key]
				else {
					delete activeLobbies[key].players[socket.id]
					socket.to(key).emit('remove_player')
				}
			}
		}
		socket.leave(socket.id)
	})

	socket.on('create_lobby', (data, callback) => {
		const uniqueName = `lobby-${data.lobby}-${data.password}`
		for (const [key, value] of room) {
			const name = key.split('-')
			if (name[0] === 'lobby') {
				if (name[1] === data.lobby) {
					callback(false)
				}
			}
		}
		socket.join(uniqueName)
		socket.leave(socket.id)
		activeLobbies[uniqueName] = {
			players: {
				[socket.id]: { username: data.username, score: 0 },
			},
			time_limit: 1,
			word_limit: 6,
			scoreboard: { host: -1, guest: -1 },
			playAgain: 0,
		}
		io.sockets.emit('lobby_list', { activeLobbies })
		callback(true)
	})

	socket.on('leave_lobby', (data) => {
		for (const [key, value] of room) {
			const name = key.split('-')
			if (name[1] === data.lobby) {
				socket.join(socket.id)
				socket.leave(key)
				if (Object.keys(activeLobbies[key].players).length === 1)
					delete activeLobbies[key]
				else delete activeLobbies[key].players[socket.id]
				socket.to(key).emit('remove_player')
				io.sockets.emit('lobby_list', { activeLobbies })
			}
		}
	})

	socket.on('join_lobby', (data, callback) => {
		for (const [key, value] of room) {
			const name = key.split('-')
			if (name[1] === data.lobby) {
				if (name[2] === data.password) {
					if (Object.keys(activeLobbies[key].players).length !== 2) {
						socket.join(key)
						socket.leave(socket.id)
						activeLobbies[key].players[socket.id] = {
							username: data.username,
							score: 0,
						}
						socket.to(key).emit('new_player', { opponent: data.username })
						io.sockets.emit('lobby_list', { activeLobbies })
						callback(true, activeLobbies[key])
					} else callback(false, 'lobby full')
				} else callback(false, 'wrong password')
			}
		}
		callback(false, 'Lobby does not exist')
	})

	// Change Time Limit
	socket.on('update_time', (data) => {
		for (const [key, value] of room) {
			const name = key.split('-')
			if (name[1] === data.lobby) {
				activeLobbies[key].time_limit = data.time
				socket.to(key).emit('update_time_opponent', { time: data.time })
			}
		}
	})

	// Change Word Limit
	socket.on('update_word', (data) => {
		for (const [key, value] of room) {
			const name = key.split('-')
			if (name[1] === data.lobby) {
				activeLobbies[key].word_limit = data.word
				socket.to(key).emit('update_word_opponent', { word: data.word })
			}
		}
	})

	// Start Game
	socket.on('start_game', (data) => {
		let wordList = []
		let gameId = uuidv4()
		for (const [key, value] of room) {
			const name = key.split('-')
			if (name[1] === data.lobby) {
				for (let i = 0; i < activeLobbies[key].word_limit; i++) {
					let rand = Math.floor(Math.random() * targetWords.length + 1)
					wordList.push(targetWords[rand])
				}
				socket.to(key).emit('update_start_requirements', {
					wordList,
					gameId,
					lobby: data.lobby,
					password: name[2],
				})
			}
		}
	})

	// Update score and emit to players
	socket.on('game_over', (data) => {
		for (const [key, value] of room) {
			const name = key.split('-')
			if (name[1] === data.lobby) {
				data.host
					? (activeLobbies[key].scoreboard.host = data.score)
					: (activeLobbies[key].scoreboard.guest = data.score)
				socket.to(key).emit('update_opponent_score', {
					scores: activeLobbies[key].scoreboard,
				})
			}
		}
	})

	socket.on('play_again', (data) => {
		for (const [key, value] of room) {
			const name = key.split('-')
			if (name[1] === data.lobby) {
				activeLobbies[key].playAgain = activeLobbies[key].playAgain + 1
				if (activeLobbies[key].playAgain === 2) {
					activeLobbies[key].scoreboard.host = -1
					activeLobbies[key].scoreboard.guest = -1
					activeLobbies[key].playAgain = 0
					socket.to(key).emit('change_to_lobby')
				}
			}
		}
	})
})

module.exports = { app, server }
