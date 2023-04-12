


import style from '../styles/post.module.css'

const SharedImagePost = ({post, p})=> {


    return (
        <div className={`${style.post} ${style.figure} ${style.shadows} ${style['mobile-post']}` }>
        
            <div className={style.user}>
                <div className={style['user-profile']}>
                    <img className={style['profile-image']} src={post.profileImg} alt="profile img"></img>
                </div>
                <div>@{post.username}</div>
            </div>

            <img className='img' src={post.imagePost} alt="A windmill" />
            
            <div className={style.footer}>
                <div className={style['footer-header']}>
                    <i>{post.title}</i> {(post.title && post.subtitle)? "-" : console.log()} <b>{post.subtitle}</b>
                </div>
                <div>
                    <div className={style['footer-middle']}></div>
                    <div className={style['footer-icons']}>
                        <div></div>
                        <div className={style['social-icons']}>
                            <span className={`${style.icon} ${style.notliked} p`} onClick={p.doNothing} ></span>
                            <span className={`${style.icon} ${style.comment} p`} onClick={p.doNothing}></span>
                            <span className={`${style.icon} ${style.share} p`} onClick={p.doNothing}></span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default SharedImagePost