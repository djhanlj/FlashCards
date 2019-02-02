import { AsyncStorage } from 'react-native'
import { FLASHCARDS_STORAGE_KEY, formatDeck } from '../utils/flashcards'

export function saveDeckTitle(titleDecker) {
	return AsyncStorage.mergeItem(
		FLASHCARDS_STORAGE_KEY,
		JSON.stringify(formatDeck(titleDecker))
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
