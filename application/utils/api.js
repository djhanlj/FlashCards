import { AsyncStorage } from 'react-native'
import { FLASHCARDS_STORAGE_KEY, estruturaDeck } from './flashcards'


export function saveDecker(key) {
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY,
        JSON.stringify(estruturaDeck(key)
        ));
}

//export function getDecker() {
//return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
/*.then(res => res.json())
    .then(data => data.data) */
/*.then((value) => {
    console.log("value " + value)
    return value
})*/
//}

export function fetchDeckers() {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        
}

export async function getDeckerAsync() {
    try {
        const value = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
        return JSON.parse(value);
    } catch (error) {
        // Handle errors here
    }
}

export const clearAsyncStorage = async () => {
    AsyncStorage.clear();
}