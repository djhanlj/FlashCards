import * as API from '../utils/api'
export const RECEIVE_DECKER = "RECEIVE_DECKER"
export const ADD_DECKER = "ADD_DECKER"
export const RESET_DECKER = "RESET_DECKER"

export function handleInitialData() {
    return (dispatch) => {
        return API.getDeckerAsync()
            .then(decks => {
                dispatch(receiveDecker(decks))
            })
    }
}


export function receiveDecker(decks) {
    return {
        type: RECEIVE_DECKER,
        decks,
    }
}

export function addDecker(deck) {
    return {
        type: ADD_DECKER,
        deck,
    }
} 

export function resetDecker() {
    return {
        type: RESET_DECKER,
    }
} 