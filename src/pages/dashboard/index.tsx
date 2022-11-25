const Currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

import { useState } from 'react';
import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';
import { IGetProduct } from '@interfaces/IProduct';
import { IPages } from '@interfaces/IPages';
import Pagination from '@commons/Pagination';
import { Chart } from '@commons/chart.js';

const PRODUCT_LIMIT = 0;
const PRODUCT_OFFSET = 0;

const CURRENT_PAGE = 1;
const PAGINATION_LENGTH = 5;

export default function Dashboard() {
  const [page, setPage] = useState(CURRENT_PAGE);
  let initialListProduct = 0;
  let finalListProduct = 0;
  let newProducts = [];
  let newPages: IPages[] = [];

  function GetPages(page: number, list: any): IGetProduct[] {
    page--;
    initialListProduct = newPages[page]?.initial;
    finalListProduct = newPages[page]?.final;
    return list[page];
  }

  const getProducts = endPoints.products.getProducts(PRODUCT_LIMIT, PRODUCT_OFFSET);

  const products: IGetProduct[] = useFetch(getProducts);

  const totalProducts = products.length;

  for (let i = 0; i < totalProducts; i += PAGINATION_LENGTH) {
    const product = products.slice(i, i + PAGINATION_LENGTH);
    newProducts.push(product);
    const page: IPages = {
      initial: i + 1,
      final: i + product.length,
    };
    newPages.push(page);
  }

  const categoryNames = products?.map((product) => product.category);
  const categoryCount = categoryNames?.map((category) => category.name);

  const countOccurrences = (array: any) => array.reduce((acc: any, curr: any) => ((acc[curr] = ++acc[curr] || 1), acc), {});

  const data = {
    datasets: [
      {
        label: 'Category',
        data: countOccurrences(categoryCount),
        borderWidth: 2,
        backgroundColor: ['#ffbb11', '#c0c0c0', '#50af95', '#f4ba2f', '#2a71d0'],
      },
    ],
  };

  return (
    <>
      <Chart chartData={data} className="mb-8 mt-2" />
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {GetPages(page, newProducts)?.map((product) => (
                    <tr key={`Product-item-${product.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={product.images[0]} alt={product.title} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.category.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{Currency.format(product.price)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="./login" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="./login" className="text-red-600 hover:text-red-900">
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination setPage={setPage} itemInitial={initialListProduct} itemFinal={finalListProduct} totalItems={totalProducts} totalPages={newProducts.length} />
    </>
  );
}
