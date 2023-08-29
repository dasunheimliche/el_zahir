import { useEffect } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getCurrentUser, getUserList } from '../services/userServices';

import { ProfileDropdown, SearchUsersInput, ZahirLogo } from './HeaderModule';

import style from '../styles/header.module.css';

const HeaderWrapper = ({ children, mode, sticky, toFront }) => {
  return (
    <div
      className={
        mode === 'desktop' ? style['desktop-bar'] : style['mobile-bar']
      }>
      <div
        className={sticky ? `${style.bar} ${style['sticky-bar']}` : style.bar}
        style={toFront ? { display: `none` } : {}}>
        {children}
      </div>
    </div>
  );
};

const Header = ({ sticky, setSticky, toFront, mode }) => {
  const queryClient = useQueryClient();

  const { data: { data: me } = {} } = useQuery({
    queryKey: ['ME'],
    queryFn: getCurrentUser,
  });
  const { data: { data: searchResults } = {} } = useQuery({
    queryKey: ['GET_USER_LIST'],
    queryFn: getUserList,
  });

  const handleScroll = () => {
    if (mode === 'mobile') return;

    let threshold;

    if (window.innerWidth > 1600) {
      threshold = 62;
    } else if (window.innerWidth <= 1366) {
      threshold = 42;
    } else {
      threshold = 50;
    }

    if (window.scrollY >= threshold && !sticky) {
      setSticky(true);
    } else if (window.scrollY < threshold) {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sticky]); //eslint-disable-line

  return (
    <HeaderWrapper mode={mode} sticky={sticky} toFront={toFront}>
      <div className={style['left-side']}>
        <ZahirLogo />
        <SearchUsersInput me={me} searchResults={searchResults} />
      </div>
      <div
        className={
          sticky
            ? `${style['right-side']} ${style['right-side-sticky']}`
            : `${style['right-side']}`
        }>
        <ProfileDropdown me={me} queryClient={queryClient} />
      </div>
    </HeaderWrapper>
  );
};

export default Header;
