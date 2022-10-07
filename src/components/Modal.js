import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'react-cookies';

function ShowModal(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = async (e, id) => {
        const editedPost = {
            postTitle: e.target.editTitle.value,
            postContent: e.target.editContent.value
        }
        await axios.put(`${process.env.REACT_APP_HEROKU_URI}/post/${id}`,editedPost,{
            headers: {
                Authorization:`Bearer ${Cookies.load("token")}`
            }
        });
        props.getAllPosts();
        handleClose();
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}> Edit Post </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleEdit} >
                        <Form.Group className="mb-3" id="content">
                            <Form.Label className="label" >Post Title</Form.Label>
                            <Form.Control className="modal" autoFocus type="text" defaultValue={props.post.postTitle } name="editTitle" />
                        </Form.Group>

                        <Form.Group className="mb-3" id="content">
                            <Form.Label className="label" >Post Content</Form.Label>
                            <Form.Control className="modal" autoFocus type="text" defaultValue={props.post.postContent } name="editContent" />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ShowModal;