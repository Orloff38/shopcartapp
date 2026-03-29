import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import CartTile from "../components/CartTile/CartTile";
import { IoArrowBackOutline } from "react-icons/io5";

export default function Cart() {

  const navigator = useNavigate()
  const cart = useSelector((store) => store.cart);
  let [dataCart, setDataCart] = useState([]);

  async function getAllData() {
    let responce = await Promise.all(
      cart.map((i) => fetch(`https://dummyjson.com/products/${i.id}`)),
    );
    let data = await Promise.all(responce.map((i) => i.json()));
    console.log(data);
    setDataCart(data);
  }

  useEffect(() => {
    getAllData();
  }, [cart]);

  const [totalCart, setTotalCart] = useState(0);
  console.log(cart);

  useEffect(() => {
    setTotalCart(
      dataCart.reduce((acc, cur) => {
        const item = cart.find((i) => i.id === cur.id);
        return (acc += item?.count * cur?.price);
      }, 0),
    );
  }, [cart, dataCart]);

  return (
    <div className="common_container">
      { cart?.length>0 &&   
      <div className="flex items-center justify-center gap-[24px]">
         

        <button className="btn_nav" onClick={()=>navigator(-1)}><IoArrowBackOutline /></button>
      
     

        <h1 className="cart_header">CART</h1>
     
      </div>}
      
      
    <div className="product_tile-container ">
      {cart?.length ? (
        <>
          <div className="product_tile-wrapper">
            <AnimatePresence>
              {cart.map((item) => (
                <CartTile key={item.id} cartItemId={item.id} />
              ))}
            </AnimatePresence>
          </div>
          <div className="order_summary-wrapper">
            <h1 className="summary_header">Cart Summary</h1>
            <p>
              <span className="summary_title">Items: </span>
              <span className="subtitle">{cart?.length}</span>
            </p>
            <p>
              <span className="summary_title">Total: </span>
              <span className="subtitle">${totalCart?.toFixed(2)} USD</span>
            </p>

             <button className="cart_btn_back">Proceed to order</button>
          </div>
        </>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <h1 className="text-gray-800  font-bold text-xl mb-2">
            Your Cart Is Empty
          </h1>
          <Link to="/">
            <button className="cart_btn_back">SHOP NOW</button>
          </Link>
        </div>
      )}
    </div>
    </div>
  );
}
