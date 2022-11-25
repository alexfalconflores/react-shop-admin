import { IPostProduct } from '@interfaces/IProduct';
import endPoints from '@services/api';
import Fetch from '@utils/Fetch';

const addProduct = async (body: IPostProduct) => {
  const headers = {
    accept: '*/*',
    'Content-Type': 'application/json',
  };
  const response = await Fetch.Post(endPoints.products.postProduct(), body, headers);
  const data = await response.json();
  return data;
};

const deleteProduct = async (id: number) => {
  const response = await Fetch.Delete(endPoints.products.deleteProduct(id));
  const data = await response.json();
  return data;
};

const updateProduct = async (id: number, body: IPostProduct) => {
  const response = await fetch(endPoints.products.putProduct(id), {
    method: 'PUT',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

// })
// const response = await Fetch.Put(endPoints.products.putProduct(id), body);
// const data = await response.json();
// return data;

export { addProduct, deleteProduct, updateProduct };
