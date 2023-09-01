import { useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '../../services/userServices';
import { fetchComments, sendComment } from '../../services/commentServices';

import { useQueryClient } from '@tanstack/react-query';

import CommentTile from './ComentTile';
import CommentsHeader from './CommentsHeader';
import CommentsCounter from './CommentsCounter';
import CommentsInput from './CommentsInput';

import style from '../../styles/comments.module.css';

export default function Comments({ post, setPopUp }) {
  const [userInput, setUserInput] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [commentID, setCommentID] = useState('');
  const [isMutating, setIsMutating] = useState(false);

  const client = useQueryClient();

  const { data: { data: user } = {} } = useQuery({
    queryKey: ['ME'],
    queryFn: getCurrentUser,
  });
  const { data: { data: comments } = {} } = useQuery({
    queryKey: ['GET_COMMENTS', post.id],
    queryFn: () => fetchComments(post),
  });

  const { mutate: submitCommentMutation } = useMutation({
    mutationFn: () =>
      sendComment(post, user, userInput, placeholder, commentID),
    onMutate: () => setIsMutating(true),
    onSuccess: (data) => {
      if (commentID) {
        client.setQueryData(['GET_SUBCOMMENTS', commentID], (old) => {
          let copy = { ...old };
          copy.data = copy.data.concat(data.data);
          return copy;
        });
      } else {
        client.setQueryData(['GET_COMMENTS', post.id], (old) => {
          let copy = { ...old };
          copy.data = copy.data.concat(data.data);
          return copy;
        });
      }

      handleClearInput();
    },
  });

  const handleSubmitComment = (e) => {
    e.preventDefault();
    submitCommentMutation();
  };

  function handleClearInput() {
    setPlaceholder('');
    setCommentID('');
    setUserInput('');
    setIsMutating(false);
  }

  const handleCloseComments = () => {
    setPopUp({ type: 'none', post: null });
  };

  const handleTargetUserComment = (commentID, user) => {
    setCommentID(commentID);
    setPlaceholder(`responder a @${user}`);
    setUserInput('');
  };

  const loadComments = () => {
    if (!comments) return;

    return comments.map((comment, i) => {
      return (
        <CommentTile
          key={i}
          post={post}
          comment={comment}
          onTargetUserComment={handleTargetUserComment}
        />
      );
    });
  };

  return (
    <div className={style.background}>
      <div className={style['comments-container']}>
        <CommentsHeader onCloseComments={handleCloseComments} />
        <CommentsCounter comments={comments} />
        <CommentsInput
          userInput={userInput}
          isMutating={isMutating}
          placeholder={placeholder}
          onSubmitComment={handleSubmitComment}
          onCancelComment={handleClearInput}
          onTyping={(e) => setUserInput(e.target.value)}
        />
        <div className={style.comments}>{comments && loadComments()}</div>
      </div>
    </div>
  );
}
