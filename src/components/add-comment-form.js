import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
 import Card from 'react-bootstrap/Card';
import { useContext } from "react";
import { postContext } from "../Context/postContext";

function AddCommentForm(props) {

   const {handleSubmitCommentForm}=useContext(postContext)


  return (

    <>
      <Form onSubmit={handleSubmitCommentForm} className="commentForm">

      <Card style={{ width: '18rem' }}>
         <Card.Body>
          
          <Card.Title>Write a comment ...</Card.Title>
          <Card.Text>
          <Form.Control as="textarea" rows={3} placeholder="Write a comment ..." name="comment" autoComplete="" required />

          </Card.Text>
          <Button variant="success" type="submit">
          Add Comment
        </Button>     
           </Card.Body>
      </Card>


      </Form>
    </>
  );
}

export default AddCommentForm;