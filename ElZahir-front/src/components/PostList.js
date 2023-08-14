import React from 'react'
import Post from './Post'

const PostList = React.memo(({ posts, setToFront, setPopUp, mode }) => {
    if (!posts) return null
    console.log("RENDERING POSTS")
    const renderedPosts = posts.map((post) => (
        <Post
            setToFront={setToFront}
            setPopUp={setPopUp}
            key={post.id}
            post={post}
            mode={mode}
        />
    ));

    return <div>{renderedPosts}</div>
});

export default PostList;