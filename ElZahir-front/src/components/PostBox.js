
import './PostBox.css'

const PostBox = ({onClick})=> {

    

    return (
        <div className='postbox-container'>
            <button className='button-post-image pointer' onClick={onClick('image')}></button>
            <button onClick={onClick('text')}>Postear texto</button>
        </div>
    )
}

export default PostBox