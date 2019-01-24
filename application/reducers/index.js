import { RECEIVE_DECKER, ADD_DECKER, RESET_DECKER } from '../actions'

function decks(state = {}, action) {
	switch (action.type) {
	case RECEIVE_DECKER:
		return {
			...state,
			...action.decks
		}
	case ADD_DECKER:
		return {
			...state,
			...action.deck
		}
	case RESET_DECKER:
		return {}

	default:
		return state
	}
}
export default decks
