import { createContext, useState } from "react";
import base64 from 'base-64'
import axios from "axios";
import Cookies from 'react-cookies'

export const authContext = createContext();

const AuthContextProvider = (props) => {
   
   
    /************************************app functions********************************** */
    let [isLoggedin, setisLoggedin] = useState(false);//app
    const [role, setRole] = useState('');
    const [theUser, settheUser] = useState({});
    const [capabilities, setCapabilities] = useState();
     const checkToken = () => {
        const token = Cookies.load('token');
        const role = Cookies.load('role');
        const capabilities = Cookies.load('capabilities');
        
        
        if (token) {
            settheUser(Cookies.load("userName"))
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
    const userName = Cookies.load('userName');
    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('userName');
        Cookies.remove('userId');
        Cookies.remove('email');
        Cookies.remove('role');
        Cookies.remove('capabilities')
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
            //  console.log(process.env.REACT_APP_HEROKU_URI)
            await axios.post(`${process.env.REACT_APP_HEROKU_URI}/signup`, data)
                .then((res) => {
                    console.log(res)
                    window.location.href = '/post';
                }).catch((error) => console.log(error));
        } else {
            setisPassword(true)
            console.log('password does not match')
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
                Cookies.remove();
                Cookies.save('token', res.data.token);
                Cookies.save('userName', res.data.user.username);
                Cookies.save('userId', res.data.user.id);
                Cookies.save('email', res.data.user.email);
                Cookies.save('role', res.data.user.role);
                Cookies.save('capabilities', JSON.stringify(res.data.user.capabilities));
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