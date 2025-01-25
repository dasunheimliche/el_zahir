import { useRef, useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import {
  changeBackgroundImgFromUrl,
  changeBackgroundImgFromFile,
} from '../../services/userServices';
import { isImageInputValid } from '../../services/helpers';

import { Uploader, Error, PostUiFooter } from './PostUiModule';

import style from '../../styles/popups.module.css';

export default function ChangePanImg({ user, setPopUp }) {
  const [mode, setMode] = useState('idle');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const client = useQueryClient();
  const fileForm = useRef();

  const error = isImageInputValid(url, file, mode);

  const { mutate: postMutation } = useMutation({
    mutationFn: async () => {
      if (mode === 'url') return await changeBackgroundImgFromUrl(user, url);
      if (mode === 'file') return await changeBackgroundImgFromFile(user, file);
    },
    onMutate: () => setIsMutating(true),
    onSuccess: (res) => {
      client.setQueryData(['ME'], (old) => {
        const copy = { ...old };
        copy.data.mainPanelImg = res.data.mainPanelImg;
        return copy;
      });

      if (fileForm.current) {
        fileForm.current.value = null;
      }

      handleClose();
    },
    onError: () => {
      setIsMutating(false);
    },
  });

  const handleClose = () => {
    setPopUp({ type: 'none', post: null });
  };

  const handleSubmitPost = (e) => {
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
    setMode('file');
    setUrl(e.target.files[0].name);
    setFile(e.target.files[0]);
  };

  return (
    <form
      className={style.popup}
      onSubmit={handleSubmitPost}
      encType="multipart/form-data">
      <div className={style['post-ui-header']}>
        <span>Change cover image</span>
      </div>
      <div className={style.main}>
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
}
