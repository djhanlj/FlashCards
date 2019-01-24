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

function removeSpaces(nameDeck) {
	return nameDeck.replace(/\s/g, '')
}
