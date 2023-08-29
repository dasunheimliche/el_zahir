import axios from 'axios';
import { LOCAL_API, VERCEL_API } from './constants';

const vercelAPI = LOCAL_API || VERCEL_API;

export async function fetchComments(post) {
  try {
    return await axios.get(vercelAPI.concat('/api/comment'), {
      params: { postId: post.id },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function fetchSubComments(comment) {
  try {
    return await axios.get(vercelAPI.concat('/api/comment'), {
      params: { commentId: comment.id },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function sendComment(post, user, value, placeholder, commentID) {
  const person = `@${placeholder.split('@')[1]}`;
  const commentText = placeholder ? `${person} ${value}` : value;
  const comment = {
    username: user.username,
    comment: commentText,
    postID: post.id,
    commentID: commentID,
    userID: post.user,
  };

  try {
    return await axios.post(vercelAPI.concat('/api/comment'), comment);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteComment(variables) {
  const tokenString = window.localStorage.getItem('token');
  const token = `Bearer ${tokenString}`;
  const config = {
    headers: {
      Authorization: token,
    },
    params: {
      postUserId: variables.post.user,
      commentUserId: variables.comment.userID,
    },
  };
  try {
    return await axios.delete(
      vercelAPI.concat(`/api/comment/${variables.comment.id}`),
      config
    );
  } catch (error) {
    console.error(error);
  }
}
