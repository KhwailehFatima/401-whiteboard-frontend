import { actionType } from "../config/constants"; 

export const AuthReducer = ( state, action ) => {
    switch ( action.type ) {
        case actionType.REQUEST_LOGIN:
            return {
                ...state,
                loading: true,
                isAuth: false,
            };
        case actionType.LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                loading: false,
                user: {
                    username: action.payload.user.username,
                    id: action.payload.user.id,
                    role: action.payload.user.role,
                    capabilities: action.payload.user.capabilities,
                },
            };
        case actionType.LOGIN_FAILED:
            return {
                ...state,
                isAuth: false,
                loading: false,
                error: action.payload,
                user: {}
            };
        case actionType.LOGOUT:
            return {
                ...state,
                isAuth: false,
                user: {}
            };
        case actionType.REQUEST_SIGNUP:
            return {
                ...state,
                isAuth: false,
                loading: true,
            };
        case actionType.SIGNUP_SUCCESS:
            return {
                ...state,
                isAuth: true,
                loading: false,
                user: {
                    username: action.payload.username,
                    user_id: action.payload.user_id,
                    role: action.payload.role,
                    token: action.payload.token,
                    capabilities: action.payload.capabilities,
                }
            };
        case actionType.SIGNUP_FAILED:
            return {
                ...state,
                isAuth: false,
                loading: false,
                error: action.payload,
                user: {}
            };
        default:
            return state;
    }
};