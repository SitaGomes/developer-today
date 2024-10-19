import { ENDPOINTS } from '../contants';
import { api } from '../lib/api';
import { useQuery } from '@tanstack/react-query';

export const useGetCountry = (code: string) => {
  return useQuery({
    queryKey: [`country:${code}`],
    queryFn: async () => {
      return api.get<{
        borders: { code: string; name: string }[];
        population: { year: number; value: number }[];
        name: string;
        flag: string;
      }>(ENDPOINTS.COUNTRY, {
        params: {
          code,
        },
      });
    },
  });
};
