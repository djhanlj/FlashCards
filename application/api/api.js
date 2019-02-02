import { AsyncStorage } from 'react-native'
import {
	FLASHCARDS_STORAGE_KEY,
	formatDeck,
	formatCardToDeck
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

export const clearAsyncStorage = async () => {
	AsyncStorage.clear()
}
