import axios from "axios";
import Cookies from 'react-cookies'
import { createContext, useContext, useReducer } from "react";

import { handlePostDeleteAction, handleSubmitPostAction, getAllPostsAction,  handleAddCommentAction } from "../actions/userActions";
import React from "react";
import { UserReducer } from "../reducers/userReducer";
import { authData } from '../config/initials'
import { useState } from "react";


 export const PostContext = createContext();
export const usePostContext = () => useContext(PostContext);


 const PostContextProvider = (props) => {
  const [postObject, dispatch] = useReducer(UserReducer, { posts: authData.posts, edit: authData.edit })
  const [edit, setEdit] = useState(false);

  const getAllPosts = () => {
    getAllPostsAction(dispatch);
  };

  const handleSubmitPostForm = async (e) => {
    e.preventDefault();

    const post = {
      'title': e.target.title.value,
      'content': e.target.content.value,
      'img': e.target.img.value,
      'userID': localStorage.getItem('user_id'),
    };
    handleSubmitPostAction(dispatch, post);
    e.target.title.value = "";
    e.target.content.value = "";
    e.target.img.value = "";
  }

  // handleEditPostAction = (e, id) => {
  //   e.preventDefault();
  //   let title = e.target.title.value;
  //   let content = e.target.content.value;
  //   let obj = {
  //       title,
  //       content,
  //   };
  //   handleEditPostAction( dispatch, { id, post: obj } );
  //   getAllPosts();
  // }

  const handlePostDelete = async (id) => {
    handlePostDeleteAction(dispatch, id);
    getAllPosts();
  };

  const handleSubmitComment = async (e, postId) => {
    e.preventDefault();
    const comment = {
        'content': e.target.content.value,
    };
    handleAddCommentAction( dispatch, { postId, comment } )
    e.target.content.value = "";
  }
  const handleCommentDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_HEROKU_URI}/comment/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.load("token")}`,
      },
    });
    getAllPosts();
  };

  const value = {
    handleSubmitPostForm, handleSubmitComment,handlePostDelete, getAllPosts, handleCommentDelete, postObject
    // , handleSubmitComment
  };

  return (
    <PostContext.Provider value={value}>
      {props.children}
    </PostContext.Provider>
  );

};


export default PostContextProvider;