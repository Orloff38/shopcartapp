import { ThreeDots } from "react-loader-spinner";
import useFetch from "../utilits/useFetch";
import ProductTile from "../components/ProductTile/ProductTile";
import { useParams } from "react-router-dom";

export default function Category() {

  const {currentCategory} = useParams()
console.log(`https://dummyjson.com/products/category/${currentCategory}`)
  const [data, loading, error] = useFetch(`https://dummyjson.com/products//category/${currentCategory}`);
  console.log(data, loading, error);
  return (
    <div className="min-h-screen w-full">
      {loading ? (
        <div className="min-h-screen w-full flex justify-center items-center ">
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
      ) : (<>
          <h1 className="category_header">{currentCategory.toUpperCase()}</h1>
       { data?.products?.length && <div className="product_tile-container ">
       
            {data?.products.map((item) => <ProductTile key={item.id} product={item}/>)}
        </div>
 } </>
      )}
    </div>
  );
}
