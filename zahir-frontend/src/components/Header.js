import ZahirLogo from './Header/ZahirLogo';
import SearchUsersInput from './Header/SearchUserInput';
import ProfileDropdown from './Header/ProfileDropdown';

import useStickyController from '../hooks/useStickyController';
import useMyUserData from '../hooks/useMyUserData';
import useUsernameList from '../hooks/useUsernameList';

import style from '../styles/header.module.css';

export default function Header({ sticky, setSticky, toFront, mode }) {
  const me = useMyUserData();
  const usernameList = useUsernameList();

  useStickyController(sticky, setSticky, mode);

  return (
    <HeaderWrapper mode={mode} sticky={sticky} toFront={toFront}>
      <HeaderLeftSide>
        <ZahirLogo />
        <SearchUsersInput me={me} usernameList={usernameList} />
      </HeaderLeftSide>

      <HeaderRightSide sticky={sticky}>
        <ProfileDropdown me={me} />
      </HeaderRightSide>
    </HeaderWrapper>
  );
}

//** CONTAINERS

function HeaderWrapper({ children, mode, sticky, toFront }) {
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
}

function HeaderLeftSide({ children }) {
  return <div className={style['left-side']}>{children}</div>;
}

function HeaderRightSide({ children, sticky }) {
  return (
    <div
      className={
        sticky
          ? `${style['right-side']} ${style['right-side-sticky']}`
          : `${style['right-side']}`
      }>
      {children}
    </div>
  );
}
