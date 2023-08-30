import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../icons/search.png';
import profileDefault from '../../images/profileDefault.png';

import style from '../../styles/header.module.css';

export default function SearchUsersInput({ usernameList, me }) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchRef = useRef();

  const clearSearch = () => {
    setSearchQuery('');
    searchRef.current.value = '';
  };

  const showSearchResult = () => {
    if (!usernameList) return;
    if (searchQuery <= 0) return;

    const validResults = usernameList.filter((user) =>
      user.username.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    if (validResults <= 0) return;

    return validResults.map((res, i) => {
      if (me.userId === res.id) {
        return (
          <Link className="linknostyle" key={res.id} to={`/home/`}>
            <img
              src={res.profileImg ? res.profileImg : profileDefault}
              alt="profile"
            />
            <span className="p" onClick={clearSearch}>
              {res.username}
            </span>
          </Link>
        );
      } else {
        return (
          <Link className="linknostyle" key={res.id} to={`/user/${res.id}`}>
            <img
              src={res.profileImg ? res.profileImg : profileDefault}
              alt="profile"
            />
            <span className="p" onClick={clearSearch}>
              {res.username}
            </span>
          </Link>
        );
      }
    });
  };

  return (
    <div className={style.search}>
      <img className={style['search-img']} alt="searchicon" src={logo} />
      <input
        ref={searchRef}
        className={style['search-input']}
        type={'text'}
        placeholder={'@user'}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div
        className={
          showSearchResult()
            ? style['user-list']
            : `${style[`user-list`]} invisible`
        }>
        {showSearchResult()}
      </div>
    </div>
  );
}
