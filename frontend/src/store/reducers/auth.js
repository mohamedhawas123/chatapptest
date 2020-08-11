import React from 'react'
import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

export const initalState = {
    token : null,
    username: null, 
    error: null,
    loading: false
}

export const authstart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

export const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.username,
        username: action.token,
        error: null,
        loading: false
    })
}

export const authLogout = (state) => {
    return updateObject(state, {
        token: null,
        username: null
    });
}

export const authFail = (state, action) => {
    return updateObject(state, {
        
        error: action.error,
        loading: false
    })
}




const authReducer = (state = initalState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authstart(state, action);
        case actionTypes.AUTH_SUCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
}
export default authReducer;
