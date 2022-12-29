
import {useEffect, useState } from 'react'
import '../components/post.css'
import { Link } from 'react-router-dom'

const ShowImagePost = ({post, mode, setSeeOpt})=> {

    let [size, setSize] = useState({width: 0, height: 0})
    let [ancho, setAncho] = useState((size.width/size.height)*window.innerHeight)

    window.addEventListener('resize', function() {
        setAncho((size.width/size.height)*(window.innerHeight - 200))
    });

    window.addEventListener('load', function() {
        setAncho((size.width/size.height)*(window.innerHeight - 200))
    });

    ancho = ((size.width/size.height)*(window.innerHeight - 200))

    const img = new Image();
    useEffect(()=> {
        img.addEventListener("load", function() {
            setSize({width: this.naturalWidth, height: this.naturalHeight})
        })
        img.src = post.imagePost

    },[])


    return (

                <div style={size.height > (window.innerHeight - 150)? {width: `${ancho}px`, maxWidth: '90vw'} : console.log()} className= {size.width !==0? "post-container-imagePost figure-showPost" : ''}>
                    {mode === 'out' && <div className="logo logo-out">Zahir</div>}
                    {mode === 'user' || mode === 'out'?
                        <div className='post-user-info-image'>
                            <div className='post-user-profile'>
                                <img className={'post-user-profile-image'} src={post.profileImg} />
                            </div>

                            <div className='post-user-username'>@{post.username}</div>

                            <div></div>
                        </div> : console.log()}
                    <div className="post-image-content-show">
                        <img className='img' src={post.imagePost} alt="A windmill" />
                    </div>
                    <div className="post-sub">
                        <div className='post-sub-header' >
                            <i>{post.title}</i> {(post.title && post.subtitle)? "-" : console.log()} <b>{post.subtitle}</b>
                        </div>
                        <div>
                            <div className='post-sub-text'></div>
                            <div className='post-sub-area'>
                                {mode !== 'out' && <div className='post-sub-size' onClick={()=>setSeeOpt({type: 'none', post: null})}></div> }
                                <div className={'social-icons'}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    )
}


export default ShowImagePost