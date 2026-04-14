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
  rating?: number;
  duration: string;
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

export interface MyReview {
  id: number;
  documentId: string;
  rating: number;
  review?: string;
  movie: {
    id: number;
    documentId: string;
    title: string;
    genre: string;
    image?: {
      url: string;
    };
  };
}

export interface ResponseMyReviews {
  data: MyReview[];
}
