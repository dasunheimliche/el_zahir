import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { postQuote } from '../../services/postServices';

import citaButton from '../../icons/citaButton.png';
import style from '../../styles/popups.module.css';

import {
  PostUIHeader,
  MainInput,
  SubInput,
  TextArea,
  PostUiFooter,
} from './PostUiModule';

const PostCitaUI = ({ setPopUp }) => {
  const [author, setAuthor] = useState('');
  const [work, setWork] = useState('');
  const [quote, setQuote] = useState('');
  const [isMutating, setIsMutating] = useState(false);

  const client = useQueryClient();

  const { mutate: postMutation } = useMutation({
    mutationFn: async () => await postQuote(author, work, quote),
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

  function handlePostSubmit(e) {
    e.preventDefault();
    postMutation();
  }

  function handleClose() {
    setPopUp({ type: 'none', post: null });
  }

  return (
    <form className={style.popup} onSubmit={handlePostSubmit}>
      <PostUIHeader imageSource={citaButton} />

      <div className={style.main}>
        <MainInput
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder={'Author'}
        />
        <SubInput
          value={work}
          onChange={(e) => setWork(e.target.value)}
          placeholder={'Work'}
        />
        <TextArea
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder={'Quote'}
        />
      </div>

      <PostUiFooter onCancel={handleClose} isMutating={isMutating} />
    </form>
  );
};

export default PostCitaUI;
