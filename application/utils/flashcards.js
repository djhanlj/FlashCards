

export const FLASHCARDS_STORAGE_KEY = 'flashcards'


export function estruturaDeck(nameDeck) {
    const key = this.removeSpaces(nameDeck)
    return {
        [key]: {
            title: nameDeck,
            questions: []
        }
    }
}

/*export function get(nameDeck) {
    return {
        [nameDeck]: {
            title: nameDeck,
            questions: []
        }
    }
} */

function removeSpaces(nameDeck){
    return nameDeck.replace(/\s/g, '');
}