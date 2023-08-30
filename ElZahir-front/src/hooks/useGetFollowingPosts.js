import { useQuery } from '@tanstack/react-query';

import { fetchFollowingPosts } from '../services/postServices';

export default function useGetFollowingPosts() {
  const { data: { data: followingPosts } = {} } = useQuery({
    queryKey: ['followedPosts'],
    queryFn: fetchFollowingPosts,
  });

  return followingPosts;
}
