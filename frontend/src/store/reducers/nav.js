import * as action from '../actions/actionTypes'
import {updateObject} from '../utility'


const initialState=  {
    showAddPop : true
}


export const openChat = (state, action) => {
    return updateObject (state, {
        showAddPop: true
    })
}

export const cluseChat = (state, action) => {
    return updateObject(state, {
        showAddPop: false
    })
}


const navReducer = (state= initialState, action) => {
    switch(action.type) {
        case action.OPEN_CHAT_POPUP : return openChat(state, action);
        case action.COLSE_CHAT_POPUP : return cluseChat(state, action);
        default:
            return state;
    }
}

export default navReducer