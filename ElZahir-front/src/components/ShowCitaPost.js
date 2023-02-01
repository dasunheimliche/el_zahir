
import '../components/post.css'
import quotes from '../images/quotes.png'

const ShowCitaPost = ({post, mode, setSeeOpt})=> {

    return (
            <div className="post-container-citaPost figure-showPost">
                    {mode === 'out' && <div className="logo logo-out">Zahir</div>}
                    {mode === 'user' || mode === 'out'?
                        <div className='post-user-info'>
                            <div className='post-user-profile'>
                                <img className={'post-user-profile-image'} alt={"profile pic"} src={post.profileImg}></img>
                            </div>
                            <div className='post-user-username'>@{post.username}</div>

                        </div> : console.log()}
                    <div>
                        <div className="post-cita-content">
                            <div className='post-text-left'>
                                <img className='post-text-comilla-left' alt={"comilla"} src={quotes}></img>
                            </div>
            
                            <div className='post-cita-text-container'>
                                <div className='post-cita-text'>{post.textPost}</div>
                            </div>
                            <div className='post-text-right'>
                                <img className='post-text-comilla-right' alt={"comilla"} src={quotes}></img>
                            </div>
                        </div>
                        <div className='post-cita-detail'>
                            <i>{post.title}</i> - <b>{post.subtitle}</b>
                        </div>
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


export default ShowCitaPost