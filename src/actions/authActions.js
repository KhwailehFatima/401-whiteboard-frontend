import { actionType } from "../config/constants";
import base64 from "base-64";
import axios from "axios";
import cookies from "react-cookies";

export const login = ( dispatch, payload ) => {
    try {
        dispatch( { type: actionType.REQUEST_LOGIN } );
        const encoded = base64.encode( `${payload.username}:${payload.password}` );
        axios.post( `${process.env.REACT_APP_SERVER_URL}/signin`,
            {},
            {
                headers: {
                    'Authorization': `Basic ${encoded}`
                }
            }
        ).then( ( res ) => {
            if ( res.status === 200 ) {
                dispatch( { type: actionType.LOGIN_SUCCESS, payload: res.data } );
                cookies.save( 'token', res.data.token );
                localStorage.setItem( 'username', JSON.stringify( res.data.user.username ) );
                localStorage.setItem( 'userId', JSON.stringify( res.data.user.id ) );
                localStorage.setItem( 'role', JSON.stringify( res.data.user.role ) );
                localStorage.setItem( 'capabilities', JSON.stringify( res.data.user.capabilities ) );
                localStorage.setItem( 'isAuth', JSON.stringify( true ) );
            }
        }
        ).catch( ( err ) => {
            dispatch( { type: actionType.LOGIN_FAILED, payload: err } );
            localStorage.clear();
            localStorage.setItem( 'isAuth', JSON.stringify( false ) );
        }
        );
    }
    catch ( error ) {
        dispatch( { type: actionType.LOGIN_FAILED, payload: error } );
        localStorage.clear();
        localStorage.setItem( 'isAuth', JSON.stringify( false ) );
    }
};

export const logout = ( dispatch ) => {
    dispatch( { type: actionType.LOGOUT } );
    localStorage.clear();
    cookies.remove( 'token' );
    localStorage.setItem( "isAuth", JSON.stringify( false ) );
};

export const signup = ( dispatch, payload ) => {
    try {
        console.log(payload);
        dispatch( { type: actionType.REQUEST_SIGNUP } );
        axios.post( `${process.env.REACT_APP_HEROKU_URI}/signup`, payload ).then( ( res ) => {
            if ( res.status === 200 ) {
                dispatch( { type: actionType.SIGNUP_SUCCESS, payload: res.data } );
                cookies.save( 'token', dispatch.token );
                localStorage.setItem( 'username', JSON.stringify( res.data.user.username ) );
                localStorage.setItem( 'user_id', JSON.stringify( res.data.user.id ) );
                localStorage.setItem( 'role', JSON.stringify( res.data.user.role ) );
                localStorage.setItem( 'capabilities', JSON.stringify( res.data.user.capabilities ) );
                localStorage.setItem( 'isAuth', JSON.stringify( true ) );
            }
        } ).catch( ( err ) => {
            dispatch( { type: actionType.SIGNUP_FAILED, payload: err } );
            localStorage.clear();
            localStorage.setItem( 'isAuth', JSON.stringify( false ) );
        } );
    }
    catch ( error ) {
        dispatch( { type: actionType.SIGNUP_FAILED, payload: error } );
        localStorage.clear();
        localStorage.setItem( 'isAuth', JSON.stringify( false ) );
    }
};