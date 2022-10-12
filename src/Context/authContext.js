import { createContext, useReducer } from "react";
import base64 from 'base-64'
import { login, logout, signup } from "../actions/authActions";
import { AuthReducer } from "../reducers/authReducer";
import { initialState } from "../config/initials";


export const authContext = createContext();

const AuthContextProvider = (props) => {
    
    
    const userName = localStorage.getItem('userName')
    const [user, dispatch] = useReducer(AuthReducer, initialState)
    console.log(user)

    
    const handleLogout = () => {
        logout(dispatch)
    }
 
    const handleSignup = async (e) => {
        e.preventDefault();
        if (e.target.password.value !== e.target.confirmPassword.value) {
            alert('Password does not match')
            return
        }
        else {
            const data = {
                userName: e.target.userName.value,
                email: e.target.email.value,
                password: e.target.password.value,
                role: e.target.role.value,
            };
            signup(dispatch, data)
        };
    };

     const handleSignin = async (e) => {
        e.preventDefault();
        const user = {
            userName: e.target.userName.value,
            password: e.target.password.value,
        };
        const encoded = base64.encode(`${userName}:${user.password}`);
        login(dispatch, encoded)
        console.log(user)
    };

    const value = {
        handleSignin, handleSignup, handleLogout,
        userName
        
    };

    return (
        <authContext.Provider value={value} >
            {props.children}
        </authContext.Provider>
    )

}

export default AuthContextProvider;