import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import profileDefault from '../../images/profileDefault.png';

import style from '../../styles/header.module.css';

export default function ProfileDropdown({ me }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const queryClient = useQueryClient();

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
        <img
          src={me.profileImg ? me.profileImg : profileDefault}
          className={style['user-logo']}
          alt="profile"
        />
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
