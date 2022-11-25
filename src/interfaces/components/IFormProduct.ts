import { IGetProduct } from '@interfaces/IProduct';
import { Dispatch, SetStateAction } from 'react';
import { IAlert } from './IAlert';

export interface IFormProduct {
  setAlert?: Dispatch<SetStateAction<IAlert>>;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  product?: IGetProduct;
}
