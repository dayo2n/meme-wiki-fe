import { useMutation } from '@tanstack/react-query';
import { fetchApiData } from '../utils/fetchApiData';

interface ShareMemeRequest {
  id: string;
}

export const useShareMemeMutation = () => {
  return useMutation({
    mutationFn: (data: ShareMemeRequest) => {
      return fetchApiData<void, ShareMemeRequest>({
        method: 'POST',
        url: `/api/memes/${data.id}/share`,
        data,
      });
    },
  });
};
