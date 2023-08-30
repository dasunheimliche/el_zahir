import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '../services/userServices';

export default function useMyUserData() {
  const { data: { data: me } = {} } = useQuery({
    queryKey: ['ME'],
    queryFn: getCurrentUser,
  });

  return me;
}
