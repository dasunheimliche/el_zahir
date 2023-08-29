import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { postText } from '../../services/postServices';

import {
  PostUIHeader,
  MainInput,
  TextArea,
  PostUiFooter,
} from './PostUiModule';

import style from '../../styles/popups.module.css';
import textButton from '../../icons/textButton.png';

const PostTextUI = ({ setPopUp }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isMutating, setIsMutating] = useState(false);

  const client = useQueryClient();

  const { mutate: postMutation } = useMutation({
    mutationFn: async () => await postText(title, text),
    onMutate: () => setIsMutating(true),
    onSuccess: (res) => {
      client.setQueryData(['userPosts'], (old) => {
        const copy = { ...old };
        copy.data = [res.data, ...copy.data];
        return copy;
      });
      handleClose();
    },
    onError: () => {
      setIsMutating(false);
    },
  });

  function submitTextPostHandler(e) {
    e.preventDefault();
    postMutation();
  }

  function handleClose() {
    setPopUp({ type: 'none', post: null });
  }

  return (
    <form className={style.popup} onSubmit={submitTextPostHandler}>
      <PostUIHeader imageSource={textButton} />

      <div className={style.main}>
        <MainInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={'Title'}
        />
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={'Text'}
        />
      </div>

      <PostUiFooter onCancel={handleClose} isMutating={isMutating} />
    </form>
  );
};

export default PostTextUI;
