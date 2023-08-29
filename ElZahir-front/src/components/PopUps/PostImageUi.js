import { useRef, useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { isImageInputValid } from '../../services/helpers';
import {
  postImageFromUrl,
  postImageFromFile,
} from '../../services/postServices';

import imageButton from '../../icons/imageButton.png';

import {
  PostUIHeader,
  MainInput,
  SubInput,
  PostUiFooter,
  Uploader,
  Error,
} from './PostUiModule';

import style from '../../styles/popups.module.css';

const PostImageUI = ({ setPopUp }) => {
  const [mode, setMode] = useState('idle');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [isMutating, setIsMutating] = useState(false);

  const client = useQueryClient();
  const fileForm = useRef();

  const error = isImageInputValid(url, file, mode);

  const { mutate: postMutation } = useMutation({
    mutationFn: async () => {
      if (mode === 'url') return await postImageFromUrl(url, title, subtitle);
      if (mode === 'file')
        return await postImageFromFile(file, title, subtitle);
    },
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

  const submitPostHandler = (e) => {
    e.preventDefault();
    postMutation();
  };

  const pasteUrlFromClipboard = async (e) => {
    e.preventDefault();
    setUrl('');
    setMode('url');
    setFile('');
    const urlString = await navigator.clipboard.readText();
    setUrl(urlString);
  };

  const uploadFile = (e) => {
    setUrl('');

    setMode('file');
    setUrl(e.target.files[0].name);
    setFile(e.target.files[0]);
  };

  const handleClose = () => {
    if (fileForm.current) {
      fileForm.current.value = null;
    }
    setPopUp({ type: 'none', post: null });
  };

  return (
    <form className={style.popup} onSubmit={submitPostHandler}>
      <PostUIHeader imageSource={imageButton} />

      <div className={style.main}>
        <MainInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={'Title'}
        />
        <SubInput
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder={'Description'}
        />

        <Uploader
          onPasteUrl={pasteUrlFromClipboard}
          onUploadFile={uploadFile}
          isInputValid={error}
          url={url}
        />

        <Error error={error} />
      </div>

      <PostUiFooter
        onCancel={handleClose}
        isMutating={isMutating}
        isPostButtonDisabled={error}
      />
    </form>
  );
};

export default PostImageUI;
