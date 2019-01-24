import { AsyncStorage } from 'react-native'
import { FLASHCARDS_STORAGE_KEY } from './flashcards'

export function saveDecker(decker) {
	return AsyncStorage.mergeItem(
		FLASHCARDS_STORAGE_KEY,
		JSON.stringify(decker)
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
