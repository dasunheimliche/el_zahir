
import style from '../styles/userCard.module.css'

export function TopCardOptions ({mode, onChangeCoverImg}) {

    return(
        <div className={style.options}>
            <div className={style['left-options']} >{''}</div>
            <div className={mode === 'user'? `${style['middle-options']}` : `${style['middle-options']} p`} onClick={mode === 'user'? null : onChangeCoverImg} >{''}</div>
            <div className={style['right-options']} >{''}</div>
        </div>
    )
}

export function ProfileImg ({mode, otherUser, user, onChangeProfileImg}) {

    return(
        <div style={{"backgroundImage":`url(${mode === 'user'? otherUser.profileImg :  user.profileImg})`}} className={mode === 'user'? style.profile  : `${style.profile} p`} onClick={mode === 'user'? null : onChangeProfileImg}>
            <div className={style.username}>@{mode === 'user'? otherUser.username   : user.username}</div>
        </div>
    )
}

export function FollowStatus ({mode, isUserFollowed, isMutating, onToggleFollow}) {

    return(
        <div className={mode === 'user'? `${style.separator} ${style['mobile-separator']}` :style.separator}>
            {mode === 'user'&& <div className={isUserFollowed? `${style.follow} ${style.unfollow} p`  : `${style.follow} p` } onClick={!isMutating && onToggleFollow}>{isUserFollowed? 'Followed': 'Follow'}</div>}
        </div>
    )
}

export function FollowStats ({mode, otherUser, posts, user, onShowFollowers, onShowFollowing}) {

    return(
        <div className={style.stats}>

            <div className={style.stat}>
                <span className={style['stat-title']}>Followers</span>
                <span className='p' onClick={onShowFollowers}>{mode === 'user'? String(otherUser.followers.length) : String(user.followers.length)}</span>
            </div>

            <div className={style.stat}>
                <span className={style['stat-title']}>Following</span>
                <span className='p' onClick={onShowFollowing}>{mode === 'user'? String(otherUser.following.length) : String(user.following.length)}</span>
            </div>

            <div className={style.stat}>
                <span className={style['stat-title']}>Posts</span>
                <span>{mode === 'user'? (otherUser? String(otherUser.posts.length):"0"):(posts? String(user.posts.length):"0")}</span>
            </div>

        </div>
    )
}

export function PostingOptions ({
        showPostOptions, 
        onTogglePostOptionsMenu,
        onOpenTextPostMenu,
        onOpenQuotePostMenu,
        onOpenImagePostMenu,
        onOpenVideoPostMenu,
    }) {

    return(
        <div className={style.postbox}>
            <button className={showPostOptions? `${style.hide} p` : `${style.open} p`} onClick={onTogglePostOptionsMenu}></button>
            <div className={showPostOptions? `${style.buttons} ${style.visible}` : style.buttons }>
                <button className={showPostOptions? `${style['post-text']}  ${style.seeButton} p` : `${style['post-text']} p` }  onClick={onOpenTextPostMenu}/>
                <button className={showPostOptions? `${style['post-quote']} ${style.seeButton} p` : `${style['post-quote']} p` } onClick={onOpenQuotePostMenu}></button>
                <button className={showPostOptions? `${style['post-image']} ${style.seeButton} p` : `${style['post-image']} p` } onClick={onOpenImagePostMenu}></button>
                <button className={showPostOptions? `${style['post-video']} ${style.seeButton} p` : `${style['post-video']} p` } onClick={onOpenVideoPostMenu}></button>
            </div> 
        </div>
    )
}

