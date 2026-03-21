import { ThreeDots } from "react-loader-spinner";
import useFetch from "../utilits/useFetch";
import ProductTile from "../components/ProductTile/ProductTile";

export default function Home() {
  const [data, loading, error] = useFetch('https://dummyjson.com/products');
  console.log(data, loading, error);
  return (
    <>
      {loading ? (
        <div className="min-h-screen w-full flex justify-center items-center">
          <ThreeDots
            visible={true}
            height="120"
            width="120"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
          />
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        data?.products?.length && <div className="min-h-[80vh] grid sm:grid-cols-2 md:grid-cols-3 space-x-5 space-y-10 lg:grid-cols-4 max-w-6xl mx-auto p-3">

            {data?.products.map((item) => <ProductTile key={item.id} product={item}/>)}
        </div>
      )}
    </>
  );
}
