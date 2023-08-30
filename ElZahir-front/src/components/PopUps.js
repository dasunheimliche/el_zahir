import style from '../styles/home.module.css';

import PostImageUi from './PopUps/PostImageUi';
import PostTextUi from './PopUps/PostTextUi';
import PostCitaUi from './PopUps/PostCitaUi';
import PostVideoUi from './PopUps/PostVideoUi';

import ChangePI from './PopUps/ChangePI';
import ChangePanImg from './PopUps/ChangePanImg';

import Comments from './PopUps/Comments';
import Delete from './PopUps/Delete';
import Following from './PopUps/Following';
import Followers from './PopUps/Followers';

export default function PopUps({ popUp, setPopUp, user }) {
  // const postImageUI = popUp.type === 'image'
  // const postTextUI = popUp.type === 'text'
  // const postQuoteUI = popUp.type === 'cita'
  // const postVideoUI = popUp.type === 'video'
  // const changePI = popUp.type === 'changePI'
  // const changCI = popUp.type === 'changePanImg'

  return (
    <PopUpsWrapper popUp={popUp}>
      {popUp.type === 'image' && <PostImageUi setPopUp={setPopUp} />}
      {popUp.type === 'text' && <PostTextUi setPopUp={setPopUp} />}
      {popUp.type === 'cita' && <PostCitaUi setPopUp={setPopUp} />}
      {popUp.type === 'video' && <PostVideoUi setPopUp={setPopUp} />}
      {popUp.type === 'changePI' && (
        <ChangePI setPopUp={setPopUp} user={user} />
      )}
      {popUp.type === 'changePanImg' && (
        <ChangePanImg setPopUp={setPopUp} user={user} />
      )}
      {popUp.type === 'comments' && (
        <Comments setPopUp={setPopUp} post={popUp.post} />
      )}
      {popUp.type === 'delete' && (
        <Delete setPopUp={setPopUp} post={popUp.post} />
      )}
      {popUp.type === 'seeFollowers' && (
        <Followers setPopUp={setPopUp} user={user} />
      )}
      {popUp.type === 'seeFollowings' && (
        <Following setPopUp={setPopUp} user={user} />
      )}
    </PopUpsWrapper>
  );
}

//** CONTAINERS

function PopUpsWrapper({ popUp, children }) {
  return (
    <div
      className={
        popUp.type === 'none'
          ? `${style.popups} ${style.hidden}`
          : popUp.post
          ? style.popups
          : `${style.popups} ${style.open}`
      }>
      {children}
    </div>
  );
}
