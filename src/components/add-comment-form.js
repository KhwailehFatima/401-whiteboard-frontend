import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';
// import { useContext } from "react";
// import { postContext } from "../Context/postContext";
import axios from "axios";
import cookies from 'react-cookies'


function AddCommentForm(props) {

  // const { handleSubmitCommentForm } = useContext(postContext)
  const handleSubmitCommentForm = async (e) => {
    e.preventDefault();
    const userID = cookies.load('userId');

    const newComment = {
      comment: e.target.comment.value,
    };
    console.log(newComment)
    await axios.post(`${process.env.REACT_APP_HEROKU_URI}/comment/${props.postID}/${userID}`, newComment).then(() => {
      props.getAllPosts();
    });
    console.log(`${process.env.REACT_APP_HEROKU_URI}/comment/${props.postID}/${userID}`)
  }
 
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