import React, { useState } from "react";
import { Modal, Button, Form} from "react-bootstrap";
import axios from "axios";
import Cookies from "react-cookies";

function EditModal(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = async (e, id) => {
        e.preventDefault();
        const updatedPost = {
          postTitle: e.target.editTitle.value,
          postContent: e.target.editContent.value,
          userID: Cookies.load('userId'),
          creator: Cookies.load('userName')
        };

        console.log(updatedPost);
        console.log(id);
        await axios.put(`${process.env.REACT_APP_HEROKU_URI}/post/${id}`, updatedPost, {
            headers: {
              Authorization: `Bearer ${Cookies.load("token")}`,
            },
          }
        );
        props.getAllPosts();
        handleClose();
      };
    
        return (
            <div >
                <Button variant="primary" onClick={handleShow}>Edit Post</Button> 

                <Modal className="modal" show={show} onHide={handleClose} >
                          <Modal.Header closeButton>
                            <Modal.Title>Edit Post</Modal.Title>
                          </Modal.Header>

                          <Modal.Body >
                            <Form onSubmit={(e) => handleEdit(e, props.post.id)}>
                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
                                <Form.Label>Post Title</Form.Label>
                                <Form.Control type="text" autoFocus defaultValue={props.post.postTitle} name="editTitle" required/>
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Post Content</Form.Label>
                                <Form.Control as="textarea" rows={5} defaultValue={props.post.postContent} name="editContent" required/>
                              </Form.Group>

                              <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>Close</Button>
                                <Button variant="primary" type="submit" >Save Changes</Button>
                              </Modal.Footer>
                            </Form>
                            
                          </Modal.Body>
                  </Modal>
            </div>
        )

}

export default EditModal;