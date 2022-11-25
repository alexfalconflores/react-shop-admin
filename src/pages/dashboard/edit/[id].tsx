import FormProduct from '@components/FormProduct';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Fetch from '@utils/Fetch';
import endPoints from '@services/api';
import { IGetProduct } from '@interfaces/IProduct';

export default function Edit() {
  const [product, setProduct] = useState<IGetProduct>();
  const router = useRouter();
  useEffect(() => {
    const { id } = router.query;
    async function getProduct() {
      if (!router.isReady) return;
      const response = await Fetch.Get(`${endPoints.products.getProduct(Number(id))}`);
      const data = await response.json();
      setProduct(data);
    }
    getProduct().catch(() => router.push('/notFound'));
  }, [router.isReady]);

  return <FormProduct product={product} />;
}
