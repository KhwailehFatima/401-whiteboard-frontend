 
import React  from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Stack } from "react-bootstrap";
 import Alert from "react-bootstrap/Alert";
import { useContext } from "react";
import { postContext } from "../Context/postContext";


function AddPostForm() {

  const { handleSubmitPostForm, setAlert, alert } = useContext(postContext);

  return (
    <div className="postForm">

      <h2>Enter Your Post Items Here!</h2>
      <Form onSubmit={handleSubmitPostForm}>
        <Stack gap={3} className="">
           <Form.Group id="title">
            <Form.Label>Post Title</Form.Label>
            <Form.Control className="input" type="text" placeholder="Enter Title" id="title" required />
          </Form.Group>

          <Form.Group id="content">
            <Form.Label>Post content</Form.Label>
            <Form.Control className="input" type="text" as="textarea" rows={10} placeholder="Enter Post Contents" id="content" required />
          </Form.Group>

          {alert && (
            <Alert key="strong" variant='success' onClose={() => setAlert(false)} dismissible>
              You added a post!
            </Alert>
          )}

          <Button variant="outline-dark" type="submit">
            Submit
          </Button>
        </Stack>

      </Form>



    </div>
  );
}

export default AddPostForm;