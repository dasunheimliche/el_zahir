import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { deletePost } from '../../services/postServices';

import style from '../../styles/popups.module.css';

const Delete = ({ post, setPopUp }) => {
  const [loading, setLoading] = useState(false);
  const client = useQueryClient();

  const { mutate: deletePostHandler } = useMutation({
    mutationFn: () => {
      deletePost(post);
    },
    onMutate: () => setLoading(true),
    onSuccess: () => {
      setLoading(false);
      client.setQueryData(['userPosts'], (old) => {
        let copy = { ...old };
        copy.data = copy.data.filter((p) => p.id !== post.id);
        return copy;
      });
      setPopUp({ type: 'none', post: null });
    },
  });

  return (
    <div className={style['delete-background']}>
      <div className={style[`delete-alert-container`]}>
        <div>Are you sure you want to delete this post?</div>
        <div className={style[`delete-alert-buttons`]}>
          <button
            className={`${style.button} p`}
            onClick={() => setPopUp({ type: 'none', post: null })}>
            CANCEL
          </button>
          <button
            className={`${style.button} ${style.delete} p`}
            onClick={loading ? undefined : deletePostHandler}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
