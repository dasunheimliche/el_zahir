import { useQuery } from '@tanstack/react-query';

import { fetchMyPosts } from '../services/postServices';

export default function useGetMyPosts() {
  const { data: { data: myPosts } = {} } = useQuery({
    queryKey: ['userPosts'],
    queryFn: fetchMyPosts,
  });

  return myPosts;
}
