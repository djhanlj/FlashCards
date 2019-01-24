export const FLASHCARDS_STORAGE_KEY = 'flashcards'

export function estruturaDeck(nameDeck) {
	return {
		title: nameDeck,
		questions: []
	}
}

export function estruturaQuestao(questao, resposta) {
	return {
		question: questao,
		answer: resposta
	}
}

export function removeSpaces(nameDeck) {
	return nameDeck.replace(/\s/g, '')
}
