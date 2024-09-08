
import { NavLink } from 'react-router-dom'

import { MdOutlineMail, MdOutlinePhoneInTalk } from 'react-icons/md';
import { CiMenuBurger } from 'react-icons/ci';


export default function Header() {
  return (
    <div>
        <header className="flex justify-between m-5">
        <CiMenuBurger className='text-2xl'/> 
            
            <div className='flex flex-row gap-4'>
            
              <MdOutlinePhoneInTalk className='text-2xl'/>
              <MdOutlineMail className='text-2xl'/>
            </div>
        </header>
    </div>
    
  )
}
