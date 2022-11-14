import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { useAuth } from "../Context/authContext";
import { authData } from "../config/initials";


export default function Header() {

    const { role, userName,  handleLogout, } = useContext(useAuth)

    return (
        <div className="App-header">
            <h1 className="myheader" > Get started to our whiteboard </h1>
            {auttob.isAuth ?
                <div>
                    <h3>Hello {userName}, you are {role} </h3>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
                : null}
        </div>
    )
}