
import { useState } from 'react'
import './PostBox.css'

const PostBox = ({onClick, seeOpt})=> {
    let [show, setShow] = useState(false)
    

    return (
        <div className={'postbox-container'}>
            <div className={show? 'postbox-post-minus pointer':'postbox-post-plus pointer'} onClick={()=> setShow(!show)}></div>
            <div className={show? 'postbox-buttons mirar': 'postbox-buttons'}>
                <div className={show? 'button-post-text pointer seebutton' : 'button-post-text pointer'} onClick={()=>onClick({type: 'text', post: null})}></div>
                <div className={show? 'button-post-cita pointer seebutton' : 'button-post-cita pointer'} onClick={()=>onClick({type: 'cita', post: null})}></div>
                <div className={show? 'button-post-image pointer seebutton' : 'button-post-image pointer'} onClick={()=>onClick({type: 'image', post: null})}></div>
                <div className={show? 'button-post-video pointer seebutton' : 'button-post-video pointer'} onClick={()=>onClick({type: 'video', post: null})}></div>
            </div>
        </div>
    )
}

export default PostBox