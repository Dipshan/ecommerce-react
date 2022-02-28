import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { SnackbarContext } from "../contexts/Snackbar";

export default function ProductScreen(props) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const { openSnackbar } = useContext(SnackbarContext);

  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, e, products } = productDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    props.history.push(`/signin?redirect=/cart/${productId}?qty=${qty}`);
    openSnackbar("Product Added");
  };

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : e ? (
        <MessageBox variant="danger">{e}</MessageBox>
      ) : (
        <div className="row center">
          <div className="row top">
            <div className="col-2">
              <img className="large" src={products.image} alt={products.name} />
            </div>
            <div className="col-1">
              <ul>
                <li>{products.name}</li>
                <li>
                  <Rating
                    rating={products.rating}
                    numReviews={products.numReviews}
                  />
                </li>
                <li>Price: Rs. {products.price}</li>
                <li>Description: {products.description}</li>
              </ul>
            </div>

            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">Rs. {products.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {products.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="error">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {products.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <select
                            value={products.qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(products.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </li>
                    </>
                  )}
                  <li>
                    <button onClick={handleAddToCart} className="primary block">
                      Add to Cart
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
