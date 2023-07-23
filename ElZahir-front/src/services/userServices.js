import axios from "axios"
import { getConfig } from "./helpers"

import { LOCAL_API, VERCEL_API, RENDER_API } from "./constants";

const vercelAPI = LOCAL_API || VERCEL_API
const renderAPI = LOCAL_API || RENDER_API

export async function getCurrentUser() {

    const config = getConfig()

    try {
      return axios.post(`${vercelAPI}/api/users/me`,{}, config)
    } catch (error) {
      console.error(error)
    }
}

export async function getUser(userID) {
    try {
        return await axios.get(vercelAPI.concat(`/api/users/${userID}`), getConfig())
    } catch(error) {
        console.error(error)
    }
}

export async function getUserList() {

  try {
      return await axios.get(`${vercelAPI}/api/users`, getConfig());
      
  } catch (error) {
      console.error(error);
  }
}

export async function followUser(user, otherUser) {
    try {
        return await axios.put(`${vercelAPI}/api/users/follow/${otherUser.id}`, { id: user.id }, getConfig())
    } catch(error) {
        console.error(error)
    }
}

export async function unfollowUser(user, otherUser) {
    try {
        return await axios.put(`${vercelAPI}/api/users/unfollow/${otherUser.id}`, { id: user.id }, getConfig())
    } catch(error) {
        console.error(error)
    }
}

export async function changeProfileImageFromUrl(user, url) {

    try {
        const tokenValue = window.localStorage.getItem('token')
        const token = `Bearer ${tokenValue}`

        const config = {
            headers: {
                Authorization: token
            }
        }

        return await axios.put(vercelAPI.concat(`/api/users/profile-image/${user.id}`), {profileImg: url, mode:'profileImgURL'}, config)
    } catch(error) {
        console.error(error)
    }
}

export async function changeProfileImageFromFile(user, file) {

    try {
        const formData = new FormData()
        formData.append("image", file)
        formData.append("mode", "profileImgURL")
    
        const tokenValue = window.localStorage.getItem('token')
        const token = `Bearer ${tokenValue}`
    
        let config = {
            headers: {
                Authorization: token,
                "Content-Type": "multipart/form-data"
            }
        }
    
        return await axios.put(renderAPI.concat(`/api/users/profile-image/${user.id}`), formData, config)
    } catch(error) {
        console.error(error)
    }

}

export async function changeBackgroundImgFromUrl(user, url) {

    try {
        const tokenValue = window.localStorage.getItem('token')
        const token = `Bearer ${tokenValue}`

        let config = {
            headers: {
                Authorization: token
            }
        }

        return await axios.put(vercelAPI.concat(`/api/users/profile-panel-image/${user.id}`), {mainPanelImg: url, mode:'panelImgUrl'}, config)
    } catch(error) {
        console.error(error)
    }
}

export async function changeBackgroundImgFromFile(user, file) {

    try {
        const formData = new FormData()
        formData.append("image", file)
        formData.append("mode", "profileImgURL")
    
        const tokenValue = window.localStorage.getItem('token')
        const token = `Bearer ${tokenValue}`
    
        let config = {
            headers: {
                Authorization: token,
                "Content-Type": "multipart/form-data"
            }
        }
  
        return await axios.put(renderAPI.concat(`/api/users/profile-panel-image/${user.id}`), formData, config)
    } catch(error) {
        console.error(error)
    }
}

