import { useMutation } from '@tanstack/react-query';
import { fetchApiData } from '../utils/fetchApiData';

interface MemeCustomRequest {
  id: string;
}

export const useMemeCustomMutation = () => {
  return useMutation({
    mutationFn: (data: MemeCustomRequest) => {
      return fetchApiData<void, MemeCustomRequest>({
        method: 'POST',
        url: `/api/memes/${data.id}/custom`,
        data,
      });
    },
  });
};
