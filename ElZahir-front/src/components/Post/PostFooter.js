import style from '../../styles/post.module.css'



const PostFooter = ({loading, p, liked, user, post, mode, visibility, setVisibility, setToFront})=> {

    return(
        <div className={style.footer}>
            <div>
                <div className={style['footer-middle']}></div>
                <div className={style['footer-icons']}>
                    <div className={style.open} onClick={visibility? ()=>{setVisibility(false); setToFront(true)} : ()=>{setVisibility(true);setToFront(false)}}></div> 
                    <div className={style['social-icons']}>
                        <span onClick={loading? e=>p.doNothing(e) : liked? p.dislike : p.like} className={liked? `${style.icon} ${style.liked} p` : `${style.icon} ${style.notliked} p`}></span>
                        <span className={`${style.icon} ${style.comment} p`} onClick={p.comments}></span>
                        <span className={`${style.icon} ${style.share} p`} onClick={p.share}></span>
                        {(mode !== 'user' && user? user.userId === post.user: "" === post.user)? <span className={`${style.icon} ${style.delete} p`} onClick={loading? e=>p.doNothing(e): p.del}></span> : console.log()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostFooter