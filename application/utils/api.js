import { AsyncStorage } from 'react-native'
import { FLASHCARDS_STORAGE_KEY, estruturaDeck } from './flashcards'


export function saveDecker(key) {
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(estruturaDeck(key)))
}

export function getDecker() {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(console.log)
}