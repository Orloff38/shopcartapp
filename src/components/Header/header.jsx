import { Link } from "react-router-dom"

export default function Header(){
    return <div>
        <nav className="flex items-center justify-between h-20 max-w-6xl mx-auto">
    <Link to='/'>
    <div className="ml-5">
    <h1 className=" font-bold text-blue-700 text-xl sm:text-2xl md:text-3xl cursor-pointer tracking-wider">REDUX SHOPPING CART APP</h1>
    </div>
    </Link>
    <div className="flex items-center space-x-6 text-gray-800 font-semibold">
<Link to='/'>Home</Link>
<Link to='/cart'>Cart</Link>
    </div>
        </nav>
    </div>
}