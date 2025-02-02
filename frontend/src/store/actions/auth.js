import React from 'react'


import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, username ) => {
    return {
        type: actionTypes.AUTH_SUCESS,
        token: token,
        username: username
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }

}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('expirationDate')

    return {
        type: actionTypes.AUTH_LOGOUT,

    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart())
        axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            username: username,
            password: password
        })
        .then(res => {
            console.log(res.data.token)
            const token = res.data.key;
            const expirationTime = new Date(new Date().getTime() + 3600 *1000)
            localStorage.setItem('token', token)
            localStorage.setItem('username', username);
            localStorage.setItem('expirationTime', expirationTime);
            dispatch(authSuccess(username, token));
            dispatch(checkAuthTimeout(3600))
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (username, email ,password1, password2) => {
    return dispatch => {
        dispatch(authStart())
        axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res => {
            const token = res.data.token;
            const expirationTime = new Date(new Date().getTime() + 3600 *1000)
            localStorage.setItem('token', token)
            localStorage.setItem('username', usernmae);
            localStorage.setItem('expirationTime', expirationTime);
            dispatch(authSuccess(username, token));
            dispatch(checkAuthTimeout(3600))
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authCheckstate = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const username= localStorage.getItem('username');

        if (token == undefined) {
            dispatch(logout());
        } else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if (expirationTime <= new Date() ) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(username, token));
                dispatch(checkAuthTimeout( (expirationTime.getTime() - new Date().getTime()) / 1000) );
                
            }
        } 
    }
}

