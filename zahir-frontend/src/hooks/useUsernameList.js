import { useQuery } from '@tanstack/react-query';

import { getUserList } from '../services/userServices';

export default function useUsernameList() {
  const { data: { data: usernameList } = {} } = useQuery({
    queryKey: ['GET_USER_LIST'],
    queryFn: getUserList,
  });

  return usernameList;
}
