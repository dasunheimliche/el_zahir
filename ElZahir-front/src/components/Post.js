import '../components/post.css'


const Post = ({post, type})=> {


    if (type === "image") {
        return (
            <div className="post-container figure">
                <div className="post-content">
                    <img className='img' src={post.imagePost} alt="A windmill" />
                </div>
                <div className="post-sub">
                    <div className='post-sub-header'>
                        <b>{post.title}</b> - <i>{post.subtitle}</i>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post