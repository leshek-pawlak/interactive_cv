import {
    SET_EDIT_MODE,
} from '../actions/index'

const initialState = {
    editMode: false,
}

export default function pages(state = initialState, action = {}) {
    switch (action.type) {
        case SET_EDIT_MODE:
            // reducer needs to return a new object of state
            return {
                ...state,
                editMode: action.editMode,
            }
        default:
            return state
    }
}
