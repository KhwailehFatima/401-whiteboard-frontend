import { actionType } from "../config/constants";
 
 

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case actionType.REQUEST_LOGIN:
            return {
                ...state,
                loading: true
            }
        case actionType.LOGIN_SUCCESS:
            return {
                ...state,
                user: {
                    userName: action.payload.user.userName,
                    role: action.payload.user.role,
                    id: action.payload.user.id,
                    capability: action.payload.user.capability

                },
                token: action.payload,
                loading: false,
                isAuth: true
            }
        case actionType.LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload,
                isAuth: false
            }
        case actionType.LOGOUT:
            return {
                ...state,
                user: {},
                isAuth: false,
                token: ''
            }
        case actionType.REQUEST_SIGNUP:
            return {
                ...state,
                isAuth: false,
                loading: true
            }
        case actionType.SIGNUP_SUCCESS:
            return {
                ...state,
                isAuth: true,
                loading: false,
                user: {
                    userName: action.payload.userName,
                    id: action.payload.id,
                    token: action.payload.token,
                    role: action.payload.role,
                    capability: action.payload.capability
                }
            }
        case actionType.SIGNUP_FAILED:
            return {
                ...state,
                isAuth: false,
                loading: false,
                token: '',
                errorMessage: action.payload,
                user: ''
            }

        default:
            return state;
        // throw new Error(`Unkown action type ${action.type}`);

    }
}
