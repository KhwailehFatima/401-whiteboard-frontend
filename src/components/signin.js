import React from "react";
import { useContext } from "react";
import Form from "react-bootstrap/Form";
import { useAuth } from '../Context/authContext';

export default function Signin( ) {

  const { handleSignin  } = useAuth();

  return (
    <div className="signin-div">
      <div >
        <img className="signin-img" width='500' src="https://pamdi.org/wp-content/uploads/2017/08/join-us.jpg" alt="" />
      </div>

      <div className="signin-form">
        <h2>Sign In</h2>

        <Form onSubmit={handleSignin}>
          <Form.Group className="signin-input" id="title">
            <Form.Label className="label" >Username</Form.Label>
            <Form.Control className="input" type="text" placeholder="userName" id="userName" autoComplete="userName" />
          </Form.Group>

          <Form.Group className="signin-input" id="content">
            <Form.Label className="label" >Password</Form.Label>
            <Form.Control className="input" type="password" placeholder="password" id="password" autoComplete="current-password" />
          </Form.Group>

           

          <button className="signin-button" type="submit">Sign In</button>
          <p className="signin-p" > You don't have an account? Join to my website <a href="/signup">Sign up now</a></p>
        </Form>
      </div>


    </div>
  );
}