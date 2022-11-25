import { IGetCategory } from './ICategory';

export interface IGetProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: IGetCategory;
  images: string[];
}

export interface IPostProduct {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface IDeleteProduct {
  id: number;
}
