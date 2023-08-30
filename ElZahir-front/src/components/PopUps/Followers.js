import { useQuery } from '@tanstack/react-query';

import { getUserList } from '../../services/userServices';

import { UserTile } from './ConnectionsUiModule';

import style from '../../styles/popups.module.css';

const Followers = ({ setPopUp, user }) => {
  const { data: { data: users } = {}, isLoading } = useQuery({
    queryKey: ['GET_USER_LIST'],
    queryFn: async () => await getUserList(),
  });

  const followers = users?.filter((person) =>
    user.followers.includes(person.id)
  );

  const loadUserList = (list) => {
    if (!list) return;

    return list.map((person, i) => {
      return (
        <UserTile
          key={i}
          onClick={() => setPopUp({ type: 'none', post: null })}
          user={user}
          person={person}
        />
      );
    });
  };

  return (
    <div className={style['user-list']}>
      <div className={style.header}>
        <div
          className={style.close}
          onClick={() => setPopUp({ type: 'none', post: null })}></div>
      </div>
      <div className={style.counter}>
        <span>Followers: </span>
        {isLoading && (
          <div className={`${style.loading} ${style['little-loading']}`}> </div>
        )}
        {!isLoading && <span>{followers.length}</span>}
      </div>
      <div className={style['list-container']}>{loadUserList(followers)}</div>
    </div>
  );
};

export default Followers;
