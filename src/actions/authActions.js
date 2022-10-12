import axios from "axios";
import { actionType } from "../config/constants";

export const login = async (dispatch, payload) => {
    try {
        //axios request and my dispatcher
        dispatch({
            type: actionType.REQUEST_LOGIN
        })
        await axios.post(`${process.env.REACT_APP_HEROKU_URI}/signin`, {},
            {
                headers: {
                    Authorization: `Basic ${payload}`,
                },
            }
        )
            .then((res) => {
                console.log(res.data)
                dispatch({
                    type: actionType.LOGIN_SUCCESS,
                    payload: res.data
                })
                console.log(res.data.user.username)
                localStorage.getItem('token', localStorage.setItem('token', res.data.token))
                localStorage.setItem('userName', JSON.stringify(res.data.user.username))
                localStorage.setItem('userID', JSON.stringify(res.data.user.id));
                localStorage.setItem('role', JSON.stringify(res.data.user.role));
                localStorage.setItem('capabilities', JSON.stringify(res.data.user.capability))
                localStorage.getItem('isAuth', JSON.stringify(true))
            })
            .catch(error =>
                dispatch({ type: actionType.LOGIN_FAILED, payload: error }));
        // localStorage.clear();
        localStorage.setItem('isAuth', JSON.stringify(false))
    } catch (error) {
        dispatch({
            type: actionType.LOGIN_FAILED,
            payload: error
        });

    }
}

export const logout = (dispatch) => {
    dispatch({ type: actionType.LOGOUT })
    localStorage.clear();
    localStorage.setItem('isAuth', JSON.stringify(false))
}

export const signup = async (dispatch, payload) => {
    try {
        dispatch({
            type: actionType.REQUEST_SIGNUP
        })
        await axios.post(`${process.env.REACT_APP_HEROKU_URI}/signup`, payload)
            .then((res) => {
                console.log(res)
                dispatch({
                    type: actionType.SIGNUP_SUCCESS,
                    payload: res.data
                });

                localStorage.getItem('token', localStorage.setItem('token', res.data.token))
                localStorage.setItem('userName', JSON.stringify(res.data.user.username))
                localStorage.setItem('userID', JSON.stringify(res.data.user.id));
                localStorage.setItem('role', JSON.stringify(res.data.user.role));
                localStorage.setItem('capabilities', JSON.stringify(res.data.user.capability))
                localStorage.getItem('isAuth', JSON.stringify(true));
                window.location.href = '/post';
            })
            .catch((error) =>
                dispatch({ type: actionType.SIGNUP_FAILED, payload: error }));
        // localStorage.clear();
        localStorage.setItem('isAuth', JSON.stringify(false))


    } catch (error) {
        dispatch({ type: 'LOGIN_FAILED', payload: error });

    }
}



