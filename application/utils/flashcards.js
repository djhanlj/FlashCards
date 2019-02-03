export const FLASHCARDS_STORAGE_KEY = 'flashcards'

export function formatDeck(titleDecker) {
	const key = removeSpaces(titleDecker)
	const corpo = estruturaDeck(titleDecker)
	const deck = { [key]: corpo }
	return deck
}

export function formatCardToDeck(titleDecker, Deck) {
	const key = removeSpaces(titleDecker)
	const deck = { [key]: Deck }
	return deck
}

export function estruturaDeck(nameDeck) {
	return {
		title: nameDeck,
		questions: []
	}
}

export function estruturaQuestao(questao, resposta) {
	const objetoQuestao = {
		id: timeToString(),
		question: questao,
		answer: resposta
	}
	return objetoQuestao
}

export function removeSpaces(nameDeck) {
	return nameDeck.replace(/\s/g, '')
}

export function timeToString() {
	return (
		Date.now().toString(36) +
		Math.random()
			.toString(36)
			.substr(2)
	)
}
