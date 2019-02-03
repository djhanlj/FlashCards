import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const FLASHCARDS_STORAGE_KEY = 'flashcards'
const NOTIFICATION_KEY = 'flashcards:notifications'

export function formatDeck(titleDecker) {
	const key = removeSpaces(titleDecker)
	const corpo = estruturaDeck(titleDecker)
	const deck = { [key]: corpo }
	return deck
}

export function formatCardToDeck(titleDecker, Deck) {
	const key = removeSpaces(titleDecker)
	const deck = { [key]: Deck }
	return deck
}

export function estruturaDeck(nameDeck) {
	return {
		title: nameDeck,
		questions: []
	}
}

export function estruturaQuestao(questao, resposta) {
	const objetoQuestao = {
		id: timeToString(),
		question: questao,
		answer: resposta
	}
	return objetoQuestao
}

export function removeSpaces(nameDeck) {
	return nameDeck.replace(/\s/g, '')
}

export function timeToString() {
	return (
		Date.now().toString(36) +
		Math.random()
			.toString(36)
			.substr(2)
	)
}

export function clearLocalNotification() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
		Notifications.cancelAllScheduledNotificationAsync
	)
}

function createNotification() {
	return {
		title: 'Tá na hora do Quiz!',
		body: '👋 Não esqueça de fazer o Quiz hoje!',
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true
		}
	}
}

export function setLocalNotification() {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then(data => {
			if (data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS).then(
					({ status }) => {
						if (status === 'granted') {
							Notifications.cancelAllScheduledNotificationsAsync()
							let tomorrow = new Date()
							tomorrow.setDate(tomorrow.getDate() + 1)
							tomorrow.setHours(21)
							tomorrow.setMinutes(0)
							Notifications.scheduleLocalNotificationAsync(
								createNotification(),
								{
									time: tomorrow,
									repeat: 'day'
								}
							)
							AsyncStorage.setItem(
								NOTIFICATION_KEY,
								JSON.stringify(true)
							)
						}
					}
				)
			}
		})
}
