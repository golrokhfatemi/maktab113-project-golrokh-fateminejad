
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
  return (
    <div>
        <header className="flex justify-between m-5">
        <div className="font-bold text-lg text-slate-700">Maktab Sharif</div>
            <nav>
                <menu className="flex gap-4 font-bold text-slate-500">
                    <li><NavLink to={"/"} className={({isActive}) =>(
                      isActive ? styles.active
                      :"hover:text-emerald-700") }>Home</NavLink></li>
                      <li><NavLink to={"/bootcamps"} className={({isActive}) =>(
                        isActive ? styles.active
                        :"hover:text-emerald-700") }>Products</NavLink></li>
                    <li><NavLink to={"/aboutus"} className={({isActive}) =>(
                      isActive ? styles.active
                      :"hover:text-emerald-700") }>About Us</NavLink></li>
                    <li><NavLink to={"/contactus"} className={({isActive}) =>(
                      isActive ? styles.active
                      :"hover:text-emerald-700") }>Contact Us</NavLink></li>
                    <li><NavLink to={"/login"} className={({isActive}) =>(
                      isActive ? styles.active
                      :"hover:text-emerald-700") }>Login</NavLink></li>
                </menu>
            </nav>
            <div><img src="./logo.png" ></img></div>
        </header>
    </div>
    
  )
}
