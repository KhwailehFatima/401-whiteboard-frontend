import { createContext, useState } from "react";
import base64 from 'base-64'
import axios from "axios";
import cookies from 'react-cookies'

export const authContext = createContext();

const AuthContextProvider = (props) => {
   
   
    /************************************app functions********************************** */
    let [isLoggedin, setisLoggedin] = useState(false);//app
    const [role, setRole] = useState('');
    const [theUser, settheUser] = useState({});
    const [capabilities, setCapabilities] = useState();
     const checkToken = () => {
        const token = cookies.load('token');
        const role = cookies.load('role');
        const capabilities = cookies.load('capabilities');
        
        
        if (token) {
            settheUser(cookies.load("userName"))
            setisLoggedin(true)
            setRole(role)
            setCapabilities(capabilities)
            // console.log(capabilities)
            // userCanDo()
        }
    }

    const checkLoggedin = () => {
        setisLoggedin(true);
    }
    /********************** if i have a profile route************************ */

    // const userCanDo = () => {
    //     axios.get(`${process.env.REACT_APP_HEROKU_URI}/profile`,{},{
    //         headers:{
    //             Authorization:`Bearer ${cookies.load('token')}  `
    //         }
    //     }).then( res=> settheUser(res.data))
    // }
    const userName = cookies.load('userName');
    const handleLogout = () => {
        cookies.remove('token');
        cookies.remove('userName');
        cookies.remove('userId');
        cookies.remove('email');
        cookies.remove('role');
        cookies.remove('capabilities')
        setisLoggedin(false);
    }
    /************************************signup functions********************************** */
    const [isPassword, setisPassword] = useState(false);
    const handleSignup = async (e) => {
        e.preventDefault();
        if (e.target.password.value === e.target.confirmPassword.value) {
            const data = {
                userName: e.target.userName.value,
                email: e.target.email.value,
                password: e.target.password.value,
                role: e.target.role.value,

            };
             console.log(process.env.REACT_APP_HEROKU_URI)
            await axios.post(`${process.env.REACT_APP_HEROKU_URI}/signup`, data)
                .then((res) => {
                    console.log(res)
                    window.location.href = '/post';
                }).catch((error) => console.log(error));
        } else {
            setisPassword(true)
            console.log('password dont match')
        }

    };
    /************************************signin functions********************************** */
    const [isNotLogged, setIsNotLogged] = useState(false);
    const handleSignin = async (e) => {
        e.preventDefault();
        const user = {
            userName: e.target.userName.value,
            password: e.target.password.value,
        };

        const encoded = base64.encode(`${user.userName}:${user.password}`);
        await axios

            .post(`${process.env.REACT_APP_HEROKU_URI}/signin`, {},
                {
                    headers: {
                        Authorization: `Basic ${encoded}`,
                    },
                }
            )
            .then((res) => {
                settheUser(res.data)
                console.log(res.data)
                cookies.remove();
                cookies.save('token', res.data.token);
                cookies.save('userName', res.data.user.username);
                cookies.save('userId', res.data.user.id);
                cookies.save('email', res.data.user.email);
                cookies.save('role', res.data.user.role);
                cookies.save('capabilities', JSON.stringify(res.data.user.capabilities));
                checkLoggedin();

            })
            .catch((error) =>
                setIsNotLogged(true)
            );
    };

    const value = {
        handleSignin, handleSignup, handleLogout,
        userName, checkLoggedin, isLoggedin,
        setisLoggedin, isPassword, setisPassword,
        checkToken, role, theUser, capabilities
    };

    return (
        <authContext.Provider value={value} >
            {props.children}
        </authContext.Provider>
    )

}

export default AuthContextProvider;