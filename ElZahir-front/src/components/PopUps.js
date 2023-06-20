import style from '../styles/home.module.css'

import PostImageUi from "./PopUps/PostImageUi"
import PostTextUi from "./PopUps/PostTextUi"
import PostCitaUi from "./PopUps/PostCitaUi"
import PostVideoUi from "./PopUps/PostVideoUi"

import ChangePI from "./PopUps/ChangePI"
import ChangePanImg from "./PopUps/ChangePanImg"

import Comments from "./PopUps/Comments"
import Delete from "./PopUps/Delete"
import Followers from "./PopUps/Following"
import Following from "./PopUps/Followers"

const PopUps = ({popUp, setPopUp, user})=> {

    return(
        <div className={popUp.type === 'none'? `${style.popups} ${style.hidden}` : popUp.post? style.popups : `${style.popups} ${style.open}`} >
            {popUp.type === 'image'         && <PostImageUi   setPopUp={setPopUp} />}
            {popUp.type === 'text'          && <PostTextUi    setPopUp={setPopUp} />}
            {popUp.type === 'cita'          && <PostCitaUi    setPopUp={setPopUp} />}
            {popUp.type === 'video'         && <PostVideoUi   setPopUp={setPopUp} />}
                    
            {popUp.type === 'changePI'      && <ChangePI      setPopUp={setPopUp} />}
            {popUp.type === 'changePanImg'  && <ChangePanImg  setPopUp={setPopUp} />}
                
            {popUp.type === 'comments'      && <Comments      setPopUp={setPopUp} post={popUp.post} />}
            {popUp.type === 'delete'        && <Delete        setPopUp={setPopUp} post={popUp.post}/>}
            {popUp.type === 'seeFollowers'  && <Followers     setPopUp={setPopUp} user={user}/>}
            {popUp.type === 'seeFollowings' && <Following     setPopUp={setPopUp} user={user}/>}
        </div>
    )
}

export default PopUps