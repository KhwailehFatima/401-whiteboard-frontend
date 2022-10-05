import React, { useEffect } from "react";
import AddPostForm from "./add-post-form";
import AddCommentForm from "./add-comment-form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import EditModal from "./Modal";
import { useContext } from "react";
import { postContext } from "../Context/postContext";
import cookies from 'react-cookies'
import { authContext } from "../Context/authContext";

export default function Post() {

  const { getAllPosts, handlePostDelete, handleCommentDelete, posts, role } = useContext(postContext);
  const { userName } = useContext(authContext)
  useEffect(() => {
    getAllPosts();

  }, []);

  return (
    <div className="parent-div">
      {/* {alert && (
        <Alert key="strong" variant="success" onClose={() => setAlertUser(false)} dismissible>
          Post has been deleted successfully!
        </Alert>
      )} */}

      <AddPostForm getAllPosts={getAllPosts} />

      <div className="cards">
        {posts &&
          posts.map((value, idx) => {
            return (
              <div key={idx} className="eachCard">

                <Card style={{ width: "18rem" }}>
                  <Card.Body className="eachCard">
                    <label className="post-p"> {userName.toUpperCase()} Post </label>

                    <Card.Title className="post-title">{value.postTitle}</Card.Title>
                    <Card.Text>{value.postContent}</Card.Text>


                    {role === "admin" || (cookies.load('userId') === value.userID) ? (

                      <div>

                        <EditModal post={value} getAllPosts={getAllPosts} />
                        <Button variant="danger" onClick={() => handlePostDelete(value.id)}>Delete Post</Button>
                      </div>
                    ) : null}

                  </Card.Body>

                  <AddCommentForm postID={value.id} getAllPosts={getAllPosts} />

                  {value.Comments &&
                    value.Comments.map((item, idx) => {
                      // console.log(item)
                      return (
                        <div key={idx}>
                          <Card className="commentCard" style={{ width: "18rem" }}>
                            <Card.Body>
                              <Card.Title className="commentCreator">{item.creator}</Card.Title>
                              <Card.Text className="comment">{item.comment}</Card.Text>

                              {role === "admin" ? (
                                <Button variant="danger" onClick={() => handleCommentDelete(item.id)}>Delete Comment</Button>
                              ) : null}

                            </Card.Body>
                          </Card>
                        </div>
                      );
                    })}
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
}
