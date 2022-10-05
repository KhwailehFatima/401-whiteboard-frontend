import React from "react";
 import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
 import Alert from "react-bootstrap/Alert";
 import { authContext } from '../Context/authContext';
import { useContext } from "react";


export default function Signup() {

 const {handleSignup, isPassword}=useContext(authContext);
    
    return (
        <div className="signin-div">
            <div>
                <img className="signin-img" width='500' src="https://pamdi.org/wp-content/uploads/2017/08/join-us.jpg" alt="" />
            </div>
            <div className="signin-form">
                <h2>Sign Up</h2>

                <Form onSubmit={handleSignup}>
                    <Form.Group className="signin-input" id="title">
                        <Form.Label className="label">Username</Form.Label>
                        <Form.Control className="input" type="text" placeholder="username" id="userName" autoComplete="username" required />
                    </Form.Group>

                    <Form.Group className="signin-input" id="content">
                        <Form.Label className="label">Email</Form.Label>
                        <Form.Control className="input" type="text" placeholder="email" id="email" autoComplete="email" required />
                    </Form.Group>

                    <Form.Group className="signin-input" id="content">
                        <Form.Label className="label">Password</Form.Label>
                        <Form.Control className="input" type="password" placeholder="password" id="password" autoComplete="new-password" required />
                    </Form.Group>

                    <Form.Group className="signin-input" id="content">
                        <Form.Label className="label">Confirm Password</Form.Label>
                        <Form.Control className="input" type="password" placeholder="confirm password" id="confirmPassword" autoComplete="new-password" required />
                    </Form.Group>

                    <Form.Group className="signin-input" id="content">
                        <Form.Label className="label">Select Your role</Form.Label>
                        <Form.Select name="role" className="input" >
                            <option value="user" className="role1"> User</option>
                            <option value="admin" className="role2">Admin</option>
                        </Form.Select>
                    </Form.Group>

                    {isPassword &&
                        <Alert key="strong" variant="danger">
                            The password entered does not match! Please try again.
                        </Alert>}

                    <Button className="signin-button" variant="outline-dark" type="submit">
                        Sign Up
                    </Button>

                    <p className="signin-p">Already Registered? <a href="/signin">Sign in</a></p>


                </Form>
            </div>

        </div>
    );
}