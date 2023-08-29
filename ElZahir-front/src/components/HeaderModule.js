import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import style from '../styles/header.module.css';
import logo from '../icons/search.png';

export function ZahirLogo() {
  return (
    <Link className="linknostyle" to={`/home`}>
      <div className="logo">Zahir.</div>
    </Link>
  );
}

export function SearchUsersInput({ searchResults, me }) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchRef = useRef();

  const clearSearch = () => {
    setSearchQuery('');
    searchRef.current.value = '';
  };

  const showSearchResult = () => {
    if (!searchResults) return;
    if (searchQuery <= 0) return;

    const validResults = searchResults.filter((user) =>
      user.username.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    if (validResults <= 0) return;

    return validResults.map((res, i) => {
      if (me.userId === res.id) {
        return (
          <Link className="linknostyle" key={res.id} to={`/home/`}>
            <img src={res.profileImg} alt="profile" />
            <span className="p" onClick={clearSearch}>
              {res.username}
            </span>
          </Link>
        );
      } else {
        return (
          <Link className="linknostyle" key={res.id} to={`/user/${res.id}`}>
            <img src={res.profileImg} alt="profile" />
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

export function ProfileDropdown({ me, queryClient }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const signOffHandler = () => {
    window.localStorage.clear();
    queryClient.removeQueries();
    navigate('/');
  };

  const toggleUserMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={
        !isMenuOpen
          ? style['user-container']
          : `${style['user-container']} ${style['expanded-user-menu']}`
      }
      onClick={toggleUserMenu}>
      <div className={style.user}>
        <img src={me.profileImg} className={style['user-logo']} alt="profile" />
        <span className={style.username}>{me.username}</span>
      </div>
      <div
        className={
          isMenuOpen ? style['user-menu'] : `${style['user-menu']} invisible`
        }>
        <span className={style.signOff} onClick={signOffHandler}>
          Log Off
        </span>
      </div>
    </div>
  );
}
