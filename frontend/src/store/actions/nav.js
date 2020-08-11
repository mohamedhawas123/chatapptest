import * as action from './actionTypes'



export const openAddChat = () => {
    return {
        type : action.OPEN_CHAT_POPUP
    }
}

export const closeAddChat = () => {
    return {
        type : action.COLSE_CHAT_POPUP
    }
}