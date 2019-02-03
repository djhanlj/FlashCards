import { AsyncStorage } from 'react-native'
import {
	FLASHCARDS_STORAGE_KEY,
	formatDeck,
	formatCardToDeck,
	removeSpaces
} from '../utils/flashcards'

export function saveDeckTitle(titleDecker) {
	return AsyncStorage.mergeItem(
		FLASHCARDS_STORAGE_KEY,
		JSON.stringify(formatDeck(titleDecker))
	)
}

export function addCardToDeck(titleDecker, deck) {
	return AsyncStorage.mergeItem(
		FLASHCARDS_STORAGE_KEY,
		JSON.stringify(formatCardToDeck(titleDecker, deck))
	)
}

export async function getDeckerAsync() {
	try {
		const value = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		return JSON.parse(value)
	} catch (error) {
		// Handle errors here
	}
}

export async function removeDeck(titleDecker) {
	try {
		const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		console.log(results)
		const decks = JSON.parse(results)
		console.log(decks)
		delete decks[removeSpaces(titleDecker)]
		console.log(decks)

		AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
	} catch (error) {
		// Handle errors here
	}
}

export const clearAsyncStorage = async () => {
	AsyncStorage.clear()
}
