

export const FLASHCARDS_STORAGE_KEY = 'flashcards'


export function estruturaDeck(nameDeck) {
    const key = removeSpaces(nameDeck)
    const objeto = {
        [key]: {
            title: nameDeck,
            questions: []
        }
    }

    return objeto
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