import { Link, NavLink } from "react-router-dom"
import './index.css'
import { useSelector } from "react-redux"



export default function Header(){
    const cartCount = useSelector(state=>state.cart).reduce((acc,cur)=>acc+=cur.count, 0)
    return <div className="mb-10">
        <nav className="flex items-center justify-between h-20 max-w-[1200px] mx-auto px-[24px]">
    <NavLink to='/'  className={({isActive})=>isActive ? 'active' : 'not-active'}>
    <div >
    <h1 className=" font-bold text-black text-xl sm:text-2xl md:text-3xl cursor-pointer tracking-wider">SHOP</h1>
    </div>
    </NavLink>
    <div className="flex flex-1 items-center justify-end gap-[24px] space-x-6 text-gray-800 font-semibold">
<NavLink to='/allItems' className={({isActive})=>isActive ? 'active' : 'not-active'}>Search</NavLink>
<NavLink to='/' className={({isActive})=>isActive ? 'active' : 'not-active'}>Category</NavLink>

<div className="flex items-center justify-center gap-[4px]">
<NavLink to='/cart' className={({isActive})=>isActive ? 'active' : 'not-active'}>
Cart 
    </NavLink>
  {  cartCount>0 && <span className="circle">
    {cartCount}
    </span>}
    
</div>
    
    </div>
        </nav>
    </div>
}