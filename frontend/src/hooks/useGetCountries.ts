import { ENDPOINTS } from '../contants';
import { api } from '../lib/api';
import { useQuery } from '@tanstack/react-query';

export const useGetCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      return api.get<{ code: string; name: string }[]>(ENDPOINTS.COUNTRIES);
    },
  });
};
