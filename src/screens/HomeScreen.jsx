import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, e, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : e ? (
        <MessageBox variant="danger">{e}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="product">
            {products.map((product) => (
              <Product
                key={product._id}
                id={product._id}
                name={product.name}
                image={product.image}
                rating={product.rating}
                numReviews={product.numReviews}
                price={product.price}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
