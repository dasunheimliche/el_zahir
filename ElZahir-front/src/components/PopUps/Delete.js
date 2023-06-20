import style from '../../styles/popups.module.css'
import { useState } from 'react';
import axios from 'axios'
import baseURL from '../../services/baseURL'
import { useDispatch} from 'react-redux'
import { userSlice} from '../../reducers/userSlice'


const Delete = ({post, setPopUp})=> {
    let [loading, setLoading] = useState(false)

    let dispatch = useDispatch()

    const deletePost = async()=> {
        try {
            setLoading(true);
            const { imgkitID, id } = post;
            const { token } = JSON.parse(window.localStorage.getItem('loggedUser'));
      
            const config = {
                data: { imgkitID },
                headers: { Authorization: `Bearer ${token}` },
            };
      
            await axios.delete(`${baseURL}/api/post/${id}`, config);
            const loguedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
            const updatedPostList = loguedUser.posts.filter((singlePost) => singlePost !== id);
      
            window.localStorage.setItem('loggedUser', JSON.stringify({ ...loguedUser, posts: updatedPostList }));

            dispatch(userSlice.actions.update({ ...loguedUser, posts: updatedPostList }));
            setPopUp({type:'none', post:null})
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className={style['delete-background']}>
            <div className={style[`delete-alert-container`]}>
                <div>Are you sure you want to delete this post?</div>
                <div className={style[`delete-alert-buttons`]}>
                    <button className={`${style.button} p`} onClick={()=>setPopUp({type:'none', post:null})}>CANCEL</button>
                    <button className={`${style.button} ${style.delete} p`} onClick={loading? undefined : deletePost} >DELETE</button>
                </div>
            </div>    
        </div>            
    )
}

export default Delete