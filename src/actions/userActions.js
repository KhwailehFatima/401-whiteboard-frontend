import { actionType } from "../config/constants";
import axios from "axios";
import Cookies from "react-cookies";


export const getAllPostsAction = (dispatch) => {
    try {
        axios.get( `${process.env.REACT_APP_HEROKU_URI}/post`, {
            headers: {
                Authorization: `Bearer ${Cookies.load( 'token' )}`
            }
        } )
            .then( ( res ) => {
                dispatch( { type: actionType.GET_ALL_DATA, payload: res.data } );
            } ).catch( ( err ) => {
                console.log( err );
            } );
    }
    catch ( error ) {
        console.log( error );
    }
};

export const handleSubmitPostAction = (dispatch, payload) => {
    try {
        axios.post(
            `${process.env.REACT_APP_HEROKU_URI}/post`,
            payload, {
            headers: {
                'Authorization': `bearer ${Cookies.load( 'token' )}`
            }
        }
        ).then( (res) => {
            console.log( 'post added' );
            dispatch( { type: actionType.ADD_POST, payload: res.data } );
        } );
        }
        catch ( error ) {
            console.log( error );
        }
}

export const handleEditPostAction = ( dispatch, payload ) => {
    try {
        axios.put( `${process.env.REACT_APP_HEROKU_URI}/post/${payload.id}/${localStorage.getItem( 'user_id' )}`, payload.post, {
            headers: {
                'Authorization': `Bearer ${Cookies.load( 'token' )}`
            }
        } ).then( ( res ) => {
            console.log( 'post edited' );
            dispatch( { type: actionType.EDIT_POST, payload: res.data } );
        } )
        .catch( ( err ) => {
            console.log( err );
        })
    }
    catch ( error ) {
        console.log( error );
    }
}

export const handlePostDeleteAction = async (dispatch, payload) => {
    try {
        axios.delete( `${process.env.REACT_APP_HEROKU_URI}/post/${payload}/${localStorage.getItem( 'user_id' )}`, {
            headers: {
                'Authorization': `Bearer ${Cookies.load( 'token' )}`
            }
        } ).then( ( res ) => {
            console.log( 'post deleted' );
            dispatch( { type: actionType.DELETE_POST, payload: res.data } );
        } )
        .catch( ( err ) => {
            console.log( err );
        })
    }
    catch ( error ) {
        console.log( error );
    }
};

export const handleAddCommentAction = ( dispatch, payload ) => {
    try {
        axios.post( `${process.env.REACT_APP_HEROKU_URI}/comment/${payload.postId}/${localStorage.getItem( 'user_id' )}`, payload.comment
        )
        .then( ( res ) => {
            console.log( 'comment added' );
            dispatch( { type: actionType.ADD_COMMENT, payload: res.data } );
        } )
        .catch( ( err ) => {
            console.log( err );
        })
    }
    catch ( error ) {
        console.log( error );
    }
}

export const handleCommentDeleteAction = async (payload, dispatch) => {
    try {
        axios.delete( `${process.env.REACT_APP_HEROKU_URI}/post/${payload}/${localStorage.getItem( 'user_id' )}`, {
            headers: {
                'Authorization': `Bearer ${Cookies.load( 'token' )}`
            }
        } ).then( ( res ) => {
            console.log( 'post deleted' );
            dispatch( { type: actionType.DELETE_COMMENT, payload: res.data } );
        } )
        .catch( ( err ) => {
            console.log( err );
        })
    }
    catch ( error ) {
        console.log( error );
    }
};