import axios from "axios";
import cookies from 'react-cookies'
import { createContext, useState } from "react";

export const postContext = createContext();

 const PostContextProvider = (props) => {

    /*************************************UserPost*******************************/
    const [posts, setPosts] = useState([]);
    const [ setAlertUser] = useState(false);

    const getAllPosts = async () => {
      const allPosts = await axios.get(`${process.env.REACT_APP_HEROKU_URI}/post`, {
        headers: {
          Authorization: `Bearer ${cookies.load('token')}`
        },
      }
      );
      setPosts(allPosts.data.post)
    };

      const handlePostDelete = async (id) => {
        await axios.delete(`${process.env.REACT_APP_HEROKU_URI}/post/${id}`, {
          headers: {
            Authorization: `Bearer ${cookies.load("token")}`,
          },
        });
        getAllPosts();
        setAlertUser(true);
      };
      const handleCommentDelete = async (id) => {
        await axios.delete(`${process.env.REACT_APP_HEROKU_URI}/comment/${id}`, {
          headers: {
            Authorization: `Bearer ${cookies.load("token")}`,
          },
        });
        getAllPosts();
      };
  
/***************************************************add-post-form*********************************/

const [alert, setAlert] = useState(false);

const handleSubmitPostForm = async (e) => {
    e.preventDefault();
    const newPost = {
        postTitle: e.target.title.value,
        postContent: e.target.content.value
    };
    await axios.post(`${process.env.REACT_APP_HEROKU_URI}/post`, newPost, {
        headers: {
          Authorization: `Bearer ${cookies.load('token')}`,
        }
    }).then( () => {
        getAllPosts();
        setAlert(true);
    });
}
/***************************************************add-comment-form*********************************/
const handleSubmitCommentForm = async (e) => {
    e.preventDefault();
    const userID = cookies.load('userId');

    const newComment = {
      comment: e.target.comment.value,
    };
     await axios.post(`${process.env.REACT_APP_HEROKU_URI}/comment/${props.postID}/${userID}`, newComment).then(() => {
 
      props.getAllPosts();
    });
  }
/***************************************************Modal*********************************/



const value = {handleSubmitCommentForm, handleSubmitPostForm,setAlertUser, getAllPosts, handlePostDelete, handleCommentDelete, posts };

    return (
        <postContext.Provider value={value}>
            {props.children}
        </postContext.Provider>
    )

}

export default PostContextProvider;