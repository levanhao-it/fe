import productApi from 'api/productApi';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await productApi.getById(productId);
        setProduct(result.data);
      } catch (error) {
        console.log('Failed to fetch product', error);
        history.push('/not-found');
      }

      setLoading(false);
    })();
  }, [productId]);

  return { product, loading };
}
