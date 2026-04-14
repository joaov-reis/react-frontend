import { Routes, Route } from "react-router";
import { ProtectedRoute } from "./protected-route";
import Layout from "../components/Layout";
import Home from "../pages/home";
import Register from "../pages/register";
import Login from "../pages/login";
import Products from "../pages/products";
import ProductDetail from "../pages/product-detail";
import CartPage from "../pages/cart";
import Movies from "../pages/movies";
import MovieDetail from "../pages/movie-detail";
import MyReviewsPage from "../pages/my-reviews";


export const Routers = () => {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route
          path="/"
          element={
            <Home/>
          }
        />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        <Route path="/movies" element={<Movies/>} />
        <Route path="/movie/:id" element={<MovieDetail/>} />

        <Route path="/products" element={<Products/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/my-reviews" element={<MyReviewsPage/>} />
        </Route>
      </Route>
    </Routes>
  );
};