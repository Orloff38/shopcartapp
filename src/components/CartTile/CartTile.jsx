import { useDispatch, useSelector } from "react-redux";
import { removeItem, addToCart, deleteItem } from "../../store/CartSlice";
import "./index.css";
import useFetch from "../../utilits/useFetch";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { motion } from "motion/react";

export default function CartTile({ cartItemId }) {
  const [data] = useFetch(`https://dummyjson.com/products/${cartItemId}`);
  const cartItem = useSelector((state) => state.cart).find(
    (i) => i.id === cartItemId,
  );
  const count = cartItem?.count;

  console.log(cartItemId);
  console.log(data);
  const dispatch = useDispatch();

  function HandleClickAdd() {
    dispatch(addToCart(cartItemId));
  }

  function HandleClickRemove() {
    dispatch(removeItem(cartItemId));
  }

  return (
    <motion.div
      className="product_tile-item"
      initial={{ opacity: 1, y:0}}
      exit={{ opacity: 0,  y: -20  }}
      transition={{ duration: 0.3 }}
      layout
    >
      <img
        className="cart_item-img"
        src={data?.images?.[0]}
        alt={data?.title}
      ></img>

      <div className="product_title">
        {data?.title}
      </div>
      <div className="product_price">
        {data?.price}
      </div>
      <div className="product_count">
        <button onClick={HandleClickRemove}><FiMinus/></button>
        <div className="product_count-digit">{count}</div>
        <button onClick={HandleClickAdd}><FiPlus/></button>
      </div>
      <div className="delete-btn">
        <button onClick={() => dispatch(deleteItem(cartItemId))}>
          <AiOutlineDelete size={24}/>
        </button>
      </div>
    </motion.div>
  );
}

