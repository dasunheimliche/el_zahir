import axios from 'axios';
import { getConfig } from './helpers';
import { LOCAL_API, VERCEL_API, RENDER_API } from './constants';

const vercelAPI = LOCAL_API || VERCEL_API;
const renderAPI = LOCAL_API || RENDER_API;

export async function fetchPost(postID) {
  try {
    return await axios.get(vercelAPI.concat(`/api/post/${postID}`));
  } catch (error) {
    console.error(error);
  }
}

export async function fetchMyPosts() {
  const config = getConfig();
  try {
    return await axios.get(vercelAPI.concat('/api/post/my-posts'), config);
  } catch (error) {}
}

export async function fetchUserPosts(userID) {
  const tokenValue = window.localStorage.getItem('token');
  const token = `Bearer ${tokenValue}`;

  const config = {
    headers: {
      Authorization: token,
    },
    params: { userID },
  };

  return await axios.get(vercelAPI.concat('/api/post/user-posts'), config);
}

export async function fetchFollowingPosts() {
  const config = getConfig();
  try {
    return await axios.get(
      vercelAPI.concat('/api/post/following-posts'),
      config
    );
  } catch (error) {
    console.error(error);
  }
}

export async function fecthExplorePosts() {
  const config = getConfig();
  try {
    return await axios.get(
      vercelAPI.concat('/api/post/discover-posts'),
      config
    );
  } catch (error) {
    console.error(error);
  }
}

export async function toggleLike(variables) {
  const isliked = variables.post.likes.some((id) => id === variables.user.id);

  try {
    return await axios.put(
      vercelAPI.concat(`/api/post/like/${variables.post.id}`),
      { meId: variables.user.id, mode: isliked ? 'unlike' : 'like' },
      getConfig()
    );
  } catch (error) {
    console.error(error);
  }
}

export async function deletePost(post) {
  try {
    const { imgkitID, id } = post;
    const token = window.localStorage.getItem('token');

    const config = {
      data: { imgkitID },
      headers: { Authorization: `Bearer ${token}` },
    };

    return await axios.delete(`${vercelAPI}/api/post/${id}`, config);
  } catch (error) {
    console.error(error);
  }
}

export async function postImageFromUrl(url, title, subtitle) {
  try {
    const tokenValue = window.localStorage.getItem('token');
    const token = `Bearer ${tokenValue}`;

    let config = {
      headers: {
        Authorization: token,
      },
    };

    return await axios.post(
      vercelAPI.concat('/api/post/image-url'),
      { title, subtitle, imagePost: url, type: 'image' },
      config
    );
  } catch (error) {
    console.error(error);
  }
}

export async function postImageFromFile(file, title, subtitle) {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('type', 'image');

    const tokenValue = window.localStorage.getItem('token');
    const token = `Bearer ${tokenValue}`;

    let config = {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    };

    return await axios.post(
      renderAPI.concat('/api/post/image-file'),
      formData,
      config
    );
  } catch (error) {
    console.error(error);
  }
}

export async function postVideoFromUrl(url, title, subtitle, aspectRatio) {
  try {
    const tokenValue = window.localStorage.getItem('token');
    const token = `Bearer ${tokenValue}`;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    return await axios.post(
      vercelAPI.concat('/api/post/video-url'),
      { title, subtitle, videoPost: url, videoAr: aspectRatio, type: 'video' },
      config
    );
  } catch (error) {
    console.error(error);
  }
}

export async function postVideoFromFile(file, title, subtitle) {
  try {
    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('type', 'video-file');

    const tokenValue = window.localStorage.getItem('token');
    const token = `Bearer ${tokenValue}`;

    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    };

    return await axios.post(
      renderAPI.concat('/api/post/video-file'),
      formData,
      config
    );
  } catch (error) {
    console.error(error);
  }
}

export async function postText(title, text) {
  try {
    const tokenValue = window.localStorage.getItem('token');
    const token = `Bearer ${tokenValue}`;

    const config = {
      headers: {
        Authorization: token,
      },
    };
    return await axios.post(
      vercelAPI.concat('/api/post'),
      { title, textPost: text, type: 'text' },
      config
    );
  } catch (error) {
    console.error(error);
  }
}

export async function postQuote(author, work, quote) {
  try {
    const tokenValue = window.localStorage.getItem('token');
    const token = `Bearer ${tokenValue}`;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    return await axios.post(
      vercelAPI.concat('/api/post'),
      { title: author, subtitle: work, textPost: quote, type: 'cita' },
      config
    );
  } catch (error) {
    console.error(error);
  }
}
