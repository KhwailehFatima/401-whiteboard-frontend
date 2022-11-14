import { actionType } from "../config/constants"; 


export const UserReducer = ( state, action ) => {
    switch ( action.type ) {
        case actionType.GET_ALL_DATA:
            return {
                posts: action.payload,
                edit: false,
            };
        case actionType.ADD_POST:
            return {
                ...state,
                reRender: !state.reRender
            };
        // case actionType.SHOW_EDIT:
        //     return {
        //         ...state,
        //         showEdit: !state.showEdit,
        //     };
        case actionType.EDIT_POST:
            return {
                ...state,
                edit: true,
            };
        case actionType.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter( post => post._id !== action.payload.id ),
            };
        case actionType.ADD_COMMENT:
            return {
                ...state,
                reRender: !state.reRender
            };
        default:
            return state;
    }
};