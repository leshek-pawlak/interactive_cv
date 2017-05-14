export const SET_EDIT_MODE = 'SET_EDIT_MODE'

export function setEditMode(action) {
    return {
        type: SET_EDIT_MODE,
        editMode: action === 'edit',
    }
}
