import { useQuery } from '@tanstack/react-query';

import { fecthExplorePosts } from '../services/postServices';

export default function useGetDiscoveryPosts() {
  const { data: { data: discoverPosts } = {} } = useQuery({
    queryKey: ['discoverPosts'],
    queryFn: fecthExplorePosts,
  });

  return discoverPosts;
}
