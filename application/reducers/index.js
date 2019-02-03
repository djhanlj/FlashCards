import {
	RECEIVE_DECKER,
	ADD_DECKER,
	RESET_DECKER,
	UPDATE_DECKER_CARDS
} from '../actions'

function decks(state = {}, action) {
	switch (action.type) {
	case RECEIVE_DECKER:
		return action.decks

	case ADD_DECKER:
		return {
			...state,
			...action.deck
		}
	case RESET_DECKER:
		return {}

	case UPDATE_DECKER_CARDS:
		return {
			...state,
			[action.id]: {
				...state[action.id].questions,
				questions: [...state.questions, action.questions]
			}
		}

	default:
		return state
	}
}
export default decks
