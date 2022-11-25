import { IPostProduct } from '@interfaces/IProduct';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addProduct, updateProduct } from '@services/api/product';
import { IAlert } from '@interfaces/components/IAlert';
import { IFormProduct } from '@interfaces/components/IFormProduct';
import { useRouter } from 'next/router';

export default function FormProduct({ setOpen, setAlert, product }: IFormProduct) {
  const formRef = useRef(null);
  const [getProduct, setGetProduct] = useState<IPostProduct>();
  const router = useRouter();

  useEffect(() => {
    if (product) {
      setGetProduct({
        title: product?.title,
        description: product?.description,
        price: product?.price,
        categoryId: product?.category?.id,
        images: product?.images,
      });
    }
  }, [product]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPostProduct>({
    defaultValues: getProduct,
  });

  useEffect(() => {
    reset(getProduct);
  }, [getProduct, reset]);

  // const handleChange = (event) => {
  //   setGetProduct({ ...getProduct, [name]: value });
  // };

  const onSubmit = (data: IPostProduct) => {
    const { title, price, description, categoryId, images } = data;
    // @ts-ignore
    const imageName = [images[0]?.name || ''];
    const newData = {
      title,
      price,
      description,
      categoryId,
      images: imageName,
    };
    //   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    // const formData = new FormData(formRef.current as unknown as HTMLFormElement);
    // const data: IPostProduct = {
    //   title: String(formData.get('title')),
    //   price: Number(formData.get('price')),
    //   description: String(formData.get('description')),
    //   categoryId: Number(formData.get('category')),
    //   images: [formData.get('images')?.name],
    // };
    if (product) {
      updateProduct(product.id, newData)
        .then(() => {
          router.push('/dashboard/products');
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      addProduct(newData)
        .then(() => {
          const optionAlert: IAlert = {
            active: true,
            message: 'Producto creado con éxito',
            type: 'Success',
            autoClose: true,
          };
          // @ts-ignore
          setAlert(optionAlert);
          // @ts-ignore
          setOpen(false);
        })
        .catch((error) => {
          const optionAlert: IAlert = {
            active: true,
            message: error.message,
            type: 'Error',
            autoClose: true,
          };
          // @ts-ignore
          setAlert(optionAlert);
        });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                {...register('title', { required: true })}
                type="text"
                name="title"
                id="title"
                className={`${errors.title && `border-red-500`} mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
              />
              {errors.title?.type === 'required' && <span className="text-red-500 text-xs italic">Title is required</span>}
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                {...register('price', { required: true, min: 0 })}
                type="number"
                min={0}
                name="price"
                id="price"
                className={`${errors.price && `border-red-500`}mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
              />
              {errors.price?.type === 'required' && <span className="text-red-500 text-xs italic">Price is required</span>}
            </div>
            <div className="col-span-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                {...register('categoryId')}
                id="categoryId"
                name="categoryId"
                autoComplete="category-name"
                className={`${
                  errors.categoryId && `border-red-500`
                } mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              >
                <option value="1">Clothes</option>
                <option value="2">Electronics</option>
                <option value="3">Furniture</option>
                <option value="4">Toys</option>
                <option value="5">Others</option>
              </select>
            </div>

            <div className="col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register('description', { required: true })}
                name="description"
                id="description"
                autoComplete="description"
                rows={3}
                className={`${
                  errors.description && `border-red-500`
                } form-textarea mt-1 block w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
              />
              {errors.description?.type === 'required' && <span className="text-red-500 text-xs italic">Description is required</span>}
            </div>
            <div className="col-span-6">
              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                  Cover photo
                </label>
                <div className={`${errors.images ? `border-red-500` : `border-gray-300`} mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md`}>
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="images"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input {...register('images', { required: false })} id="images" name="images" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
                {errors.images?.type === 'required' && <span className="text-red-500 text-xs italic">Images is required</span>}
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
