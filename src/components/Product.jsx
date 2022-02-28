import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

export default function Product({
  id,
  name,
  image,
  rating,
  numReviews,
  price,
}) {
  return (
    <div key={id} className="card">
      <Link to={`/product/${id}`}>
        <img className="medium" src={image} alt={name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${id}`}>
          <h2 className="product-name">{name}</h2>
        </Link>
        <Rating rating={rating} numReviews={numReviews} />
        <div className="price">Rs. {price}</div>
      </div>
    </div>
  );
}
