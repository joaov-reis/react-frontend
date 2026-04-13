export interface ResponseProducts {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}

export interface ResponseMovies {
  data: Movie[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}

export interface Movie {
  id: number;
  documentId: string;
  title: string;
  synopsis: string;
  genre: string;
  duration: string;
  image?: {
    url: string;
  };
}

export interface Product {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  image?: {
    url: string;
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface CartItem {
  id: number;
  documentId: string;
  quantity: number;
  product: {
    id: number;
    documentId: string;
    title: string;
    price: number;
    image?: {
      url: string;
    };
  };
}

export interface ResponseCartItems {
  data: CartItem[];
}

export interface MyReview {
  id: number;
  documentId: string;
  rating: number;
  review?: string;
  filme: Movie;
}

export interface ResponseMyReviews {
  data: MyReview[];
}