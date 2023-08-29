import style from '../../styles/post.module.css';

const PostTitle = ({ post }) => {
  return (
    <div className={style['post-title']}>
      <i>{post.title}</i> {post.title && post.subtitle ? '-' : ''}{' '}
      <b>{post.subtitle}</b>
    </div>
  );
};

export default PostTitle;
