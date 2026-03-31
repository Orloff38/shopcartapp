import { ThreeDots } from "react-loader-spinner";
import useFetch from "../utilits/useFetch";
import ProductTile from "../components/ProductTile/ProductTile";
import { Link } from "react-router-dom";
import './index.css'
import allItemsImg from '../assets/img-1.webp'
import beautyImg from '../assets/img-2.webp'

const imgSettle = {all: allItemsImg, 
  beauty: beautyImg
}


export default function Home() {
  const [data, loading, error] = useFetch('https://dummyjson.com/products/category-list');
  console.log(data, loading, error);
  
  return (
    <div className="common_container">
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
      ) : (
        data?.length && <div className="category_container">
         <Link   to={`/allItems`}>
    <div className="category_item" >
              
               <h1>all</h1>
             
              </div>
            
            </Link>
            {data.map((item) => <Link  key={item} to={`/category/${item}`}>
           <div className="category_item">
            
            
               <h1>{item}</h1>
             
              </div>
            </Link>)}
        </div>
      )}
    </div>
  )
}
