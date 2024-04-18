import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiService from '../utils/apiService';

const useFetchData = (url, fetchAgain) => {
  const reFetch = useSelector((state) => state.app.reFetch);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    ApiService.get(url)
      .then((res) => {
        setLoading(false);
        if (res) {
          setResponse(res.data);
        } else {
          setError('Sorry! Something went wrong. App server error');
        }
      })
      .catch((err) => {
        setError(err || 'Sorry! Something went wrong. App server error');
        setLoading(false);
      });
  }, [url, fetchAgain, reFetch]);

  return [loading, error, response];
};

export default useFetchData;
