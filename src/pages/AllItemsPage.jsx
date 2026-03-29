import { ThreeDots } from "react-loader-spinner";
import ProductTile from "../components/ProductTile/ProductTile";
import { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
let savedInputValue = "";

export default function AllItemsPage() {
  const [inputValue, setInputValue] = useState(savedInputValue);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibleData, setVisibleData] = useState({});
  const [step, setStep] = useState(0);
  const LIMIT = 20;
  const [showBTN, setShowBTN] = useState(false);
  const inpIcon = useRef(null)
  async function fetchData() {

    if (inputValue.trim() == "") {
      try {
      
        setShowBTN(false);
        setError(null);
        setLoading(true);
        const response = await fetch(
          `https://dummyjson.com/products?limit=${LIMIT + 1}&skip=${LIMIT * step}`,
        );
        if (!response.ok) {
          throw new Error("ПРОИЗОШЛА ОШИБКА");
        }
        const products = await response.json();
        console.log(products?.products?.length);
        if (products?.products?.length > LIMIT) {
          setShowBTN(true);
        } else {
          setShowBTN(false);
        }

        setVisibleData((prev) => ({
          ...products,
          products: [
            ...(prev.products || []),
            ...products.products.slice(0, LIMIT),
          ],
        }));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${inputValue.toLowerCase()}`,
        );
        if (!response.ok) {
          throw new Error("ПРОИЗОШЛА ОШИБКА");
        }
        const products = await response.json();
        setVisibleData(products);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
        setShowBTN(false);
      }
    }
  }

  useEffect(() => {

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    console.log(visibleData);
  }, [visibleData]);

  function handleSubmit(e) {
    e.preventDefault();
    savedInputValue = inputValue;
    setVisibleData({ products: [] });
    if (step === 0) {
      fetchData();
    } else {
      setStep(0);
    }
  }

  return (
    <div className="common_container">
      <form className="search_form" onSubmit={(e) => handleSubmit(e)}>
        <IoSearchOutline ref={inpIcon} className="icon" size={24} color="gray"/>
       <input
      
          className="search_input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => { inpIcon.current.style.display = 'none'; }}
          onBlur={() => { inpIcon.current.style.display = 'block'; }}
        />

      </form>
      {loading ? (
        <div className="min-h-screen w-full flex justify-center items-center">
          <ThreeDots
            visible={true}
            height="120"
            width="120"
            color="#B59A7A"
            radius="9"
            ariaLabel="three-dots-loading"
          />
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : visibleData?.products?.length ? (
        <>
          <div className="product_tile-container">
            {visibleData?.products?.map((item) => (
              <ProductTile key={item.id} product={item} />
            ))}
          </div>
          {showBTN && (
            <button
              className="load_more-btn"
              onClick={() => setStep((prev) => prev + 1)}
            >
              LOAD MORE
            </button>
          )}
        </>
      ) : (
        <div>Ничего не найдено</div>
      )}
    </div>
  );
}
