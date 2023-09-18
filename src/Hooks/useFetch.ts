import { useEffect, useState } from 'react';

type UseFetchResult = {
  news: any;
  isLoading: boolean;
  error: string;
};

function useFetch(param: string): UseFetchResult {
  const [news, setNews] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(param);
        const data = await response.json();
        setNews(data);
      } catch (catchError: any) {
        setError(catchError.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApi();
  }, [param]);

  return { news, isLoading, error };
}

export default useFetch;
