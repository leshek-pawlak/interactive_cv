export const SET_EDIT_MODE = 'SET_EDIT_MODE'
export const SET_CONTENT = 'SET_CONTENT'

export function setEditMode(action) {
    return {
        type: SET_EDIT_MODE,
        editMode: action === 'edit',
    }
}

export function setContent(content) {
    return {
        type: SET_CONTENT,
        content: content,
    }
}
