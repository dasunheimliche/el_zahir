import style from '../styles/home.module.css';

import { useNavigate, useParams } from 'react-router-dom';

export default function Tabs({ sticky }) {
  const navigate = useNavigate();

  const toFollowing = () => {
    navigate('/home/following');
  };

  const toHome = () => {
    navigate('/home');
  };

  const toDiscover = () => {
    navigate('/home/discover');
  };

  return (
    <TabsWrapper sticky={sticky}>
      <Tab onClick={toHome} segment={''} label={'ME'} />
      <Tab onClick={toFollowing} segment={'following'} label={'FOLLOWING'} />
      <Tab onClick={toDiscover} segment={'discover'} label={'EXPLORE'} />
    </TabsWrapper>
  );
}

function Tab({ onClick, segment, label }) {
  const { '*': param } = useParams();

  return (
    <span
      onClick={onClick}
      className={
        param === segment
          ? `${style.tab} ${style['neonText']} p`
          : `${style.tab} p`
      }>
      {label}
    </span>
  );
}

//** CONTAINER

function TabsWrapper({ children, sticky }) {
  return (
    <div
      className={sticky ? `${style.tabs} ${style['sticky-tabs']}` : style.tabs}>
      {children}
    </div>
  );
}
