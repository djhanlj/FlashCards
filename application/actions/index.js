import * as API from '@api/api'
import { formatDeck } from '../utils/flashcards'

export const RECEIVE_DECKER = 'RECEIVE_DECKER'
export const ADD_DECKER = 'ADD_DECKER'
export const RESET_DECKER = 'RESET_DECKER'
export const UPDATE_DECKER_CARDS = 'UPDATE_DECKER_CARDS'

export function handleInitialData() {
	return dispatch =>
		API.getDeckerAsync().then(decks => {
			dispatch(receiveDecker(decks))
		})
}

export function receiveDecker(decks) {
	return {
		type: RECEIVE_DECKER,
		decks
	}
}

export function addDecker(titleDecker) {
	const deck = formatDeck(titleDecker)
	return {
		type: ADD_DECKER,
		deck
	}
}

export function resetDecker() {
	return {
		type: RESET_DECKER
	}
}

export function updateDeckerCards(questions, title) {
	return {
		type: UPDATE_DECKER_CARDS,
		questions,
		id: title
	}
}
