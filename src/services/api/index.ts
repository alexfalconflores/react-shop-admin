const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  auth: {
    login: `${API}/api/${VERSION}/auth/login`,
    profile: `${API}/api/${VERSION}/auth/profile`,
  },
  products: {
    getProducts: (limit: number, offset: number) => `${API}/api/${VERSION}/products?limit=${limit}&offset=${offset}`,
    allProducts: `${API}/api/${VERSION}/products`,
    postProduct: () => `${API}/api/${VERSION}/products`,
    getProduct: (id: number) => `${API}/api/${VERSION}/products/${id}`,
    putProduct: (id: number) => `${API}/api/${VERSION}/products/${id}`,
    deleteProduct: (id: number) => `${API}/api/${VERSION}/products/${id}`,
  },
  users: {
    getUsers: (limit: number) => `${API}/api/${VERSION}/users?limit=${limit}`,
    postUser: () => `${API}/api/${VERSION}/users`,
    postIsAvailable: () => `${API}/api/${VERSION}/users/is-available`,
  },
  categories: {
    getCategories: (limit: number) => `${API}/api/${VERSION}/categories?limit=${limit}`,
    postCategory: () => `${API}/api/${VERSION}/categories`,
    getCategory: (id: number) => `${API}/api/${VERSION}/categories/${id}`,
    putCategory: (id: number) => `${API}/api/${VERSION}/categories/${id}`,
    getProductsByCategory: (id: number, limit: number, offset: number) => `${API}/api/${VERSION}/categories/${id}/products?limit=${limit}&offset=${offset}`,
  },
  files: {
    postFiles: () => `${API}/api/${VERSION}/files/upload`,
    getFiles: (filename: string) => `${API}/api/${VERSION}/files/${filename}`,
  },
};

export default endPoints;
