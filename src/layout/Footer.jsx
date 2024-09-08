import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Footer.module.css'
export default function Footer() {
  return (
    <div className='flex flex-col justify-center items-center bg-custom-gradient font-bold text-base text-zinc-700'>
        <div className='flex flex-row gap-5 p-10'>
            {/* <p>About Us</p>
            <p>Contact Us</p>
            <p>Services</p>
            <p>FAQ</p>
            <p>SCHOOL OF JEWELRY ART</p> */}
            <nav>
                <menu className="flex gap-4 font-bold text-slate-600">
                    <li><NavLink to={"/"} className={({isActive}) =>(
                      isActive ? styles.active
                      :"hover:text-emerald-700") }>About Us</NavLink></li>
                      <li><NavLink to={"/bootcamps"} className={({isActive}) =>(
                        isActive ? styles.active
                        :"hover:text-emerald-700") }>contact Us</NavLink></li>
                    <li><NavLink to={"/aboutus"} className={({isActive}) =>(
                      isActive ? styles.active
                      :"hover:text-emerald-700") }>Services</NavLink></li>
                    <li><NavLink to={"/contactus"} className={({isActive}) =>(
                      isActive ? styles.active
                      :"hover:text-emerald-700") }>FAQ</NavLink></li>
                    <li><NavLink to={"/login"} className={({isActive}) =>(
                      isActive ? styles.active
                      :"hover:text-emerald-700") }>SCHOOL OF JEWELRY ART</NavLink></li>
                </menu>
            </nav>
        </div>
        <div className='flex flex-row gap-5  p-10 '>
            {/* <p>INSTAGRAM</p>
            <p>FACEBOOK</p>
            <p>YOUTUBE</p>
            <p>PINTEREST</p> */}
            <nav>
                <menu className="flex gap-4 font-bold text-slate-600">
                    <li><NavLink to={"/"} className={({isActive}) =>(
                      isActive ? styles.active
                      :"hover:text-emerald-700") }>INSTAGRAM</NavLink></li>
                      <li><NavLink to={"/bootcamps"} className={({isActive}) =>(
                        isActive ? styles.active
                        :"hover:text-emerald-700") }>FACEBOOK</NavLink></li>
                    <li><NavLink to={"/aboutus"} className={({isActive}) =>(
                      isActive ? styles.active
                      :"hover:text-emerald-700") }>YOUTUBE</NavLink></li>
                    <li><NavLink to={"/contactus"} className={({isActive}) =>(
                      isActive ? styles.active
                      :"hover:text-emerald-700") }>PINTEREST</NavLink></li>
                    
                </menu>
            </nav>
        </div>
    </div>
  )
}
