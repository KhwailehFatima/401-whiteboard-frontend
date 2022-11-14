import { createContext, useContext } from "react";
import cookies from "react-cookies";
import { login, logout, signup } from "../actions/authActions";
import { useReducer } from "react";
import { AuthReducer } from "../reducers/authReducer";
import { authData } from "../config/initials";


const AuthContext = createContext();
export const useAuth = () => useContext( AuthContext );


const AuthContextProvider = ( props ) => {
    const [ auth, dispatch ] = useReducer( AuthReducer, authData );

    const authObj = {
        username: JSON.parse( localStorage.getItem( 'username' ) ),
        token: cookies.load( 'token' ),
        user_id: JSON.parse( localStorage.getItem( 'user_id' ) ),
        role: JSON.parse( localStorage.getItem( 'role' ) ),
        capabilities: JSON.parse( localStorage.getItem( 'capabilities' ) ) ? JSON.parse( localStorage.getItem( 'capabilities' ) ) : [],
        isAuth: JSON.parse( localStorage.getItem( 'isAuth' ) ) ? JSON.parse( localStorage.getItem( 'isAuth' ) ) : false,
    };

    const handleSignIn = async ( e ) => {
        e.preventDefault();
        const userInput = {
            'username': e.target.username.value,
            'password': e.target.password.value,
        };
        login( dispatch, { username: userInput.username, password: userInput.password } );
    };

    const handleSignUp = async ( e ) => {
        e.preventDefault();
        if ( e.target.password.value !== e.target.confirmPassword.value ) {
            alert( 'Passwords do not match' );
            return;
        } else {
            const userObject = {
                'username': e.target.username.value,
                'password': e.target.password.value,
                'email': e.target.email.value,
                'role': e.target.role.value
            };
            signup( dispatch, userObject );
        };
    };

    const handleSignOut = () => {
        logout( dispatch );
    };
    const canDo = ( role, postId ) => {
        if ( authObj.capabilities.includes( role ) || parseInt( authObj.user_id ) === postId ) {
            return true;
        } else {
            return false;
        }
    };
    const value = { handleSignIn, handleSignUp, handleSignOut, authObj, canDo, auth };
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;