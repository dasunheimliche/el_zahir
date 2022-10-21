
import { useState } from 'react'
import './PostBox.css'

const PostBox = ({onClick})=> {
    let [show, setShow] = useState(false)
    

    return (
        <div className='postbox-container'>
            <div className='postbox-post-plus pointer' onClick={()=> setShow(!show)}></div>
            <div className={show? 'postbox-buttons mirar': 'postbox-buttons'}>
                <button className='button-post-text pointer' onClick={onClick('text')}></button>
                <button className='button-post-cita pointer' onClick={onClick('cita')}></button>
                <button className='button-post-image pointer' onClick={onClick('image')}></button>
                <button className='button-post-video pointer' onClick={onClick('video')}></button>
            </div>
        </div>
    )
}

export default PostBox