import {
    SET_CONTENT,
    SET_EDIT_MODE,
} from '../actions/index'

const initialState = {
    editMode: false,
    content: null,
}

export default function pages(state = initialState, action = {}) {
    switch (action.type) {
        case SET_CONTENT:
            return {
                ...state,
                content: action.content,
            }
        case SET_EDIT_MODE:
            return {
                ...state,
                editMode: action.editMode,
            }
        default:
            return state
    }
}
