
import '../components/post.css'
import { Link } from 'react-router-dom'

const ShowTextPost = ({post, mode, setSeeOpt})=> {

    return (
            <div className="post-container-textPost figure-showPost">
                    {mode === 'out' && <div className="logo logo-out">Zahir</div>}
                    {mode === 'user' || mode === 'out'?
                        <div className='post-user-info'>
                            <div className='post-user-profile'>
                                <img className={'post-user-profile-image'} src={post.profileImg}></img>
                            </div>
                            <div className='post-user-username'>@{post.username}</div>
                            
                        </div> : console.log()}
                    <div className="post-text-content">
                        <div className='post-text-title'>{post.title}</div>
                        <div className='post-text-text'>{post.textPost}</div>
                    </div>
                    <div className="post-sub">
                        <div className='post-sub-text'></div>
                        <div className='post-sub-area'>
                            {mode !== 'out' && <div className='post-sub-size' onClick={()=>setSeeOpt({type: 'none', post: null})}></div> }
                            <div className={'social-icons'}>
                            </div>
                        </div>
                    </div>
                </div>

    )
}


export default ShowTextPost