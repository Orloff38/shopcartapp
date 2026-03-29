
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeItem } from "../../store/CartSlice";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import './index.css'
export default function ProductTile({ product }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const inCart = cart.find((item) => item.id === product.id);


  function HandleClickAdd() {
  
    dispatch(addToCart(product.id));
  }

  function HandleClickRemove() {
    dispatch(removeItem(product.id));
  }

  return (

      <div className="product_card-wrapper">
        <div className="product_card-img">
         <img src={product?.images[0]} alt="" />
        </div>
        <div>
          <div className="product_card-info">
          <h1 className="product_card-title">
            {product?.title}
          </h1>
          <div className="product_card-info-subtitles">
            <p className="rating"><FaStar style={{color: "#727272"}}/> {product?.rating?.toFixed(1)} ({product?.reviews?.length})</p>
            <p className="price">$ {product?.price}</p>
          </div>
          </div>

        </div>
        <div>
          {inCart ? (
            <div className="cart_counter-wrapper">
              <button className="cart_counter-button" onClick={HandleClickRemove}><FiMinus /></button>
              <div className="cart_counter-digit">{inCart.count}</div>
              <button className="cart_counter-button" onClick={HandleClickAdd}><FiPlus/></button>
            </div>
          ) : (
            <button
              className="add-to-cart_btn"
              onClick={HandleClickAdd}
            >
               Add to Cart
            </button>
          )}
        </div>
      </div>
   
  );
}
