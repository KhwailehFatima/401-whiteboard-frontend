import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
 import { authContext } from "../Context/authContext";



export default function Header() {

  const {role, userName, isLoggedin, handleLogout}=useContext(authContext)

    return (
        <div className="App-header">
            <h1 className="myheader" > Get started to our whiteboard </h1>
            { isLoggedin ? 
            <div>
                <h3>Hello {userName}, you are {role} </h3>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
            : null }
        </div>
    )
}